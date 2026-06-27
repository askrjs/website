export const allowedLeadingUnderscorePageFiles = [
  '_routes.ts',
  '_layout.tsx',
] as const;

export const reservedPageModuleNames = new Set(['index.ts', 'index.tsx']);

export const pageModuleNamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface StructureRuleRow {
  layer: string;
  rule: string;
  examples: string[];
}

export interface StructureOwnershipRow {
  layer: string;
  owns: string;
  composition: string;
  doesNotOwn: string;
}

export const structureRuleRows: StructureRuleRow[] = [
  {
    layer: 'Route registries',
    rule: 'Only `_routes.ts` may define route packs, and only `_layout.tsx` may define a route shell.',
    examples: ['src/pages/_routes.ts', 'src/pages/docs/_layout.tsx'],
  },
  {
    layer: 'Page modules',
    rule: 'Page modules must be kebab-case `.ts` or `.tsx` files and must not use `index.ts` or `index.tsx`.',
    examples: ['home/home-page.tsx', 'docs/docs-page.tsx', 'ui/ui-page.tsx'],
  },
  {
    layer: 'Route-local helpers',
    rule: 'Helpers stay beside the route they serve and use kebab-case names.',
    examples: ['content.ts', 'model.ts', 'registry.ts', 'sections.ts'],
  },
];

export const structureOwnershipRows: StructureOwnershipRow[] = [
  {
    layer: 'Pages',
    owns: 'Route selection, page composition, and article shells.',
    composition:
      'May combine route-local sections, shared page templates, and package-backed chrome.',
    doesNotOwn:
      'A second design system, routing registry logic, or business data models.',
  },
  {
    layer: 'Components',
    owns: 'Small reusable UI compositions inside a route subtree.',
    composition: 'May combine primitives, package controls, and local helpers.',
    doesNotOwn: 'Route registries, docs metadata, or page orchestration.',
  },
  {
    layer: 'Primitives',
    owns: 'The smallest site-specific wrappers around package exports and local assets.',
    composition: 'May wrap icons, tokens, fonts, or low-level controls.',
    doesNotOwn: 'Multi-step page logic or data shaping.',
  },
  {
    layer: 'Shared',
    owns: 'Cross-route helpers that are genuinely reused.',
    composition:
      'Document meta, route types, page primitives, and template shells.',
    doesNotOwn:
      'Route-owned content or product chrome with page-specific behavior.',
  },
  {
    layer: 'Site',
    owns: 'Branding, navigation, and shell glue around the published packages.',
    composition:
      'May adapt theme tokens and package shell pieces for Askr branding.',
    doesNotOwn: 'A parallel component framework or duplicated control set.',
  },
];

export const canonicalProjectStructureTreeLines = [
  'src/',
  '  app/',
  '    client.tsx',
  '    providers.tsx',
  '    server/',
  '      document-template.ts',
  '      entry-server.tsx',
  '  assets/',
  '    fonts/',
  '      jetbrains-mono-latin-400-italic.woff2',
  '      jetbrains-mono-latin-400-normal.woff2',
  '      jetbrains-mono-latin-700-normal.woff2',
  '      mona-sans-latin-wght-italic.woff2',
  '      mona-sans-latin-wght-normal.woff2',
  '      source-serif-4-latin-standard-italic.woff2',
  '      source-serif-4-latin-standard-normal.woff2',
  '  pages/',
  '    _routes.ts',
  '    home/',
  '      _routes.ts',
  '      content.ts',
  '      home-page.tsx',
  '      model.ts',
  '      sections.ts',
  '      sections/',
  '    framework/',
  '      _routes.ts',
  '      framework-page.tsx',
  '    ui/',
  '      _routes.ts',
  '      ui-page.tsx',
  '    themes/',
  '      _routes.ts',
  '      themes-page.tsx',
  '    docs/',
  '      _layout.tsx',
  '      _routes.ts',
  '      content.ts',
  '      docs-page.tsx',
  '      docs-start-page.tsx',
  '      meta-panel.tsx',
  '      registry.ts',
  '      sidebar.tsx',
  '      toc-sidebar.tsx',
  '      types.ts',
  '      foundations/',
  '      getting-started/',
  '      guides/',
  '      reference/',
  '    showcase/',
  '      _routes.ts',
  '      runtime-reference-page.tsx',
  '      theme-reference-page.tsx',
  '      ui/',
  '        _routes.ts',
  '        component-detail.tsx',
  '        ui-reference-page.tsx',
  '        components/',
  '          _routes.ts',
  '        demo-kit/',
  '        demos.ts',
  '        demos/',
  '        model/',
  '        registry.ts',
  '        registry/',
  '  shared/',
  '    document-meta-sync.ts',
  '    document-meta.ts',
  '    link-cards.tsx',
  '    page-primitives.ts',
  '    page-primitives/',
  '    page-templates.ts',
  '    page-templates/',
  '    project-structure.ts',
  '    site-routes.ts',
  '  site/',
  '    brand/',
  '      brand-mark.tsx',
  '    navigation.ts',
  '    primitives.tsx',
  '    primitives/',
  '    shell/',
  '      footer.tsx',
  '      header.tsx',
  '      site-frame.tsx',
  '  styles.css',
  '  styles/',
  '    components.css',
  '    core.css',
  '    docs.css',
  '    pages.css',
  '    responsive.css',
  '    shell.css',
  '  types/',
  '    jsx.d.ts',
  '    modules.d.ts',
  '    props.ts',
] as const;

export const canonicalProjectStructureTree =
  canonicalProjectStructureTreeLines.join('\n');
