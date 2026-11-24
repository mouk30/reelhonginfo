import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import { DEFAULT_CANONICAL_DOMAIN, resolveExplicitSiteUrl } from './src/lib/seo/urlResolver.ts';
import { generateRobotsTxt, generateSitemapXml } from './src/lib/seo/sitemapGenerator.ts';

function seoStaticArtifactsPlugin(): Plugin {
  return {
    name: 'seo-static-artifacts',
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, 'dist');
      if (!fs.existsSync(distDir)) return;

      const baseUrl = resolveExplicitSiteUrl(process.env) || DEFAULT_CANONICAL_DOMAIN;
      fs.writeFileSync(path.join(distDir, 'sitemap.xml'), generateSitemapXml(baseUrl), 'utf-8');
      fs.writeFileSync(path.join(distDir, 'robots.txt'), generateRobotsTxt(baseUrl), 'utf-8');
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), seoStaticArtifactsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
