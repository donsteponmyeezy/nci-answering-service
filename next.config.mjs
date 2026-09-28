import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));

/** Legacy 301 map from the WordPress site. Data lives in src/lib/redirects.json so the sitemap check can read it too. */
const { redirects: LEGACY_REDIRECTS } = JSON.parse(readFileSync(join(here, "src/lib/redirects.json"), "utf8"));

/**
 * Content-Security-Policy ships REPORT-ONLY first. Promote to enforcing after a
 * manual pass over /, /contact, /find-your-coverage and /services with GTM loaded
 * shows no violations. GTM's loader and Next's bootstrap are inline scripts, hence
 * 'unsafe-inline' until a nonce is threaded through middleware.
 */
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
  "frame-src 'self' https://www.googletagmanager.com https://challenges.cloudflare.com",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy-Report-Only", value: CSP_REPORT_ONLY },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: { formats: ["image/webp"] },
  async redirects() {
    // 301 (not Next's default 308) — these are GET-only legacy WordPress paths.
    return LEGACY_REDIRECTS.map(({ source, destination }) => ({ source, destination, statusCode: 301 }));
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
