import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const siteOrigin = 'https://askrjs.com';
const dist = resolve(process.cwd(), 'dist');
const metadata = JSON.parse(
  readFileSync(resolve(dist, 'metadata.json'), 'utf8')
);

const paths = (metadata.routes ?? [])
  .filter(
    (route) =>
      route.status === 'success' &&
      route.path !== '/404' &&
      !route.path.includes('*')
  )
  .map((route) => route.path);

const uniquePaths = [...new Set(paths)];
if (uniquePaths.length !== paths.length) {
  throw new Error('Cannot generate sitemap with duplicate routes.');
}

const orderedPaths = [
  ...uniquePaths.filter((path) => path === '/'),
  ...uniquePaths.filter((path) => path !== '/').sort(),
];

function escapeXml(value) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[character]
  );
}

const urls = orderedPaths
  .map((path) => {
    const location = escapeXml(new URL(path, siteOrigin).href);
    return `  <url>\n    <loc>${location}</loc>\n  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(resolve(dist, 'sitemap.xml'), sitemap);
