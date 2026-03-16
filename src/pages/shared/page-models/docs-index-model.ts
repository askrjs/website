import { docsFeatured, docsSections } from "../content";
import { toAnchorId } from "./common";

export function createDocsIndexModel() {
  const jumpLinks = docsSections.map((section) => ({
    href: `#${toAnchorId(section.title)}`,
    label: section.title,
  }));

  const featuredSection = {
    kicker: "Featured",
    title: "Start with the docs that establish the system",
    description:
      "These pages explain installation, the initial build path, and how theming fits into the stack.",
    links: docsFeatured,
    gridClassName: "grid-featured",
  };

  const groupedSections = docsSections.map((section) => ({
    id: toAnchorId(section.title),
    kicker: "Category",
    title: section.title,
    description: section.description,
    links: section.links,
    gridClassName: "grid-docs",
  }));

  return {
    title: "Documentation",
    intro:
      "Website-owned docs for learning, implementation, and deployment workflows.",
    jumpLinks,
    featuredSection,
    groupedSections,
  };
}
