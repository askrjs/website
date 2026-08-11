import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { docsCatalog } from '../src/pages/docs/catalog';
import {
  docsMarkdownPath,
  renderDocsPageMarkdown,
  renderLlmsFull,
} from '../src/pages/docs/markdown';
import { marketingRouteMetadata } from '../src/pages/marketing/_routes';

interface StaticMetadata {
  readonly totalRoutes: number;
  readonly successful: number;
  readonly failed: number;
}

const root = process.cwd();
const dist = resolve(root, 'dist');

describe('generated output', () => {
  it('should publish the LLM documentation index at the site root', () => {
    const llms = readFileSync(resolve(dist, 'llms.txt'), 'utf8');

    expect(llms).toMatch(/^# Askr\n\n> /);
    expect(llms).toContain('https://askrjs.com/docs/getting-started/index.md');
    expect(llms).toContain('https://askrjs.com/docs/reference/index.md');
    expect(llms).toContain('https://askrjs.com/llms-full.txt');
    expect(llms).toContain('https://github.com/askrjs/askr');

    const full = readFileSync(resolve(dist, 'llms-full.txt'), 'utf8');
    expect(full).toMatch(/^# Askr Documentation Corpus\n\n> /);
    expect(full).toBe(renderLlmsFull());
    const markdownFiles = readdirSync(resolve(dist, 'docs'), {
      recursive: true,
    })
      .map(String)
      .filter((file) => file.endsWith('index.md'));
    expect(markdownFiles).toHaveLength(docsCatalog.length);

    for (const match of llms.matchAll(
      /\]\(https:\/\/askrjs\.com\/([^)]+)\)/g
    )) {
      const path = match[1]!;
      const outputPath = /\.[a-z0-9]+$/i.test(path)
        ? resolve(dist, path)
        : resolve(dist, path, 'index.html');
      expect(existsSync(outputPath), path).toBe(true);
    }

    for (const page of docsCatalog) {
      const markdown = readFileSync(
        resolve(dist, docsMarkdownPath(page.route)),
        'utf8'
      );
      expect(markdown, page.route).toContain(
        `Source: [https://askrjs.com${page.route}](https://askrjs.com${page.route})`
      );
      expect(markdown, page.route).toBe(renderDocsPageMarkdown(page));
      expect(full, page.route).toContain(
        `Source: [https://askrjs.com${page.route}](https://askrjs.com${page.route})`
      );

      const html = readFileSync(
        resolve(dist, page.route.slice(1), 'index.html'),
        'utf8'
      );
      expect(html, page.route).toContain(
        `<link data-askr-head="" rel="alternate" href="${page.route}/index.md" type="text/markdown">`
      );
      expect(html, page.route).toContain(
        '<link data-askr-head="" rel="describedby" href="/llms.txt" type="text/plain">'
      );
    }
  });

  it('should contain every route and the manual GA4 page-view configuration', () => {
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
