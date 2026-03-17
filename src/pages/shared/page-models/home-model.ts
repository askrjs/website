import { homeHeroLinks, onboardingTracks, referenceBands } from "../content";

export function createHomeModel() {
  return {
    title: "Askr Documentation",
    intro:
      "The fastest path to installing Askr, building the first page, and finding the reference material you need next.",
    heroActions: homeHeroLinks,
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
