import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site ?? 'https://cubycrate.com/').href;

  // Baseline static robots.txt for production output.
  // Hostname-based environment protection (noindex on *.workers.dev, preview deployments,
  // and 301 redirect for www.cubycrate.com) is enforced dynamically by the Cloudflare Worker
  // (worker/index.ts) at request time.
  // Build-time override: if PUBLIC_INDEXABLE === 'false', emit Disallow: / even in static output.
  const isExplicitlyNoIndex = import.meta.env.PUBLIC_INDEXABLE === 'false';
  const isProduction = site ? new URL(site).hostname === 'cubycrate.com' : false;
  const allowIndexing = isProduction && !isExplicitlyNoIndex;

  const body = allowIndexing
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`
    : `User-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
