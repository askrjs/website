import { disclosureAndContentSeeds } from './registry/groups/disclosure-content';
import { focusAndDismissalSeeds } from './registry/groups/focus-dismissal';
import { foundationsAndFormSeeds } from './registry/groups/foundations-form';
import { layoutPrimitiveSeeds } from './registry/groups/layout-primitives';
import { navigationAndUtilitySeeds } from './registry/groups/navigation-utility';
import { overlaysAndSelectionSeeds } from './registry/groups/overlays-selection';
import { statusAndIdentitySeeds } from './registry/groups/status-identity';
import {
  fillDescription,
  type UiComponentGroup,
  type UiComponentMeta,
  type UiComponentSeed,
} from './registry/groups/types';

function withCategory(
  category: string,
  seeds: UiComponentSeed[]
): UiComponentMeta[] {
  return seeds.map((seed) => ({
    ...seed,
    category,
    description: fillDescription(seed),
  }));
}

export const uiComponents: UiComponentMeta[] = [
  ...withCategory('Foundations and Form Controls', foundationsAndFormSeeds),
  ...withCategory('Focus and Dismissal', focusAndDismissalSeeds),
  ...withCategory('Overlays and Selection', overlaysAndSelectionSeeds),
  ...withCategory('Disclosure and Content', disclosureAndContentSeeds),
  ...withCategory('Status and Identity', statusAndIdentitySeeds),
  ...withCategory('Basic Navigation and Utility', navigationAndUtilitySeeds),
  ...withCategory('Layout Primitives', layoutPrimitiveSeeds),
];

export function groupUiComponents(): UiComponentGroup[] {
  const groups = new Map<string, UiComponentMeta[]>();

  for (const component of uiComponents) {
    const group = groups.get(component.category) ?? [];
    group.push(component);
    groups.set(component.category, group);
  }

  return Array.from(groups, ([title, items]) => ({ title, items }));
}

export function requireUiComponent(slug: string): UiComponentMeta {
  const component = uiComponents.find((entry) => entry.slug === slug);

  if (!component) {
    throw new Error(`Unknown UI component slug: ${slug}`);
  }

  return component;
}

export { getComponentSource, getComponentUsage } from './registry/groups/types';
export type { UiComponentMeta } from './registry/groups/types';
