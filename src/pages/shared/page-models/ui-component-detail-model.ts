import type { UiComponentMeta } from "../ui-component-registry";

export function createUiComponentDetailModel(meta: UiComponentMeta) {
  const snippet = [
    "import { state } from '@askrjs/askr';",
    `import { ${meta.exportName} } from '@askrjs/askr-ui/${meta.slug}';`,
    "",
    `const value = state('${meta.slug}-placeholder');`,
    "",
    `export function ${meta.exportName}Example() {`,
    "  return (",
    "    <section>",
    `      <${meta.exportName}`,
    "        // TODO: wire component-specific props",
    '        data-demo="placeholder"',
    "      >",
    "        Placeholder content",
    `      </${meta.exportName}>`,
    "    </section>",
    "  );",
    "}",
  ].join("\n");

  return {
    title: `${meta.title} Component`,
    intro: meta.description,
    sections: [
      {
        id: "inputs",
        label: "Inputs",
        kicker: "Inputs",
        title: "What this component expects",
        description: "Placeholder input contract for rapid page scaffolding.",
      },
      {
        id: "example",
        label: "Themed Example",
        kicker: "Themed Example",
        title: `${meta.title} in the active theme`,
        description: "Visual placeholder demonstrating token-driven surface and component context.",
      },
      {
        id: "code",
        label: "Copy/Paste",
        kicker: "Copy/Paste",
        title: "Starter integration snippet",
        description: "Controlled-state skeleton with TODO markers for production usage.",
      },
    ],
    inputRequirements: [
      {
        label: "State model",
        value: "controlled and uncontrolled variants where applicable.",
      },
      {
        label: "Event hooks",
        value: "change/open/select handlers based on interaction pattern.",
      },
      {
        label: "Accessibility",
        value: "ARIA roles and keyboard support inherited from the primitive contract.",
      },
      {
        label: "Composition",
        value: "optional part components for trigger/content/value slots.",
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
