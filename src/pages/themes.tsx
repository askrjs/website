import {
  EditorialHero,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
  Vocabulary,
} from './_marketing';

export function ThemesPage() {
  return (
    <>
      <EditorialHero
        title="Headless components. Theme-owned appearance."
        lede="Keep accessibility wiring and interaction behavior, then add a visual system without replacing the component contract."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Behavior flows into a replaceable visual layer.</h2>
          <p>
            Headless components own interaction and accessibility. Themes add
            styled components and tokens without rewriting that behavior.
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
              and motion—replaceable without rewriting behavior.
            </p>
            <small>@askrjs/themes</small>
          </li>
        </ol>
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Start useful. Change the system, not every component.</h2>
        </div>
        <div class="editorial-prose">
          <p>
            The default theme provides a practical baseline. Token-first
            customization centralizes product decisions while headless behavior
            remains available for custom surfaces.
          </p>
          <p>
            Icons, logos, charts, and editor integrations remain focused
            packages. Accessibility support is a starting structure; the
            application still owns the complete user journey.
          </p>
          <Vocabulary>
            <code>@askrjs/ui</code>
            <code>@askrjs/themes</code>
            <code>@askrjs/lucide</code>
            <code>@askrjs/logos</code>
            <code>@askrjs/charts</code>
            <code>@askrjs/monaco</code>
          </Vocabulary>
          <RepositoryLink href="https://github.com/askrjs/askr-themes">
            Explore the theme system
          </RepositoryLink>
        </div>
      </RuledSection>
      <MarketingPageNavigation current="/themes" />
    </>
  );
}
