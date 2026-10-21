/** Preserve only secret-scanned TS/TSX needed to re-run the Python speech census. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(root, 'original-source');
const targetRoot = path.join(root, 'python-voice-update/reference');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const files = ['App.tsx'];
for (const directory of ['data', 'components']) {
  for (const name of fs.readdirSync(path.join(sourceRoot, directory)).sort()) {
    if (/\.tsx?$/.test(name)) files.push(directory + '/' + name);
  }
}
const manifest = {
  schemaVersion: 1, scope: 'safe-static-python-narration-reference-not-a-complete-python-app',
  sourceRoot: 'original-source', referenceRoot: 'python-voice-update/reference',
  inventory: 'test-results/python-narration-inventory.json',
  inventorySha256: sha(fs.readFileSync(path.join(root, 'test-results/python-narration-inventory.json'))),
  files: [], excludedFiles: [],
};
// Do not silently replace the route or speech components with a redacted variant.
const essential = new Set(['App.tsx', 'components/CodeUi.tsx', 'components/GenericSentenceSlide.tsx',
  'components/GenericWordSlide.tsx', 'components/GenericEssaySlide.tsx',
  'components/GenericLiteracyQuiz.tsx', 'components/GenericWordQuiz.tsx']);
for (const relative of files) {
  const bytes = fs.readFileSync(path.join(sourceRoot, relative));
  const text = bytes.toString('utf8');
  if (/sk-[A-Za-z0-9_-]{20,}|hf_[A-Za-z0-9]{20,}/.test(text)) {
    assert(!essential.has(relative) && !relative.startsWith('data/'),
      'Credential-bearing essential reference cannot be copied: ' + relative);
    manifest.excludedFiles.push({path: relative, reason: 'nonessential implementation excluded by credential scan'});
    continue;
  }
  const target = path.join(targetRoot, relative);
  fs.mkdirSync(path.dirname(target), {recursive: true});
  fs.writeFileSync(target, bytes);
  assert.equal(sha(fs.readFileSync(target)), sha(bytes));
  manifest.files.push({path: relative, source: 'original-source/' + relative,
    sha256: sha(bytes), size: bytes.length, byteIdentical: true});
}
fs.writeFileSync(path.join(targetRoot, 'source-manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
console.log(JSON.stringify({files: manifest.files.length, excludedFiles: manifest.excludedFiles.map(file => file.path),
  directory: manifest.referenceRoot, inventorySha256: manifest.inventorySha256, synthesisInputModified: false}));
