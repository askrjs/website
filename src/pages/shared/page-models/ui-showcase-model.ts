import { groupUiComponents, uiComponents } from '../ui-component-registry';
import { toAnchorId } from './common';

export function createUiShowcaseModel() {
  const groups = groupUiComponents();

  return {
    title: 'Askr UI Component Reference',
    intro:
      'A practical catalog for the public askr-ui surface: forms, overlays, focus primitives, navigation, feedback, and layout utilities.',
    jumpLinks: groups.map((group) => ({
      href: `#${toAnchorId(group.title)}`,
      label: group.title,
    })),
    heroStats: [
      { value: String(uiComponents.length), label: 'component pages' },
      { value: String(groups.length), label: 'component families' },
      { value: '4', label: 'proof sections' },
    ],
    groups: groups.map((group) => ({
      id: toAnchorId(group.title),
      kicker: 'Component Family',
      title: group.title,
      description: `Reference pages for the ${group.title.toLowerCase()} components, including inputs, behavior notes, theme context, and integration snippets.`,
      links: group.items.map((component) => ({
        href: `/showcase/ui/${component.slug}`,
        label: component.title,
        description: component.description,
        badge: group.title,
        cta: 'Open component page',
      })),
    })),
  };
}
