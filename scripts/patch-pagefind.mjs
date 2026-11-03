import fs from 'node:fs';
import path from 'node:path';

const workerPath = path.resolve('dist/pagefind/pagefind-worker.js');
if (fs.existsSync(workerPath)) {
  let content = fs.readFileSync(workerPath, 'utf8');
  const target = 'async performFetch(queued){try{queued.resolve(await fetch(queued.input));}';
  const replacement = 'async performFetch(queued){try{let u=queued.input;if(typeof u==="string"&&u.startsWith("/")&&self.location.origin){u=self.location.origin+u;}queued.resolve(await fetch(u));}';
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(workerPath, content, 'utf8');
    console.log('[patch-pagefind] Applied relative URL base resolution patch to dist/pagefind/pagefind-worker.js');
  } else {
    console.log('[patch-pagefind] Worker already patched or pattern absent.');
  }
}
