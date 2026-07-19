import {
  EditorialHero,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
} from './components';

export function ThemesPage() {
  return (
    <>
      <EditorialHero
        title="Restyle the whole app without re-testing every keyboard interaction."
        lede="Focus order, ARIA, and dismissal behavior live in the headless layer. Rip out the visual theme and none of that has to be re-verified."
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
        <ol
          class="theme-relationship"
          aria-label="Headless components to themes"
        >
          <li>
            <span>01</span>
            <h3>Headless components</h3>
            <p>
              Keyboard behavior, focus relationships, labels, state, and
              composition without a mandatory visual identity.
            </p>
            <small>@askrjs/ui</small>
          </li>
          <li>
            <span>02</span>
            <h3>Themes</h3>
            <p>
              Styled components and named tokens for color, type, space, radius,
              and motion. Replace them without rewriting behavior.
            </p>
            <small>@askrjs/themes</small>
          </li>
        </ol>
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
            Explore the theme system
          </RepositoryLink>
        </div>
      </RuledSection>
      <MarketingPageNavigation current="/themes" />
    </>
  );
}
