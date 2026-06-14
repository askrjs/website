import type { UiComponentMeta } from '../ui-component-registry';

export function createUiComponentDetailModel(meta: UiComponentMeta) {
  const snippet = [
    "import { state } from '@askrjs/askr';",
    `import { ${meta.exportName} } from '/ui/${meta.slug}';`,
    '',
    `export function ${meta.exportName}Example() {`,
    `  const [value, setValue] = state('${meta.slug}-draft');`,
    '',
    '  return (',
    '    <section aria-label="Component proof">',
    `      <${meta.exportName}`,
    '        data-demo="controlled"',
    '        data-value={value()}',
    '        onValueChange={setValue}',
    '      >',
    `        ${meta.title}`,
    `      </${meta.exportName}>`,
    '    </section>',
    '  );',
    '}',
  ].join('\n');

  return {
    title: `${meta.title} Component`,
    intro: meta.description,
    sections: [
      {
        id: 'inputs',
        label: 'Inputs',
        kicker: 'Inputs',
        title: 'What this component expects',
        description:
          'The minimum contract to check before wiring the component into product UI.',
      },
      {
        id: 'example',
        label: 'Themed Example',
        kicker: 'Themed Example',
        title: `${meta.title} in the active theme`,
        description:
          'Token-driven surface proof using the same theme layer as the rest of the site.',
      },
      {
        id: 'code',
        label: 'Copy/Paste',
        kicker: 'Copy/Paste',
        title: 'Starter integration snippet',
        description:
          'Controlled-state starter that shows the package import and expected state boundary.',
      },
    ],
    inputRequirements: [
      {
        label: 'State model',
        value: 'controlled and uncontrolled variants where applicable.',
      },
      {
        label: 'Event hooks',
        value: 'change/open/select handlers based on interaction pattern.',
      },
      {
        label: 'Accessibility',
        value:
          'ARIA roles and keyboard support inherited from the primitive contract.',
      },
      {
        label: 'Composition',
        value: 'optional part components for trigger/content/value slots.',
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
