import {
  EditorialCTA,
  EditorialHero,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
  SequenceList,
  type SequenceItem,
} from './components';

const layers: readonly SequenceItem[] = [
  {
    title: 'Headless components',
    description:
      'Keyboard behavior, focus relationships, labels, state, and composition without a mandatory visual identity.',
    meta: '@askrjs/ui',
  },
  {
    title: 'Themes',
    description:
      'Styled components and named tokens for color, type, space, radius, and motion. Replace them without rewriting behavior.',
    meta: '@askrjs/themes',
  },
];

export function ThemesPage() {
  return (
    <>
      <EditorialHero
        title="Restyle the app without rebuilding its interaction model."
        lede="Focus management, ARIA, and dismissal behavior live in the headless layer. A visual theme can change independently, while the finished composition still receives keyboard, screen-reader, contrast, and focus-visibility testing."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Two packages, two jobs</h2>
          <p>
            One owns whether a dialog traps focus correctly. The other owns
            whether it's blue or dark-mode-aware. Neither has to change when you
            touch the other.
          </p>
        </div>
        <SequenceList label="Headless components to themes" items={layers} />
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Ship the default theme, or rebuild it from tokens</h2>
        </div>
        <div class="editorial-prose">
          <p>
            The default theme is a real, usable design — not a scaffold you're
            expected to throw away. When you do want your own look, colors,
            spacing, radius, and motion are all token-driven, so a rebrand is a
            token change, not a component rewrite.
          </p>
          <p>
            Icons, brand logos, charts, and a Monaco editor integration ship as
            separate packages you opt into. None of this replaces your
            accessibility testing — it gives you a tested starting point instead
            of building focus management from scratch.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr-themes">
            View the theme system
          </RepositoryLink>
        </div>
      </RuledSection>
      <EditorialCTA
        title="Ship the default theme, or make it yours."
        primaryHref="/docs/components"
        primaryLabel="Read the component docs"
        secondaryHref="/docs/getting-started"
        secondaryLabel="Create an app"
      />
      <MarketingPageNavigation current="/themes" />
    </>
  );
}
