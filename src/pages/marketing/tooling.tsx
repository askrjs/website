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
        title="The CLI writes files you're expected to read and edit."
        lede="Every generated file shows up as a normal diff. Nothing is written to a hidden build directory you're not supposed to look at."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Five starters, picked by what you're actually building</h2>
        </div>
        <SequenceList label="Askr application starters" items={starters} />
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Generators write plain files; checks catch drift</h2>
        </div>
        <div class="editorial-prose">
          <p>
            <code>askr add page</code> and <code>askr add action</code> write a
            normal component and a normal handler — review them like any other
            change before you commit. <code>askr openapi --check</code> fails CI
            when your schemas and your committed OpenAPI spec disagree, instead
            of letting a client silently go stale. <code>askr generate</code>{' '}
            turns that OpenAPI document into an <code>@askrjs/fetch</code>{' '}
            client when another application needs the contract.
          </p>
          <p>
            <code>askr update</code> only applies peer-compatible changes;
            reaching for the latest peer set at all is a separate, deliberate{' '}
            <code>askr upgrade</code>. And if you use an AI coding assistant,{' '}
            <code>askr skills</code> checks in project-specific instructions so
            it doesn't have to rediscover your conventions every session.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr-cli">
            View the CLI and starters
          </RepositoryLink>
        </div>
      </RuledSection>
      <EditorialCTA
        title="Scaffold a project and read every file it writes."
        primaryHref="/docs/tooling"
        primaryLabel="Read the tooling docs"
        secondaryHref="/docs/getting-started"
        secondaryLabel="Create an app"
      />
      <MarketingPageNavigation current="/tooling" />
    </>
  );
}
