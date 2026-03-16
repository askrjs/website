import { groupUiComponents, uiComponents } from "../ui-component-registry";
import { toAnchorId } from "./common";

export function createUiShowcaseModel() {
  const groups = groupUiComponents();

  return {
    title: "Askr UI Showcase",
    intro:
      "Component catalog with placeholder detail pages for the full public askr-ui surface.",
    jumpLinks: groups.map((group) => ({
      href: `#${toAnchorId(group.title)}`,
      label: group.title,
    })),
    heroStats: [
      { value: String(uiComponents.length), label: "component pages" },
      { value: String(groups.length), label: "component families" },
      { value: "3", label: "sections per page" },
    ],
    groups: groups.map((group) => ({
      id: toAnchorId(group.title),
      kicker: "Component Family",
      title: group.title,
      description: `Placeholder showcase pages for every ${group.title.toLowerCase()} component.`,
      links: group.items.map((component) => ({
        href: `/showcase/ui/${component.slug}`,
        label: component.title,
        description: component.description,
        badge: group.title,
        cta: "Open component page",
      })),
    })),
  };
}
