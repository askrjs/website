import { apiManifest } from './api-manifest';
import { apiSymbolSets } from './api-snapshot';
import { docsCatalog, docsSections } from './catalog';
import { cliSnapshot } from './cli-snapshot';
import { upgradeGuidance } from './release-notes';
import type { DocsPageDefinition } from './types';
import { buildUsageGuide, routeExampleFor } from './usage-guide';

const siteUrl = 'https://askrjs.com';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Escape HTML-like prose while preserving inline Markdown code spans. */
export function markdownProse(value: string): string {
  let result = '';
  let offset = 0;
  for (const match of value.matchAll(/(`+)([\s\S]*?)\1/g)) {
    const index = match.index ?? 0;
    result += escapeHtml(value.slice(offset, index));
    result += match[0];
    offset = index + match[0].length;
  }
  return result + escapeHtml(value.slice(offset));
}

function codeFence(code: string, language: string): string {
  const longestFence = Math.max(
    0,
    ...[...code.matchAll(/`+/g)].map((match) => match[0].length)
  );
  const fence = '`'.repeat(Math.max(3, longestFence + 1));
  return `${fence}${language}\n${code}\n${fence}`;
}

function exampleLanguage(code: string): string {
  return /^(?:npm|npx|cd|rg)\b/m.test(code) ? 'sh' : 'tsx';
}

export function docsMarkdownPath(route: `/docs${string}`): string {
  return `${route.slice(1)}/index.md`;
}

export function docsMarkdownUrl(route: `/docs${string}`): string {
  return `${siteUrl}${route}/index.md`;
}

function pageHeader(page: DocsPageDefinition): string[] {
  const canonical = `${siteUrl}${page.route}`;
  const packages = page.packages
    .map((item) => item.importPath ?? item.name)
    .join(', ');
  return [
    `# ${markdownProse(page.title)}`,
    '',
    `> ${markdownProse(page.description)}`,
    '',
    `Source: [${canonical}](${canonical})`,
    '',
    `Status: ${page.status}. Packages: ${packages}.`,
  ];
}

function apiPageMarkdown(page: DocsPageDefinition): string {
  const entrypoint = apiManifest.find(
    (candidate) =>
      `/docs/reference/api/${candidate.packageName.slice('@askrjs/'.length)}/${candidate.slug}` ===
      page.route
  );
  if (!entrypoint) {
    throw new Error(`Missing API entrypoint for ${page.route}`);
  }
  const symbols = apiSymbolSets[entrypoint.symbolSet] ?? [];
  const lines = [
    ...pageHeader(page),
    '',
    '## Exports',
    '',
    `This entrypoint publishes ${symbols.length} exports from the declarations shipped by ${entrypoint.packageName}.`,
  ];
  for (const symbol of symbols) {
    lines.push('', `### \`${symbol.name}\``, '');
    lines.push(codeFence(symbol.signature, 'ts'));
  }
  lines.push(...pagination(page));
  return `${lines.join('\n')}\n`;
}

function sectionLinks(page: DocsPageDefinition): string[] {
  const section = docsSections.find(
    (candidate) => candidate.landingRoute === page.route
  );
  if (!section) return [];
  const pages = section.pages.filter((candidate) => candidate !== page);
  if (pages.length === 0) return [];
  return [
    '',
    '## In this section',
    '',
    ...pages.map(
      (candidate) =>
        `- [${markdownProse(candidate.title)}](${docsMarkdownUrl(candidate.route)}): ${markdownProse(candidate.description)}`
    ),
  ];
}

