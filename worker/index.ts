export interface Env {
  ASSETS: {
    fetch: (request: Request | string, init?: RequestInit) => Promise<Response>;
  };
}

export const PRODUCTION_HOSTNAME = 'cubycrate.com';
export const REDIRECT_HOSTNAMES = new Set([`www.${PRODUCTION_HOSTNAME}`]);

export function isProductionHostname(hostname: string): boolean {
  return hostname.toLowerCase() === PRODUCTION_HOSTNAME;
}

export function isRedirectHostname(hostname: string): boolean {
  return REDIRECT_HOSTNAMES.has(hostname.toLowerCase());
}

export function handleRobotsRequest(isProd: boolean, sitemapUrl = `https://${PRODUCTION_HOSTNAME}/sitemap-index.xml`): Response {
  if (isProd) {
    const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  const body = `User-agent: *\nDisallow: /\n`;
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase();

    // 1. Redirect www.cubycrate.com -> https://cubycrate.com (301 Permanent Redirect)
    // Avoids duplicate indexing between apex and www domains.
    if (isRedirectHostname(hostname)) {
      url.hostname = PRODUCTION_HOSTNAME;
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    const isProd = isProductionHostname(hostname);

    // 2. Dynamic robots.txt based on request hostname:
    // - cubycrate.com -> Allow: / with Sitemap
    // - *.workers.dev and other preview/staging hostnames -> Disallow: / with X-Robots-Tag
    if (url.pathname === '/robots.txt') {
      return handleRobotsRequest(isProd);
    }

    // 3. Fetch static asset from Cloudflare Static Assets (Astro dist output)
    const response = await env.ASSETS.fetch(request);

    // Production environment: serve response as-is (clean canonical, indexable)
    if (isProd) {
      return response;
    }

    // Staging / preview environments (*.workers.dev, preview branch URLs, etc.):
    // Enforce noindex header across all responses to prevent search engine indexing.
    const headers = new Headers(response.headers);
    headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
