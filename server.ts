import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { resolveBaseUrl, DEFAULT_CANONICAL_DOMAIN } from './src/lib/seo/urlResolver.ts';
import {
  generateSitemapXml,
  generateRobotsTxt,
  isValidAppRoute,
} from './src/lib/seo/sitemapGenerator.ts';

const PORT = Number(process.env.PORT) || 3000;
const ROOT_DIR = import.meta.dirname;
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const ASSET_EXT_REGEX = /\.(?:js|mjs|cjs|css|map|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|eot|json|webmanifest|txt|xml)$/i;

function applyCanonicalOriginToHtml(html: string, baseUrl: string): string {
  if (!baseUrl || baseUrl === DEFAULT_CANONICAL_DOMAIN) {
    return html;
  }
  return html.replaceAll(DEFAULT_CANONICAL_DOMAIN, baseUrl);
}

async function startServer() {
  const app = express();

  // Safely trust immediate reverse proxy hop (Cloud Run, Cloudflare, Vercel, Nginx)
  const rawTrustProxy = process.env.TRUST_PROXY;
  const trustProxy = rawTrustProxy
    ? /^\d+$/.test(rawTrustProxy)
      ? Number(rawTrustProxy)
      : rawTrustProxy
    : 1;
  app.set('trust proxy', trustProxy);
  app.disable('x-powered-by');

  const getBaseUrl = (req: express.Request) =>
    resolveBaseUrl(
      {
        xForwardedHost: req.headers['x-forwarded-host'],
        xForwardedProto: req.headers['x-forwarded-proto'],
        host: req.headers.host,
        protocol: req.protocol,
      },
      process.env
    );

  // Dynamic XML Sitemap (handles both /sitemap.xml and /sitemap.xml/)
  app.get(['/sitemap.xml', '/sitemap.xml/'], (req, res) => {
    const baseUrl = getBaseUrl(req);
    const xml = generateSitemapXml(baseUrl);
    res.status(200);
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(xml);
  });

  // Dynamic Robots.txt synchronized with resolved canonical domain
  app.get('/robots.txt', (req, res) => {
    const baseUrl = getBaseUrl(req);
    const robots = generateRobotsTxt(baseUrl);
    res.status(200);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(robots);
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      if (ASSET_EXT_REGEX.test(req.path)) {
        res.status(404).end();
        return;
      }

      try {
        const indexPath = path.resolve(ROOT_DIR, 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
        const baseUrl = getBaseUrl(req);
        const html = applyCanonicalOriginToHtml(template, baseUrl);
        const statusCode = isValidAppRoute(req.path) ? 200 : 404;

        res.status(statusCode).setHeader('Content-Type', 'text/html; charset=utf-8').send(html);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  } else {
    app.use(
      express.static(DIST_DIR, {
        index: false,
        maxAge: '1d',
      })
    );

    const distIndexPath = path.resolve(DIST_DIR, 'index.html');
    const cachedHtml = fs.existsSync(distIndexPath)
      ? fs.readFileSync(distIndexPath, 'utf-8')
      : '<!doctype html><html><body>Build output not found. Run npm run build.</body></html>';

    app.get('*', (req, res) => {
      if (ASSET_EXT_REGEX.test(req.path)) {
        res.status(404).end();
        return;
      }

      const baseUrl = getBaseUrl(req);
      const html = applyCanonicalOriginToHtml(cachedHtml, baseUrl);
      const statusCode = isValidAppRoute(req.path) ? 200 : 404;

      res.status(statusCode).setHeader('Content-Type', 'text/html; charset=utf-8').send(html);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