function specialPageContent(page: DocsPageDefinition): string[] {
  if (page.route === '/docs') {
    return [
      '',
      '## Documentation sections',
      '',
      ...docsSections
        .filter((section) => section.landingRoute !== '/docs')
        .map(
          (section) =>
            `- [${markdownProse(section.label)}](${docsMarkdownUrl(section.landingRoute)})`
        ),
      '',
      '## Upgrade guidance',
      '',
      ...upgradeGuidance.flatMap((note) => [
        `### ${markdownProse(note.title)}`,
        '',
        `_${markdownProse(note.when)}_`,
        '',
        markdownProse(note.summary),
        '',
      ]),
    ];
  }
  if (page.route === '/docs/tooling/cli-overview') {
    return [
      '',
      '## Published commands',
      '',
      'These commands come from `@askrjs/cli`. Planned generators are not available commands.',
      '',
      ...cliSnapshot.commands.map((command) => `- \`askr ${command} --help\``),
    ];
  }
  if (page.route === '/docs/reference/api') {
    return [
      '',
      '## API entrypoints',
      '',
      ...docsCatalog
        .filter((candidate) => candidate.navSection === 'Generated API')
        .map(
          (candidate) =>
            `- [${markdownProse(candidate.title)}](${docsMarkdownUrl(candidate.route)}): ${markdownProse(candidate.description)}`
        ),
    ];
  }
  if (page.route === '/docs/integrations/lucide-gallery') {
    const entrypoint = apiManifest.find(
      (candidate) =>
        candidate.packageName === '@askrjs/lucide' && candidate.subpath === '.'
    );
    if (!entrypoint) throw new Error('Missing @askrjs/lucide API entrypoint');
    const icons = (apiSymbolSets[entrypoint.symbolSet] ?? [])
      .map((symbol) => symbol.name)
      .filter((name) => name.endsWith('Icon'));
    return [
      '',
      '## Published icon components',
      '',
      codeFence(icons.join('\n'), 'text'),
    ];
  }
  return [];
}

function pagination(page: DocsPageDefinition): string[] {
  const links = [
    page.previous ? `[Previous](${docsMarkdownUrl(page.previous)})` : undefined,
    page.next ? `[Next](${docsMarkdownUrl(page.next)})` : undefined,
  ].filter((link): link is string => Boolean(link));
  return links.length > 0
    ? ['', '## Documentation navigation', '', links.join(' | ')]
    : [];
}

export function renderDocsPageMarkdown(page: DocsPageDefinition): string {
  if (page.navSection === 'Generated API') return apiPageMarkdown(page);

  const lines = pageHeader(page);
  const guide = buildUsageGuide(page, routeExampleFor(page.route));
  if (guide) {
    lines.push('', '## Example', '');
    if (guide.intro) lines.push(markdownProse(guide.intro), '');
    lines.push(codeFence(guide.code, exampleLanguage(guide.code)));
  }

  for (const heading of page.headings) {
    lines.push(
      '',
      `## ${markdownProse(heading.title)}`,
      '',
      markdownProse(heading.body)
    );
    if (heading.code) lines.push('', codeFence(heading.code, 'tsx'));
  }

  lines.push(
    ...sectionLinks(page),
    ...specialPageContent(page),
    ...pagination(page)
  );
  return `${lines.join('\n')}\n`;
}

export function renderLlmsFull(): string {
  const pages = docsCatalog.map(renderDocsPageMarkdown);
  const contents = docsCatalog.map(
    (page) =>
      `- [${markdownProse(page.title)}](${docsMarkdownUrl(page.route)}): ${markdownProse(page.description)}`
  );
  return [
    '# Askr Documentation Corpus',
    '',
    '> Complete, generated documentation for the Askr full-stack TypeScript framework.',
    '',
    'For a curated index, see [llms.txt](https://askrjs.com/llms.txt).',
    '',
    '## Contents',
    '',
    ...contents,
    '',
    '---',
    '',
    ...pages.flatMap((page, index) =>
      index === pages.length - 1
        ? [page.trimEnd()]
        : [page.trimEnd(), '', '---', '']
    ),
    '',
  ].join('\n');
}

export function llmDocsArtifacts(): ReadonlyMap<string, string> {
  return new Map([
    ['llms-full.txt', renderLlmsFull()],
    ...docsCatalog.map(
      (page) =>
        [docsMarkdownPath(page.route), renderDocsPageMarkdown(page)] as const
    ),
  ]);
}
