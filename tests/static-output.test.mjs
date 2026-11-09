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
  assert.match(content, /<meta property="og:image" content="https:\/\/cubycrate\.com\/og-homepage\.png"/);
  assert.match(content, /<meta property="og:image:width" content="1731"/);
  assert.match(content, /<meta property="og:image:height" content="909"/);
  assert.match(content, /<meta name="twitter:image" content="https:\/\/cubycrate\.com\/og-homepage\.png"/);

  // Structured Data Schema.org
  assert.match(content, /"applicationCategory":\s*"BusinessApplication"/);
  assert.match(content, /"operatingSystem":\s*"Linux"/);
  assert.match(content, /"softwareRequirements":\s*"Docker Engine >= 24\.0, Docker Compose >= 2\.20"/);
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

test('dist homepage and docs OG PNGs are valid 1731x909 images', () => {
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  for (const fileName of ['og-homepage.png', 'og-docs.png']) {
    const imagePath = path.join(distDir, fileName);
    assert.ok(fs.existsSync(imagePath), `dist/${fileName} must exist`);
    const image = fs.readFileSync(imagePath);
    assert.ok(image.subarray(0, 8).equals(pngSignature), `dist/${fileName} must have a PNG signature`);
    assert.equal(image.toString('ascii', 12, 16), 'IHDR', `dist/${fileName} must have an IHDR chunk`);
    assert.equal(image.readUInt32BE(16), 1731, `dist/${fileName} width must be 1731`);
    assert.equal(image.readUInt32BE(20), 909, `dist/${fileName} height must be 909`);
  }
});

test('dist/404.html exists and contains branded page title and return actions', () => {
  const notFoundPath = path.join(distDir, '404.html');
  assert.ok(fs.existsSync(notFoundPath), 'dist/404.html must exist');

  const content = fs.readFileSync(notFoundPath, 'utf8');
  assert.match(content, /<title>Page Not Found \| CubyCrate<\/title>/);
  assert.match(content, /Go to Homepage/);
  assert.match(content, /href="\/docs\/"/);
  assert.match(content, /<meta name="robots" content="noindex, nofollow"\/?>/);
});

test('All 12 Starlight documentation pages exist in dist/ with canonical tags', () => {
  const docRoutes = [
    'docs/index.html',
    'docs/getting-started/installation/index.html',
    'docs/getting-started/configuration/index.html',
    'docs/guides/self-hosted-file-storage/index.html',
    'docs/guides/local-vs-s3-storage/index.html',
    'docs/guides/docker-deployment-checklist/index.html',
    'docs/user-guide/file-management/index.html',
    'docs/user-guide/sharing/index.html',
    'docs/administrator-guide/backup-restore/index.html',
    'docs/troubleshooting/index.html',
    'docs/about/index.html',
    'docs/changelog/index.html',
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
    assert.match(content, /<meta property="og:image" content="https:\/\/cubycrate\.com\/og-docs\.png"/);
    assert.match(content, /<meta name="twitter:image" content="https:\/\/cubycrate\.com\/og-docs\.png"/);
    assert.match(content, /<meta property="og:image:width" content="1731"/);
    assert.match(content, /<meta property="og:image:height" content="909"/);
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
