export interface UiComponentSeed {
  slug: string;
  title: string;
  exportName: string;
}

export interface UiComponentMeta extends UiComponentSeed {
  category: string;
  description: string;
}

export interface UiComponentGroup {
  title: string;
  items: UiComponentMeta[];
}

export function fillDescription(seed: UiComponentSeed) {
  return `${seed.title} reference with expected inputs, interaction notes, theme behavior, and a starter integration snippet.`;
}
