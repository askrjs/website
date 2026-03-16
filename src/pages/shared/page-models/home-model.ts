import { ecosystemBands, homeHeroLinks } from "../content";

export function createHomeModel() {
  return {
    title: "Askr Ecosystem",
    intro:
      "A product-style hub for the askr runtime, UI primitives, themes, and the docs that tie them together.",
    heroActions: homeHeroLinks,
    heroStats: [
      { value: "4", label: "core paths" },
      { value: "2", label: "theme modes" },
      { value: "SSG", label: "first-class deploy target" },
    ],
    spotlight: {
      kicker: "Spotlight",
      title: "One ecosystem, distinct entry points",
      description:
        "Use the runtime showcase for architecture patterns, the UI showcase for accessible primitives, and the themes showcase for token-driven styling. The docs hub then connects those pieces into install, build, and deployment flows.",
      signals: [
        {
          title: "Runtime",
          detail: "deterministic rendering and explicit state",
        },
        { title: "UI", detail: "headless components with clear contracts" },
        {
          title: "Themes",
          detail: "official tokens with light and dark defaults",
        },
      ],
    },
    discoverSections: ecosystemBands.map((section) => ({
      kicker: "Discover",
      title: section.title,
      description: section.description,
      links: section.links,
    })),
  };
}
