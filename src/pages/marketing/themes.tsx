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
      'Keyboard, focus, labels, and component state without built-in visual styling.',
    meta: '@askrjs/ui',
  },
  {
    title: 'Themes',
    description:
      'Styled components with tokens for color, typography, spacing, radius, and motion.',
    meta: '@askrjs/themes',
  },
];

export function ThemesPage() {
  return (
    <>
      <EditorialHero
        title="Change the look without rewriting component behavior."
        lede="@askrjs/ui provides keyboard, focus, and ARIA behavior. @askrjs/themes adds styles and tokens. Your team supplies clear labels and tests the finished interface for focus order, contrast, and screen-reader use."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Interaction behavior and styling are separate</h2>
          <p>
            <code>@askrjs/ui</code> provides interaction behavior such as focus
            management. <code>@askrjs/themes</code> supplies styled components
            and design tokens. You can adjust a theme without rewriting the
            underlying primitive.
          </p>
        </div>
        <SequenceList label="Headless components to themes" items={layers} />
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Use the default theme or customize its tokens</h2>
        </div>
        <div class="editorial-prose">
          <p>
            The default theme is ready to use. Change its color, spacing,
            radius, and motion tokens to make the interface your own. Larger
            structural changes may still call for custom CSS or different
            component composition.
          </p>
          <p>
            Icons, brand logos, charts, and a Monaco editor wrapper are separate
            packages you can add when needed. Test labels, focus order, and
            contrast in the finished interface; the component layer cannot
            verify every composition.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr-themes">
            View the theme system
          </RepositoryLink>
        </div>
      </RuledSection>
      <EditorialCTA
        title="Customize the default theme."
        primaryHref="/docs/components"
        primaryLabel="Read the component docs"
        secondaryHref="/docs/getting-started"
        secondaryLabel="Create an app"
      />
      <MarketingPageNavigation current="/themes" />
    </>
  );
}
