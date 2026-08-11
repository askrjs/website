import { describe, expect, it } from 'vitest';
import { apiManifest } from '../src/pages/docs/api-manifest';
import { apiSymbolSets } from '../src/pages/docs/api-snapshot';
import { docsCatalog } from '../src/pages/docs/catalog';
import {
  docsMarkdownPath,
  docsMarkdownUrl,
  llmDocsArtifacts,
  markdownProse,
  renderDocsPageMarkdown,
  renderLlmsFull,
} from '../src/pages/docs/markdown';
import {
  buildUsageGuide,
  routeExampleFor,
} from '../src/pages/docs/usage-guide';

describe('LLM documentation artifacts', () => {
  it('should render a clean Markdown counterpart for every docs route', () => {
    const artifacts = llmDocsArtifacts();
    expect(artifacts.size).toBe(docsCatalog.length + 1);
    expect(
      new Set(docsCatalog.map((page) => docsMarkdownPath(page.route))).size
    ).toBe(docsCatalog.length);

    for (const page of docsCatalog) {
      const markdown = artifacts.get(docsMarkdownPath(page.route));
      expect(markdown, page.route).toBeDefined();
      expect(markdown, page.route).toMatch(
        new RegExp(
          `^# ${markdownProse(page.title).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n`
        )
      );
      expect(markdown, page.route).toContain(markdownProse(page.description));
      expect(markdown, page.route).toContain(
        `Source: [https://askrjs.com${page.route}](https://askrjs.com${page.route})`
      );
      expect(markdown?.endsWith('\n'), page.route).toBe(true);

      if (page.navSection !== 'Generated API') {
        for (const heading of page.headings) {
          expect(markdown, `${page.route}#${heading.id}`).toContain(
            `## ${markdownProse(heading.title)}`
          );
          expect(markdown, `${page.route}#${heading.id}`).toContain(
            markdownProse(heading.body)
          );
          if (heading.code) {
            expect(markdown, `${page.route}#${heading.id}`).toContain(
              heading.code
            );
          }
        }
        const guide = buildUsageGuide(page, routeExampleFor(page.route));
        if (guide?.intro) {
          expect(markdown, `${page.route} example`).toContain(
            markdownProse(guide.intro)
          );
        }
        if (guide) {
          expect(markdown, `${page.route} example`).toContain(guide.code);
        }
      }
    }
  });

  it('should escape HTML-like prose without changing inline code', () => {
    expect(markdownProse('Use <form> with `State<T>` & labels.')).toBe(
      'Use &lt;form&gt; with `State<T>` &amp; labels.'
    );
  });

  it('should include every generated entrypoint and signature', () => {
    for (const entrypoint of apiManifest) {
      const page = docsCatalog.find(
        (candidate) =>
          candidate.route ===
          `/docs/reference/api/${entrypoint.packageName.slice('@askrjs/'.length)}/${entrypoint.slug}`
      );
      expect(page, entrypoint.importName).toBeDefined();
      const markdown = renderDocsPageMarkdown(page!);
      for (const symbol of apiSymbolSets[entrypoint.symbolSet] ?? []) {
        expect(markdown, `${entrypoint.importName}#${symbol.anchor}`).toContain(
          symbol.signature
        );
      }
    }
  });

  it('should combine the complete ordered corpus with Markdown links', () => {
    const full = renderLlmsFull();
    expect(full).toMatch(/^# Askr Documentation Corpus\n\n> /);
    expect(full).toContain('https://askrjs.com/llms.txt');
    for (const page of docsCatalog) {
      expect(full, page.route).toContain(
        `[${page.title}](${docsMarkdownUrl(page.route)})`
      );
      const source = `Source: [https://askrjs.com${page.route}](https://askrjs.com${page.route})`;
      expect(full.split(source).length - 1, page.route).toBe(1);
    }
  });

  it('should resolve every generated Markdown link to an artifact', () => {
    const artifacts = llmDocsArtifacts();
    for (const [source, markdown] of artifacts) {
      const links = [
        ...markdown.matchAll(
          /\]\(https:\/\/askrjs\.com\/([^)]+\.(?:md|txt))\)/g
        ),
      ];
      for (const link of links) {
        if (link[1] === 'llms.txt') continue;
        expect(artifacts.has(link[1]!), `${source} -> ${link[1]}`).toBe(true);
      }
    }
  });
});
