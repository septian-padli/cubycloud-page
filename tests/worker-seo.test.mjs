import test from 'node:test';
import assert from 'node:assert/strict';
import worker, {
  isProductionHostname,
  isRedirectHostname,
  handleRobotsRequest,
} from '../worker/index.ts';

// Mock Assets Fetcher
function createMockEnv(assetResponses = {}) {
  return {
    ASSETS: {
      async fetch(request) {
        const url = new URL(typeof request === 'string' ? request : request.url);
        const path = url.pathname;
        if (assetResponses[path]) {
          return assetResponses[path];
        }
        return new Response(`<html><body>Asset: ${path}</body></html>`, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
          },
        });
      },
    },
  };
}

test('isProductionHostname identifies cubycrate.com', () => {
  assert.equal(isProductionHostname('cubycrate.com'), true);
  assert.equal(isProductionHostname('CUBYCRATE.COM'), true);
  assert.equal(isProductionHostname('www.cubycrate.com'), false);
  assert.equal(isProductionHostname('cubycloud-page.septianpadli.workers.dev'), false);
  assert.equal(isProductionHostname('localhost'), false);
});

test('isRedirectHostname identifies www.cubycrate.com', () => {
  assert.equal(isRedirectHostname('www.cubycrate.com'), true);
  assert.equal(isRedirectHostname('WWW.CUBYCRATE.COM'), true);
  assert.equal(isRedirectHostname('cubycrate.com'), false);
  assert.equal(isRedirectHostname('preview.cubycrate.com'), false);
});

test('handleRobotsRequest produces valid output for production vs staging', () => {
  const prodRes = handleRobotsRequest(true);
  assert.equal(prodRes.status, 200);
  assert.equal(prodRes.headers.get('X-Robots-Tag'), null);

  const stagingRes = handleRobotsRequest(false);
  assert.equal(stagingRes.status, 200);
  assert.equal(stagingRes.headers.get('X-Robots-Tag'), 'noindex, nofollow, noarchive');
});

test('Worker: www.cubycrate.com redirects 301 to apex cubycrate.com', async () => {
  const env = createMockEnv();
  const req = new Request('https://www.cubycrate.com/docs/getting-started/installation/?ref=1');
  const res = await worker.fetch(req, env);

  assert.equal(res.status, 301);
  assert.equal(res.headers.get('Location'), 'https://cubycrate.com/docs/getting-started/installation/?ref=1');
});

test('Worker: Production cubycrate.com/robots.txt returns Allow: / with Sitemap', async () => {
  const env = createMockEnv();
  const req = new Request('https://cubycrate.com/robots.txt');
  const res = await worker.fetch(req, env);

  assert.equal(res.status, 200);
  assert.equal(res.headers.get('X-Robots-Tag'), null);
  const body = await res.text();
  assert.match(body, /Allow: \//);
  assert.match(body, /Sitemap: https:\/\/cubycrate\.com\/sitemap-index\.xml/);
});

test('Worker: Production cubycrate.com/ serves asset without noindex header', async () => {
  const env = createMockEnv();
  const req = new Request('https://cubycrate.com/');
  const res = await worker.fetch(req, env);

  assert.equal(res.status, 200);
  assert.equal(res.headers.get('X-Robots-Tag'), null);
  const body = await res.text();
  assert.match(body, /Asset: \//);
});

test('Worker: Staging *.workers.dev/robots.txt returns Disallow: / and noindex header', async () => {
  const env = createMockEnv();
  const req = new Request('https://cubycloud-page.septianpadli.workers.dev/robots.txt');
  const res = await worker.fetch(req, env);

  assert.equal(res.status, 200);
  assert.equal(res.headers.get('X-Robots-Tag'), 'noindex, nofollow, noarchive');
  const body = await res.text();
  assert.match(body, /Disallow: \//);
  assert.doesNotMatch(body, /Allow: \//);
});

test('Worker: Staging *.workers.dev/ HTML pages receive X-Robots-Tag noindex', async () => {
  const env = createMockEnv();
  const req = new Request('https://cubycloud-page.septianpadli.workers.dev/docs/getting-started/installation/');
  const res = await worker.fetch(req, env);

  assert.equal(res.status, 200);
  assert.equal(res.headers.get('X-Robots-Tag'), 'noindex, nofollow, noarchive');
  const body = await res.text();
  assert.match(body, /Asset: \/docs\/getting-started\/installation\//);
});

test('Worker: Preview deployment URL receives X-Robots-Tag noindex', async () => {
  const env = createMockEnv();
  const req = new Request('https://feature-branch-preview.pages.dev/');
  const res = await worker.fetch(req, env);

  assert.equal(res.status, 200);
  assert.equal(res.headers.get('X-Robots-Tag'), 'noindex, nofollow, noarchive');
});
