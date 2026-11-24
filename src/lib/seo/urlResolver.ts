export const DEFAULT_CANONICAL_DOMAIN = 'https://reelgamemong.com';

const DEFAULT_TRUSTED_HOST_PATTERNS: RegExp[] = [
  /^(?:www\.)?reelgamemong\.com$/i,
  /^localhost(?::\d{1,5})?$/i,
  /^127\.0\.0\.1(?::\d{1,5})?$/i,
  /^[a-z0-9-]+\.run\.app$/i,
  /^[a-z0-9-]+\.vercel\.app$/i,
  /^[a-z0-9-]+\.pages\.dev$/i,
  /^[a-z0-9-]+\.netlify\.app$/i,
];

const STRICT_HOST_REGEX = /^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?(?::\d{1,5})?$/i;

export function normalizeBaseUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return DEFAULT_CANONICAL_DOMAIN;

  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return DEFAULT_CANONICAL_DOMAIN;
    }
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return DEFAULT_CANONICAL_DOMAIN;
  }
}

export function isTrustedHost(hostHeader: string, extraAllowedHosts: string[] = []): boolean {
  const candidate = hostHeader.trim().toLowerCase();
  if (!candidate || candidate.length > 253) return false;
  if (!STRICT_HOST_REGEX.test(candidate)) return false;

  const hostnameOnly = candidate.replace(/:\d+$/, '');

  for (const extra of extraAllowedHosts) {
    const clean = extra.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    if (!clean) continue;
    if (clean.startsWith('*.')) {
      const suffix = clean.slice(1);
      if (hostnameOnly.endsWith(suffix) && hostnameOnly.length > suffix.length) {
        return true;
      }
    } else if (candidate === clean || hostnameOnly === clean) {
      return true;
    }
  }

  return DEFAULT_TRUSTED_HOST_PATTERNS.some((pattern) => pattern.test(candidate) || pattern.test(hostnameOnly));
}

export function resolveExplicitSiteUrl(env: Record<string, string | undefined>): string | null {
  const explicit =
    env.SITE_URL ||
    env.PUBLIC_SITE_URL ||
    env.CANONICAL_URL ||
    env.VITE_SITE_URL ||
    env.VERCEL_PROJECT_PRODUCTION_URL;

  if (!explicit || !explicit.trim()) return null;
  return normalizeBaseUrl(explicit);
}

export function resolveEnvSiteUrl(env: Record<string, string | undefined>): string | null {
  const explicit = resolveExplicitSiteUrl(env);
  if (explicit) return explicit;

  const platform =
    (env.APP_URL && env.APP_URL !== 'MY_APP_URL' ? env.APP_URL : undefined) ||
    env.VERCEL_URL;

  if (!platform || !platform.trim()) return null;
  return normalizeBaseUrl(platform);
}

export interface ProxyHeaderInput {
  xForwardedHost?: string | string[];
  xForwardedProto?: string | string[];
  host?: string | string[];
  protocol?: string;
}

function firstHeaderValue(value?: string | string[]): string {
  if (!value) return '';
  const raw = Array.isArray(value) ? value[0] : value;
  return raw.split(',')[0].trim();
}

/**
 * Resolves canonical origin safely:
 * 1. Explicit canonical domain env var (SITE_URL / PUBLIC_SITE_URL / CANONICAL_URL / VITE_SITE_URL / VERCEL_PROJECT_PRODUCTION_URL)
 * 2. Trusted request X-Forwarded-Host / Host + validated X-Forwarded-Proto
 * 3. Safe fallback (DEFAULT_CANONICAL_DOMAIN or platform APP_URL when valid, rejecting spoofed hosts)
 */
export function resolveBaseUrl(
  headers: ProxyHeaderInput = {},
  env: Record<string, string | undefined> = {}
): string {
  const explicitUrl = resolveExplicitSiteUrl(env);
  if (explicitUrl) {
    return explicitUrl;
  }

  const extraHosts = (env.ALLOWED_HOSTS || '')
    .split(',')
    .map((h) => h.trim())
    .filter(Boolean);

  const forwardedHost = firstHeaderValue(headers.xForwardedHost);
  const directHost = firstHeaderValue(headers.host);
  const candidateHost = forwardedHost || directHost;

  if (candidateHost && isTrustedHost(candidateHost, extraHosts)) {
    const forwardedProto = firstHeaderValue(headers.xForwardedProto).toLowerCase();
    const rawProto = forwardedProto || (headers.protocol || '').toLowerCase();

    const isLocal = /^(?:localhost|127\.0\.0\.1)(?::\d+)?$/i.test(candidateHost);
    let proto: 'http' | 'https';
    if (rawProto === 'http' || rawProto === 'https') {
      proto = rawProto;
    } else {
      proto = isLocal ? 'http' : 'https';
    }

    return `${proto}://${candidateHost}`;
  }

  // Fallback when Host header is missing or rejected as untrusted
  return DEFAULT_CANONICAL_DOMAIN;
}
