import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const svgContent = fs.readFileSync('public/logos/horizontal/default/cubycrate-horizontal-color.svg', 'utf8')
  .replace(/<\?xml.*?\?>/, '')
  .replace(/<!DOCTYPE.*?>/, '');

const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      background-color: #0F130E;
      background-image: 
        radial-gradient(ellipse 65% 50% at 50% 28%, rgba(153, 171, 94, 0.12) 0%, transparent 70%),
        radial-gradient(circle at 85% 85%, rgba(221, 161, 94, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 15% 85%, rgba(96, 108, 56, 0.10) 0%, transparent 50%);
      color: #F0EEE3;
      font-family: 'Montserrat', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .inner-card {
      width: 1120px;
      height: 550px;
      border-radius: 20px;
      background: rgba(24, 32, 23, 0.75);
      border: 1px solid rgba(153, 171, 94, 0.2);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 60px;
      position: relative;
    }
    .logo-container {
      width: 620px;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }
    .logo-container svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .tagline {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 32px;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #DDA15E;
      margin-bottom: 12px;
    }
    .descriptor {
      font-size: 20px;
      font-weight: 500;
      color: #9CA88F;
      text-align: center;
      max-width: 800px;
      line-height: 1.4;
      margin-bottom: 32px;
    }
    .badges {
      display: flex;
      gap: 16px;
    }
    .badge {
      background: rgba(153, 171, 94, 0.12);
      border: 1px solid rgba(153, 171, 94, 0.28);
      color: #ADCB8A;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 8px 18px;
      border-radius: 9999px;
    }
    .url {
      position: absolute;
      bottom: 24px;
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.1em;
      color: rgba(240, 238, 227, 0.45);
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="inner-card">
    <div class="logo-container">
      ${svgContent}
    </div>
    <div class="tagline">Your files. Your server. Your rules.</div>
    <div class="descriptor">Lightweight, open-source, self-hosted file drive for teams.<br>Organize and share files using local or S3-compatible storage.</div>
    <div class="badges">
      <div class="badge">Open Source</div>
      <div class="badge">Local & S3 Storage</div>
      <div class="badge">Self-Hosted</div>
    </div>
    <div class="url">cubycrate.com</div>
  </div>
</body>
</html>`;

const tmpHtml = path.resolve('og-temp.html');
fs.writeFileSync(tmpHtml, html);

const outputPath = path.resolve('public/og-image.png');
const cmd = `"${CHROME_PATH}" --headless --disable-gpu --window-size=1200,630 --screenshot="${outputPath}" "file://${tmpHtml}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Generated OG image: ${outputPath}`);
} finally {
  fs.unlinkSync(tmpHtml);
}
