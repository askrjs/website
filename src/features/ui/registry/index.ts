import { disclosureAndContentSeeds } from './groups/disclosure-content';
import { focusAndDismissalSeeds } from './groups/focus-dismissal';
import { foundationsAndFormSeeds } from './groups/foundations-form';
import { layoutPrimitiveSeeds } from './groups/layout-primitives';
import { navigationAndUtilitySeeds } from './groups/navigation-utility';
import { overlaysAndSelectionSeeds } from './groups/overlays-selection';
import { statusAndIdentitySeeds } from './groups/status-identity';
import {
  fillDescription,
  type UiComponentGroup,
  type UiComponentMeta,
  type UiComponentSeed,
} from './groups/types';

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

export { getComponentSource, getComponentUsage } from './groups/types';
export type { UiComponentMeta } from './groups/types';
