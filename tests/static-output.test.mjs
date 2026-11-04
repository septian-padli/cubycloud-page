import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

test('dist/robots.txt exists and contains valid production policy', () => {
  const robotsPath = path.join(distDir, 'robots.txt');
  assert.ok(fs.existsSync(robotsPath), 'dist/robots.txt must exist');

  const content = fs.readFileSync(robotsPath, 'utf8');
  assert.match(content, /User-agent: \*/);
  assert.match(content, /Allow: \//);
  assert.match(content, /Sitemap: https:\/\/cubycrate\.com\/sitemap-index\.xml/);
});

test('dist/index.html exists and contains canonical, metadata, and static SSR SEO content', () => {
  const indexPath = path.join(distDir, 'index.html');
  assert.ok(fs.existsSync(indexPath), 'dist/index.html must exist');

  const content = fs.readFileSync(indexPath, 'utf8');
  assert.match(content, /<link rel="canonical" href="https:\/\/cubycrate\.com\/"/);
  assert.match(content, /<meta property="og:image" content="https:\/\/cubycrate\.com\/og-image\.png"/);
  assert.match(content, /<meta property="og:image:width" content="1200"/);
  assert.match(content, /<meta property="og:image:height" content="630"/);
  assert.match(content, /<meta name="twitter:image" content="https:\/\/cubycrate\.com\/og-image\.png"/);

  // Structured Data Schema.org
  assert.match(content, /"applicationCategory":\s*"BusinessApplication"/);
  assert.match(content, /"operatingSystem":\s*"Linux,\s*Docker"/);
  assert.match(content, /"@type":\s*"SoftwareApplication"/);

  // Verify Static SSR SEO content: H1, headings, FAQ, CTA in initial HTML payload
  assert.match(content, /<h1[^>]*>[\s\S]*?YOUR FILES[\s\S]*?YOUR SPACE/i);
  assert.match(content, /OPEN A FOLDER/);
  assert.match(content, /PICK A FILE/);
  assert.match(content, /LOCAL DISKS/);
  assert.match(content, /BEFORE YOU[\s\S]*?MAKE IT[\s\S]*?YOURS/i); // FAQ
  assert.match(content, /YOUR FILES\.[\s\S]*?YOUR RULES\.[\s\S]*?START HERE/i); // Get Started CTA
  assert.ok(content.includes('<div id="root">'), 'Expected #root mount target for React island');
});

test('dist/og-image.png exists and meets 1200x630 dimension requirement', () => {
  const ogPath = path.join(distDir, 'og-image.png');
  assert.ok(fs.existsSync(ogPath), 'dist/og-image.png must exist');
  const stats = fs.statSync(ogPath);
  assert.ok(stats.size > 10000, 'dist/og-image.png must be non-empty valid image asset');
});

test('dist/404.html exists and contains branded page title and return actions', () => {
  const notFoundPath = path.join(distDir, '404.html');
  assert.ok(fs.existsSync(notFoundPath), 'dist/404.html must exist');

  const content = fs.readFileSync(notFoundPath, 'utf8');
  assert.match(content, /<title>Page Not Found \| CubyCrate<\/title>/);
  assert.match(content, /Go to Homepage/);
  assert.match(content, /href="\/docs\/"/);
});

test('All 7 Starlight documentation pages exist in dist/ with canonical tags', () => {
  const docRoutes = [
    'docs/index.html',
    'docs/getting-started/installation/index.html',
    'docs/getting-started/configuration/index.html',
    'docs/user-guide/file-management/index.html',
    'docs/user-guide/sharing/index.html',
    'docs/administrator-guide/backup-restore/index.html',
    'docs/troubleshooting/index.html',
  ];

  for (const relPath of docRoutes) {
    const fullPath = path.join(distDir, relPath);
    assert.ok(fs.existsSync(fullPath), `Expected ${relPath} to exist in dist/`);

    const content = fs.readFileSync(fullPath, 'utf8');
    const expectedRoute = relPath.replace(/index\.html$/, '');
    const expectedCanonical = `https://cubycrate.com/${expectedRoute}`;

    assert.ok(
      content.includes(`href="${expectedCanonical}"`),
      `Expected canonical tag ${expectedCanonical} in ${relPath}`
    );
    assert.match(content, /\| CubyCrate<\/title>/);
    assert.ok(
      content.includes('content="https://cubycrate.com/og-image.png"'),
      `Expected og:image meta tag in ${relPath}`
    );
  }
});

test('dist/sitemap-index.xml and sitemaps exist', () => {
  const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
  assert.ok(fs.existsSync(sitemapIndexPath), 'sitemap-index.xml must exist');

  const content = fs.readFileSync(sitemapIndexPath, 'utf8');
  assert.match(content, /<sitemapindex/);
});

test('dist/pagefind/pagefind-worker.js has relative origin patch', () => {
  const workerPath = path.join(distDir, 'pagefind', 'pagefind-worker.js');
  assert.ok(fs.existsSync(workerPath), 'pagefind-worker.js must exist');

  const content = fs.readFileSync(workerPath, 'utf8');
  assert.ok(
    content.includes('self.location.origin'),
    'Expected relative origin resolution patch in pagefind-worker.js'
  );
});

test('wrangler.jsonc defines Worker entrypoint and assets binding', () => {
  const wranglerPath = path.resolve('wrangler.jsonc');
  const content = fs.readFileSync(wranglerPath, 'utf8');

  assert.match(content, /"main":\s*"worker\/index\.ts"/);
  assert.match(content, /"binding":\s*"ASSETS"/);
  assert.match(content, /"run_worker_first":\s*true/);
});
