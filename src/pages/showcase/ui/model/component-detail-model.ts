import {
  getComponentSource,
  getComponentUsage,
  type UiComponentMeta,
} from '../registry';

export function createUiComponentDetailModel(meta: UiComponentMeta) {
  const source = getComponentSource(meta);
  const usage = getComponentUsage(meta);
  const componentName = source.importName;
  const snippet = source.importFrom
    ? [
        "import { state } from '@askrjs/askr';",
        `import { ${componentName} } from '${source.importFrom}';`,
        '',
        `export function ${componentName}Example() {`,
        '  const [active, setActive] = state(false);',
        '',
        '  return (',
        `    <section aria-label="${meta.title} example">`,
        `      <${componentName} data-demo="${meta.slug}">`,
        `        ${meta.title}`,
        `      </${componentName}>`,
        '      <button type="button" onPress={() => setActive((value) => !value)}>',
        '        Toggle supporting state: {String(active())}',
        '      </button>',
        '    </section>',
        '  );',
        '}',
      ].join('\n')
    : [
        `export function ${componentName}Pattern() {`,
        '  return (',
        `    <section aria-label="${meta.title} pattern">`,
        `      <div data-pattern="${meta.slug}">`,
        `        Compose ${meta.title} from the package primitives that own`,
        '        routing, layout, and accessibility for this screen.',
        '      </div>',
        '    </section>',
        '  );',
        '}',
      ].join('\n');

  return {
    title: meta.title,
    intro: meta.description,
    sections: [
      {
        id: 'inputs',
        label: 'Inputs',
        kicker: 'Inputs',
        title: 'What this page should check',
        description:
          'Use this list before placing the component or pattern in a real route.',
      },
      {
        id: 'example',
        label: 'Themed example',
        kicker: 'Themed example',
        title: `${meta.title} in the active theme`,
        description:
          'The preview uses the same token layer as the rest of the site.',
      },
      {
        id: 'code',
        label: 'Copy/paste',
        kicker: 'Copy/paste',
        title: 'Starter integration snippet',
        description: source.importFrom
          ? 'Starter snippet with the owning package import and a local state boundary.'
          : 'Pattern snippet for entries that are assembled from package primitives and site layout.',
      },
    ],
    inputRequirements: [
      {
        label: 'Source',
        value: usage.source,
      },
      {
        label: 'State model',
        value: usage.state,
      },
      {
        label: 'Event hooks',
        value: usage.events,
      },
      {
        label: 'Accessibility',
        value: usage.accessibility,
      },
      {
        label: 'Composition',
        value: usage.composition,
      },
    ],
    themeExample: {
      category: meta.category,
      title: meta.title,
      description: meta.description,
    },
    snippet,
  };
}
