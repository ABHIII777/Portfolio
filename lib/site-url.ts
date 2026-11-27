const FALLBACK_SITE_URL = "http://localhost:3000";

function normalize(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return FALLBACK_SITE_URL;

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  return withProtocol.replace(/\/+$/, "");
}

/**
 * Canonical site URL for metadata, sitemap, robots, and JSON-LD.
 *
 * Resolution order:
 * 1. NEXT_PUBLIC_SITE_URL — set this explicitly for a custom domain.
 * 2. VERCEL_PROJECT_PRODUCTION_URL — provided by Vercel for production builds.
 * 3. VERCEL_URL — the deployment-specific URL.
 * 4. localhost, for local development.
 */
const envUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL;

export const siteUrl = normalize(envUrl || FALLBACK_SITE_URL);

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteUrl}/`).toString();
}
