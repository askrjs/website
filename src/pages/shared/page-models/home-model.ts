import { homeHeroLinks, onboardingTracks, referenceBands } from "../content";

export function createHomeModel() {
  return {
    title: "Build reactive UIs with actors",
    intro:
      "Askr is a fine-grained reactive framework with zero virtual DOM. Pair it with askr-ui for headless components and askr-themes for token-driven styling.",
    heroActions: homeHeroLinks,
    ecosystemCards: [
      {
        title: "askr",
        description:
          "Core runtime — state(), derive(), resource(), routing, SSR, SSG. Actor-backed reactivity with no virtual DOM overhead.",
        badge: "Runtime",
        href: "/showcase/askr",
      },
      {
        title: "askr-ui",
        description:
          "36+ headless components — Button, Tabs, Accordion, Dialog, Select, and more. Full keyboard and ARIA support out of the box.",
        badge: "Components",
        href: "/showcase/ui",
      },
      {
        title: "askr-themes",
        description:
          "CSS-only theming via data-slot selectors and --ak-* design tokens. Light/dark mode, multiple themes, zero JS.",
        badge: "Styling",
        href: "/showcase/themes",
      },
    ],
    stats: [
      { value: "36+", label: "UI components" },
      { value: "4", label: "CSS themes" },
      { value: "0", label: "Dependencies" },
      { value: "<4kb", label: "Core runtime" },
    ],
    featureSection: {
      kicker: "Onboarding",
      title: "Start with the shortest path to a working app",
      description:
        "Begin with installation, move into quick start, then use the rendering and styling guides once the first route is on screen.",
    },
    sections: [...onboardingTracks, ...referenceBands].map((section) => ({
      kicker: section.title === "Reference Surfaces" ? "Reference" : "Read Next",
      title: section.title,
      description: section.description,
      links: section.links,
    })),
  };
}
