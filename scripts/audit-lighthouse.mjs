import { execSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 4399;
const URL = `http://127.0.0.1:${PORT}/`;
const RUNS = 3;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function median(numbers) {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function runLighthouse(formFactor) {
  const flags = [
    URL,
    `--chrome-flags="--headless --no-sandbox --disable-gpu"`,
    `--output=json`,
    `--output-path=stdout`,
    `--only-categories=performance,accessibility,best-practices,seo`,
    `--form-factor=${formFactor}`,
    `--quiet`,
  ];

  if (formFactor === 'desktop') {
    flags.push(
      '--screenEmulation.disabled',
      '--throttling.rttMs=40',
      '--throttling.throughputKbps=10240',
      '--throttling.cpuSlowdownMultiplier=1'
    );
  }

  const cmd = `CHROME_PATH="${CHROME_PATH}" npx lighthouse ${flags.join(' ')}`;
  const stdout = execSync(cmd, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
  const report = JSON.parse(stdout);

  return {
    performance: Math.round(report.categories.performance.score * 100),
    accessibility: Math.round(report.categories.accessibility.score * 100),
    bestPractices: Math.round(report.categories['best-practices'].score * 100),
    seo: Math.round(report.categories.seo.score * 100),
    fcp: report.audits['first-contentful-paint']?.numericValue ?? 0,
    lcp: report.audits['largest-contentful-paint']?.numericValue ?? 0,
    cls: report.audits['cumulative-layout-shift']?.numericValue ?? 0,
    tbt: report.audits['total-blocking-time']?.numericValue ?? 0,
    si: report.audits['speed-index']?.numericValue ?? 0,
    inp: report.audits['interaction-to-next-paint']?.displayValue ?? 'N/A (Field metric / no user interactions)',
  };
}

async function main() {
  const label = process.argv[2] || 'baseline';
  console.log(`Starting audit for [${label}]...`);

  const server = spawn('npx', ['--yes', 'serve', '-l', String(PORT), 'dist'], {
    stdio: 'ignore',
    detached: false,
  });

  try {
    await sleep(2500);

    const results = { desktop: [], mobile: [] };

    for (const mode of ['desktop', 'mobile']) {
      console.log(`Running 3x audits for ${mode}...`);
      for (let i = 1; i <= RUNS; i++) {
        process.stdout.write(`  Run ${i}/${RUNS}... `);
        const res = await runLighthouse(mode);
        results[mode].push(res);
        console.log(`Perf: ${res.performance}, A11y: ${res.accessibility}, BP: ${res.bestPractices}, SEO: ${res.seo}`);
      }
    }

    const summary = {};
    for (const mode of ['desktop', 'mobile']) {
      const runs = results[mode];
      summary[mode] = {
        performance: median(runs.map((r) => r.performance)),
        accessibility: median(runs.map((r) => r.accessibility)),
        bestPractices: median(runs.map((r) => r.bestPractices)),
        seo: median(runs.map((r) => r.seo)),
        fcp: `${(median(runs.map((r) => r.fcp)) / 1000).toFixed(2)}s`,
        lcp: `${(median(runs.map((r) => r.lcp)) / 1000).toFixed(2)}s`,
        cls: median(runs.map((r) => r.cls)).toFixed(3),
        tbt: `${Math.round(median(runs.map((r) => r.tbt)))}ms`,
        si: `${(median(runs.map((r) => r.si)) / 1000).toFixed(2)}s`,
        inp: runs[0].inp,
      };
    }

    const outputDir = path.resolve('audit-results');
    fs.mkdirSync(outputDir, { recursive: true });
    const outputPath = path.join(outputDir, `lighthouse-${label}.json`);
    fs.writeFileSync(outputPath, JSON.stringify({ label, summary, raw: results }, null, 2));

    console.log(`\nAudit [${label}] Completed. Saved to ${outputPath}`);
    console.log(JSON.stringify(summary, null, 2));
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
