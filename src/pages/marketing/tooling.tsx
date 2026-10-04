import {
  EditorialCTA,
  EditorialHero,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
  SequenceList,
  type SequenceItem,
} from './components';

const starters: readonly SequenceItem[] = [
  {
    title: 'Startkit',
    description: 'Components, state, and routes.',
    meta: 'startkit',
  },
  {
    title: 'Single Page Application',
    description: 'A browser-owned application.',
    meta: 'spa',
  },
  {
    title: 'Server Side Rendering',
    description: 'Server HTML with hydration.',
    meta: 'ssr',
  },
  {
    title: 'Full Stack',
    description: 'Pages, actions, APIs, and Node.',
    meta: 'full-stack',
  },
  {
    title: 'Static Site Generation',
    description: 'HTML written at build time.',
    meta: 'ssg',
  },
];

export function ToolingPage() {
  return (
    <>
      <EditorialHero
        title="Scaffold files you can inspect and change."
        lede="Askr CLI generators add ordinary source files to your project. Read and edit them with the same tools you use for the rest of your code."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Choose an app starter</h2>
        </div>
        <SequenceList label="Askr application starters" items={starters} />
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Generate app code and check your OpenAPI contract</h2>
        </div>
        <div class="editorial-prose">
          <p>
            <code>askr add page</code> and <code>askr add action</code> create
            source files you can review before committing. Use{' '}
            <code>askr openapi --check</code> in CI to compare your generated
            OpenAPI document with the committed file, then use{' '}
            <code>askr generate</code> to create an <code>@askrjs/fetch</code>
            client from that contract.
          </p>
          <p>
            Use <code>askr update</code> for peer-compatible changes.{' '}
            <code>askr upgrade</code> proposes newer package ranges; review them
            before installing. A forced upgrade may require compatible updates
            across several packages. <code>askr skills</code> adds repository
            instructions for AI coding tools.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr-cli">
            View the CLI and starters
          </RepositoryLink>
        </div>
      </RuledSection>
      <EditorialCTA
        title="Create a project from a starter."
        primaryHref="/docs/tooling"
        primaryLabel="Read the tooling docs"
        secondaryHref="/docs/getting-started"
        secondaryLabel="Create an app"
      />
      <MarketingPageNavigation current="/tooling" />
    </>
  );
}
