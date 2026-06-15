import { groupUiComponents, uiComponents } from '../_registry';
import { toAnchorId } from './common';

export function createUiShowcaseModel() {
  const groups = groupUiComponents();

  return {
    title: 'Askr UI component reference',
    intro:
      'A catalog of Askr controls, overlays, navigation helpers, feedback elements, and layout patterns with purpose and wiring notes.',
    jumpLinks: groups.map((group) => ({
      href: `#${toAnchorId(group.title)}`,
      label: group.title,
    })),
    heroStats: [
      { value: String(uiComponents.length), label: 'component pages' },
      { value: String(groups.length), label: 'component families' },
      { value: '4', label: 'reference sections' },
    ],
    groups: groups.map((group) => ({
      id: toAnchorId(group.title),
      kicker: 'Component family',
      title: group.title,
      description: `Use these ${group.title.toLowerCase()} entries to choose the right primitive, confirm source package ownership, and check state, events, accessibility, and composition.`,
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
