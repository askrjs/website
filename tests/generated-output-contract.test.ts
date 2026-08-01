import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { docsCatalog } from '../src/pages/docs/catalog';
import { marketingRouteMetadata } from '../src/pages/marketing/_routes';

interface StaticMetadata {
  readonly totalRoutes: number;
  readonly successful: number;
  readonly failed: number;
}

const root = process.cwd();
const dist = resolve(root, 'dist');

describe('generated output', () => {
  it('contains every route and the manual GA4 page-view configuration', () => {
    const metadata = JSON.parse(
      readFileSync(resolve(dist, 'metadata.json'), 'utf8')
    ) as StaticMetadata;
    const expectedRoutes =
      docsCatalog.length + Object.keys(marketingRouteMetadata).length;

    expect(metadata.totalRoutes).toBe(expectedRoutes);
    expect(metadata.successful).toBe(expectedRoutes);
    expect(metadata.failed).toBe(0);

    const htmlFiles = readdirSync(dist, { recursive: true })
      .map(String)
      .filter((file) => file.endsWith('.html'));
    expect(htmlFiles.length).toBeGreaterThanOrEqual(expectedRoutes);

    const packageVersions = new Set(
      Object.keys(
        JSON.parse(readFileSync(resolve(root, 'package-lock.json'), 'utf8'))
          .packages as Record<string, unknown>
      )
        .filter((path) => path.startsWith('node_modules/@askrjs/'))
        .map((path) =>
          JSON.parse(readFileSync(resolve(root, path, 'package.json'), 'utf8'))
        )
        .map((manifest) => String(manifest.version))
    );

    for (const file of htmlFiles) {
      const html = readFileSync(resolve(dist, file), 'utf8');
      expect(html, file).toContain('G-TXZTWQFV59');
      expect(html, file).toContain('send_page_view: false');
      expect(html.match(/gtag\('config', 'G-TXZTWQFV59'/g), file).toHaveLength(
        1
      );
      expect(html, file).not.toContain("gtag('event', 'page_view'");
      for (const version of packageVersions) {
        expect(
          html,
          `${file} renders package version ${version}`
        ).not.toContain(version);
      }
    }
  });
});
