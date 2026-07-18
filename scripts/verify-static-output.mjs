import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(process.cwd(), 'dist');
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function filesIn(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

const metadataPath = resolve(dist, 'metadata.json');
const documentPath = resolve(dist, 'index.html');

assert(existsSync(dist), 'dist/ is missing');
assert(existsSync(metadataPath), 'metadata.json is missing');
assert(existsSync(documentPath), 'index.html is missing');

if (existsSync(metadataPath)) {
  const metadata = JSON.parse(readFileSync(metadataPath, 'utf8'));
  assert(metadata.totalRoutes === 1, 'metadata must report one total route');
  assert(
    metadata.successful === 1,
    'metadata must report one successful route'
  );
  assert(metadata.failed === 0, 'metadata must report no failed routes');
  assert(metadata.routes?.length === 1, 'metadata must contain one route');
  assert(metadata.routes?.[0]?.path === '/', 'the generated route must be /');
  assert(
    metadata.routes?.[0]?.status === 'success',
    'the / route must be successful'
  );
}

if (existsSync(documentPath)) {
  const html = readFileSync(documentPath, 'utf8');
  const app = html.match(/<div id="app">([\s\S]*?)<\/div>/)?.[1] ?? '';
  const assetReferences = Array.from(
    html.matchAll(/(?:src|href)="(\/assets\/[^"?]+\.(?:js|css))"/g),
    (match) => match[1]
  );

  assert(html.includes('Hello, world!'), 'index.html is missing Hello, world!');
  assert(app.trim().length > 0, '#app must contain pre-rendered markup');
  assert(!html.includes('/src/'), 'index.html must not reference source files');
  assert(
    assetReferences.some((path) => /-[A-Za-z0-9_-]+\.js$/.test(path)),
    'index.html must reference a hashed JavaScript asset'
  );
  assert(
    assetReferences.some((path) => /-[A-Za-z0-9_-]+\.css$/.test(path)),
    'index.html must reference a hashed CSS asset'
  );

  for (const asset of assetReferences) {
    assert(existsSync(resolve(dist, `.${asset}`)), `missing asset ${asset}`);
  }
}

for (const legacyDirectory of [
  'docs',
  'framework',
  'showcase',
  'themes',
  'ui',
]) {
  assert(
    !existsSync(resolve(dist, legacyDirectory)),
    `legacy route directory remains: ${legacyDirectory}`
  );
}

for (const file of filesIn(dist)) {
  assert(statSync(file).isFile(), `${file} is not a regular file`);
}

if (errors.length > 0) {
  console.error('Static output verification failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  'Static output verified: one pre-rendered / route with hashed assets.'
);
