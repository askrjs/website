import { readFileSync } from 'node:fs';
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
import { cliSnapshot } from '../src/pages/docs/cli-snapshot';
import { lucideIcons } from '../src/pages/docs/lucide-icons';
import { searchDocs } from '../src/pages/docs/search-index';
import { buildUsageGuide } from '../src/pages/docs/usage-guide';
import { upgradeGuidance } from '../src/pages/docs/release-notes';
import { headingOverrides } from '../src/pages/docs/content-overrides';
import { routeRegistry } from '../src/pages/_routes';
import { registry as staticRegistry } from '../ssg.config';
import {
  componentDemoFor,
  componentDemoTitles,
} from '../src/pages/docs/component-demos';

describe('documentation catalog', () => {
  it('uses one browser registry for marketing and documentation routes', () => {
    const paths = new Set(
      routeRegistry.manifest.records.map((record) => record.path)
    );

    expect(paths.has('/')).toBe(true);
    expect(paths.has('/platform')).toBe(true);
    expect(paths.has('/docs')).toBe(true);
    expect(paths.has('/docs/getting-started')).toBe(true);
  });

  it('reuses the browser registry for static generation', () => {
    expect(staticRegistry).toBe(routeRegistry);
  });

  it('teaches component-owned tuple state and current route syntax', () => {
    for (const page of docsCatalog.filter(
      (candidate) => candidate.navSection !== 'Generated API'
    )) {
      // Pages with nothing page-specific to show render no example section.
      const guide = buildUsageGuide(page);
      if (!guide) continue;
      const code = guide.code;
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
      expect(code, `${page.route}: schemas expose jsonSchema`).not.toMatch(
        /\.openapi\b/
      );
      expect(
        code,
        `${page.route}: query values use RouteQuery.get()`
      ).not.toMatch(/route\.query\.(?!get\()/);
      expect(code, `${page.route}: Alert uses a published variant`).not.toMatch(
        /<Alert\b[^>]*variant=["']destructive["']/
      );
      expect(code, `${page.route}: Toggle uses onPress`).not.toContain(
        'onPressedChange'
      );
      expect(code, `${page.route}: Slider accepts a scalar value`).not.toMatch(
        /<Slider\b[^>]*value=\{\[/
      );
      expect(code, `${page.route}: JSX labels use htmlFor`).not.toMatch(
        /<(?:label|FieldLabel)\b[^>]*\sfor=/
      );
      expect(code, `${page.route}: multipart forms use FormData`).not.toMatch(
        /\s(?:encType|enctype)=/
      );
      expect(code, `${page.route}: Case owns the fallback branch`).not.toMatch(
        /<Match\b[^>]*\svalue=|<Case\b[^>]*\swhen=/
      );
      expect(
        code,
        `${page.route}: dynamic collections use keyed For`
      ).not.toMatch(/\b(?:statuses|people|events|projects)\.map\(/);
    }
  });

  it('keeps specialized component and chart examples page-specific', () => {
    const expectedByRoute = {
      '/docs/components/alert-dialog': 'AlertDialog',
      '/docs/components/drawer-and-sheet': 'Sheet',
      '/docs/components/hover-card': 'HoverCard',
      '/docs/components/menubar': 'Menubar',
      '/docs/components/data-table': 'DataTable',
      '/docs/components/virtual-list': 'VirtualList',
      '/docs/components/virtual-table': 'VirtualTable',
      '/docs/components/application-chrome': 'Sidebar',
      '/docs/components/avatar-and-item': 'Avatar',
      '/docs/components/application-layout': 'PageHeader',
      '/docs/components/advanced-layout': 'Grid',
    } as const;

    for (const [route, symbol] of Object.entries(expectedByRoute)) {
      const page = docsByRoute.get(route as `/docs${string}`);
      expect(page, route).toBeTruthy();
      expect(buildUsageGuide(page!)?.code, route).toContain(symbol);
    }

    const chartExamples = docsCatalog
      .filter((page) => page.navSection === 'Charts')
      .map((page) => buildUsageGuide(page)?.code);
    expect(new Set(chartExamples).size).toBe(chartExamples.length);
    expect(
      buildUsageGuide(docsByRoute.get('/docs/charts/channels-and-transforms')!)
        ?.code
    ).toContain(`y={movingAverage('requests', { window: 7 })}`);
    expect(
      buildUsageGuide(docsByRoute.get('/docs/components/application-layout')!)
        ?.code
    ).toContain('<PageHeader title=');
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

  it('provides interactive demos for behavior-heavy component pages', () => {
    const expected = [
      'Dialog',
      'Select',
      'Combobox and Command',
      'Calendar and Date Picker',
      'Tabs',
      'Accordion and Collapsible',
      'Switch',
      'Slider',
      'Checkbox',
      'Radio Group',
      'Popover',
      'Tooltip',
      'Menu, Dropdown, and Context Menu',
      'Toast and Sonner',
    ];
    expect(componentDemoTitles).toEqual(expect.arrayContaining(expected));
    for (const title of expected) expect(componentDemoFor(title)).toBeTruthy();
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

  it('keeps upgrade guidance present for the docs landing page', () => {
    expect(upgradeGuidance.length).toBeGreaterThanOrEqual(2);
    expect(
      upgradeGuidance.every((note) => note.title && note.when && note.summary)
    ).toBe(true);
  });

  it('keeps route guidance registry-first and signature-accurate', () => {
    const prose = JSON.stringify(headingOverrides);
    expect(prose).toContain('getRouteWarnings({ registry })');
    expect(prose).not.toContain('getRouteWarnings()');
    expect(prose).not.toContain(
      'ServerAppOptions also accepts a standalone routes array'
    );
    expect(prose).not.toContain('manifest-only');
  });

  it('keeps hand-written CLI guidance aligned with generated behavior', () => {
    const prose = JSON.stringify(headingOverrides);
    expect(prose).not.toContain('nine subcommands');
    expect(prose).not.toContain('CLI still reports success');
    expect(prose).not.toContain('upgrade never bypasses');
    expect(prose).toContain('--force/-f');
    expect(cliSnapshot.commands).toEqual(
      expect.arrayContaining([
        'analyze',
        'check',
        'database',
        'doctor',
        'repair',
      ])
    );
    expect(cliSnapshot.commands).not.toContain('verify-hydration');
    expect(prose).toContain('database');
    expect(prose).not.toContain('verify-hydration');
  });

  it('renders immutable collections with ordinary map expressions', () => {
    const staticCollectionFiles = [
      'site-footer.tsx',
      'docs/_layout.tsx',
      'docs/api-page.tsx',
      'docs/page.tsx',
      'marketing/components.tsx',
      'marketing/home.tsx',
    ];
    for (const file of staticCollectionFiles) {
      const source = readFileSync(
        new URL(`../src/pages/${file}`, import.meta.url),
        'utf8'
      );
      expect(source, file).toContain('.map(');
      expect(source, file).not.toContain('<For');
    }
  });

  it('keeps audited marketing claims within shipped boundaries', () => {
    const source = [
      'home.tsx',
      'platform.tsx',
      'full-stack.tsx',
      'themes.tsx',
      'production.tsx',
    ]
      .map((file) =>
        readFileSync(
          new URL(`../src/pages/marketing/${file}`, import.meta.url),
          'utf8'
        )
      )
      .join('\n');

    expect(source).not.toContain('Only <code>@askrjs/askr</code>');
    expect(source).not.toContain('register on the same router');
    expect(source).not.toContain('none of that has to be re-verified');
    expect(source).not.toContain('Two outputs, one build');
    expect(source).toContain('one application composition root');
    expect(source).toContain('two deployment paths');
  });

  it('keeps the live shared layout mobile-safe', () => {
    const styles = readFileSync(
      new URL('../src/styles.css', import.meta.url),
      'utf8'
    );
    const search = readFileSync(
      new URL('../src/pages/docs/search.tsx', import.meta.url),
      'utf8'
    );

    expect(styles).toContain(`.site-header .docs-search__trigger span`);
    expect(styles).toContain(`.site-header .docs-search__trigger kbd`);
    expect(styles).toContain('max-height: calc(100dvh - 1rem)');
    expect(styles).toContain('max-height: calc(100dvh - 5.25rem)');
    expect(styles).toMatch(
      /\.docs-search__backdrop\s*\{[^}]*align-items: start;[^}]*overflow: hidden;/s
    );
    expect(styles).not.toMatch(
      /\.docs-search__backdrop\s*\{[^}]*align-items: stretch;/s
    );
    expect(styles).toContain('.page-navigation__inner');
    expect(styles).toContain('.component-demo__surface');
    expect(styles).toMatch(
      /\.page-navigation__link span\s*\{[^}]*overflow-wrap: anywhere;/s
    );
    expect(styles).toMatch(
      /\.docs-article h1\s*\{[^}]*overflow-wrap: anywhere;/s
    );
    expect(styles).toMatch(
      /\.api-symbol h3 a\s*\{[^}]*overflow-wrap: anywhere;/s
    );
    expect(styles).toMatch(
      /\.component-demo__surface\s*\{[^}]*overflow-x: auto;/s
    );
    expect(styles).toMatch(
      /\.sequence\[data-columns\]\s*\{[^}]*grid-template-columns: minmax\(0, 1fr\);/s
    );
    expect(styles).toMatch(
      /\.flow-map__nodes\[data-count\]\s*\{[^}]*grid-template-columns: minmax\(0, 1fr\);/s
    );
    expect(styles).toContain('overflow-x: clip');
    expect(styles).not.toContain('.docs-mobile-header');
    expect(styles).not.toContain('.docs-shell');
    expect(styles).not.toContain('.docs-sidebar-shell');
    expect(styles).not.toContain('.docs-drawer');
    expect(search).toContain('aria-expanded={open()}');
  });
});

describe('generated API reference', () => {
  it('discovers real Lucide components and excludes its factory', () => {
    const names = lucideIcons.map((icon) => icon.name);
    expect(names).toEqual(
      expect.arrayContaining(['CircleIcon', 'FullscreenIcon', 'SearchIcon'])
    );
    expect(names).not.toContain('createIcon');
    const lucideEntrypoint = apiManifest.find(
      (entrypoint) =>
        entrypoint.packageName === '@askrjs/lucide' &&
        entrypoint.subpath === '.'
    );
    const renderedNames = (apiSymbolSets[lucideEntrypoint!.symbolSet] ?? [])
      .filter(
        (symbol) =>
          symbol.name !== 'createIcon' &&
          (symbol.typeOnly || names.includes(symbol.name))
      )
      .map((symbol) => symbol.name);
    expect(renderedNames).not.toContain('createIcon');
  });

  it('uses a visual, attributed page for the Lucide root API', async () => {
    const page = docsByRoute.get('/docs/reference/api/lucide/root');
    expect(page).toBeTruthy();
    const source = readFileSync(
      new URL('../src/pages/docs/lucide-api-page.tsx', import.meta.url),
      'utf8'
    );
    expect(source).toContain('lucideIconsByName');
    expect(source).toContain('https://lucide.dev/');
    expect(source).toContain('id={symbol.anchor}');
    expect(source).toContain('element.scrollIntoView()');
    expect((await page!.loader()).default.name).toBe('LucideApiPage');
  });

  it('represents every entrypoint and gives every symbol an anchor', () => {
    for (const entrypoint of apiManifest) {
      const route =
        `/docs/reference/api/${entrypoint.packageName.slice('@askrjs/'.length)}/${entrypoint.slug}` as const;
      expect(docsByRoute.has(route)).toBe(true);
      const symbols = apiSymbolSets[entrypoint.symbolSet] ?? [];
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
          (apiSymbolSets[entrypoint.symbolSet] ?? []).map(
            (symbol) => symbol.name
          )
        ),
      ])
    );
    for (const page of docsCatalog.filter(
      (candidate) => candidate.navSection !== 'Generated API'
    )) {
      const guide = buildUsageGuide(page);
      if (!guide) continue;
      const code = guide.code;
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
