import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site ?? 'https://cubycrate.com/').href;

  // Environment-specific indexing policy:
  // Allow indexing for cubycrate.com production domain.
  // Disallow indexing for Cloudflare staging/previews (*.workers.dev, localhost, etc.).
  const isProduction = site ? new URL(site).hostname === 'cubycrate.com' : false;

  const body = isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`
    : `User-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
