import { describe, expect, it } from 'vitest';
import { apiManifest } from '../src/pages/docs/api-manifest';
import { apiSymbolSets } from '../src/pages/docs/api-snapshot';
import {
  docsByRoute,
  docsCatalog,
  docsSections,
  docsTableOfContents,
  normalizeDocsRoute,
  resolveDocsRoute,
} from '../src/pages/docs/catalog';
import { componentGuideRoute } from '../src/pages/docs/component-coverage';
import { searchDocs } from '../src/pages/docs/search-index';
import { buildUsageGuide } from '../src/pages/docs/usage-guide';

describe('documentation catalog', () => {
  it('teaches component-owned tuple state and current route syntax', () => {
    for (const page of docsCatalog.filter(
      (candidate) => candidate.navSection !== 'Generated API'
    )) {
      const code = buildUsageGuide(page).code;
      expect(
        code,
        `${page.route}: state setters must be destructured`
      ).not.toMatch(/\b(?!headers\b)[A-Za-z_$][\w$]*\.set\s*\(/);
      expect(
        code,
        `${page.route}: state must not be created at module scope`
      ).not.toMatch(/^const\s+[^\n=]+?=\s*state\s*\(/m);
      expect(code, `${page.route}: routes use {name} parameters`).not.toMatch(
        /['"]\/[^'"]*:[A-Za-z_$]/
      );
    }
  });

  it('has unique routes, valid groups, anchors, and complete ordering', () => {
    expect(new Set(docsCatalog.map((page) => page.route)).size).toBe(
      docsCatalog.length
    );
    const groups = new Set(docsSections.map((section) => section.label));
    for (const [index, page] of docsCatalog.entries()) {
      expect(groups.has(page.navGroup)).toBe(true);
      expect(new Set(page.headings.map((heading) => heading.id)).size).toBe(
        page.headings.length
      );
      expect(page.previous).toBe(docsCatalog[index - 1]?.route);
      expect(page.next).toBe(docsCatalog[index + 1]?.route);
    }
  });

  it('normalizes GitHub Pages trailing-slash document URLs', () => {
    for (const page of docsCatalog) {
      expect(normalizeDocsRoute(`${page.route}/`)).toBe(page.route);
      expect(docsByRoute.get(normalizeDocsRoute(`${page.route}/`))).toBe(page);
      expect(
        resolveDocsRoute({
          path: `${page.route}/`,
          matches: [{ path: page.route }],
        })
      ).toBe(page.route);
    }
  });

  it('maps every published UI and theme code entrypoint to an authored guide', () => {
    for (const entrypoint of apiManifest.filter(
      (item) =>
        item.packageName === '@askrjs/ui' ||
        item.packageName === '@askrjs/themes'
    )) {
      const route = componentGuideRoute(entrypoint.importName);
      expect(route, entrypoint.importName).toBeTruthy();
      expect(
        docsByRoute.has(route!),
        `${entrypoint.importName} -> ${route}`
      ).toBe(true);
    }
  });

  it('defines the exact visible section order for every page renderer', () => {
    for (const page of docsCatalog) {
      const toc = docsTableOfContents(page);
      expect(new Set(toc.map((item) => item.id)).size, page.route).toBe(
        toc.length
      );
      if (page.navSection === 'Generated API') {
        expect(toc, page.route).toEqual(page.headings);
      } else if (page.route === '/docs/integrations/lucide-gallery') {
        expect(toc, page.route).toEqual(page.headings);
      } else {
        expect(toc[0]?.id, page.route).toBe('how-to-use');
        expect(toc.slice(1, 1 + page.headings.length), page.route).toEqual(
          page.headings
        );
      }
    }
  });
});

describe('generated API reference', () => {
  it('represents every entrypoint and gives every symbol an anchor', () => {
    for (const entrypoint of apiManifest) {
      const route =
        `/docs/reference/api/${entrypoint.packageName.slice('@askrjs/'.length)}/${entrypoint.slug}` as const;
      expect(docsByRoute.has(route)).toBe(true);
      const symbols = apiSymbolSets[entrypoint.symbolSet];
      expect(new Set(symbols.map((symbol) => symbol.anchor)).size).toBe(
        symbols.length
      );
      expect(
        symbols.every(
          (symbol) => symbol.name && symbol.signature && symbol.anchor
        )
      ).toBe(true);
    }
  });

  it('finds concepts, package imports, component names, and API symbols', () => {
    expect(searchDocs('determinism')[0]?.route).toContain('/docs/');
    expect(
      searchDocs('@askrjs/askr/router').some((record) =>
        record.route.includes('/reference/api/askr/router')
      )
    ).toBe(true);
    expect(
      searchDocs('Button').some((record) => record.title.includes('Button'))
    ).toBe(true);
    expect(
      searchDocs('jsonSchema').some((record) => record.title === 'jsonSchema')
    ).toBe(true);
  });

  it('uses only symbols exported by published package entrypoints', () => {
    const exportsByImport = new Map(
      apiManifest.map((entrypoint) => [
        entrypoint.importName,
        new Set(
          apiSymbolSets[entrypoint.symbolSet].map((symbol) => symbol.name)
        ),
      ])
    );
    for (const page of docsCatalog.filter(
      (candidate) => candidate.navSection !== 'Generated API'
    )) {
      const code = buildUsageGuide(page).code;
      for (const match of code.matchAll(
        /import\s*\{([\s\S]*?)\}\s*from\s*['"](@askrjs\/[^'"]+)['"]/g
      )) {
        const [, names, importName] = match;
        const published = exportsByImport.get(importName);
        expect(published, `${page.route}: ${importName}`).toBeTruthy();
        for (const rawName of names.split(',')) {
          const name = rawName
            .trim()
            .replace(/^type\s+/, '')
            .split(/\s+as\s+/)[0];
          if (name)
            expect(
              published?.has(name),
              `${page.route}: ${importName} does not export ${name}`
            ).toBe(true);
        }
      }
    }
  });
});
