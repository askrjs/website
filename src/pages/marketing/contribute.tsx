import { ArrowRightIcon } from '@askrjs/lucide';
import { Button, Container } from '@askrjs/themes/components';
import {
  EditorialHero,
  RepositoryLink,
  RuledSection,
  SequenceList,
  type SequenceItem,
} from './components';

const opportunities: readonly SequenceItem[] = [
  {
    label: 'CSS and design systems',
    title: 'Make the themes feel exceptional',
    description:
      'Refine tokens, responsive behavior, light and dark themes, component polish, and cross-browser details without moving accessibility out of the headless layer.',
    meta: '@askrjs/themes · @askrjs/ui',
  },
  {
    label: 'Rendering',
    title: 'Pressure-test SSR and SSG',
    description:
      'Push server and static rendering past what the production applications already cover — metadata, hydration, performance, and deployment behavior on workloads they do not exercise yet.',
    meta: '@askrjs/askr · @askrjs/server · @askrjs/cli',
  },
  {
    label: 'Technical SEO',
    title: 'Make generated pages easier to find',
    description:
      'Help sharpen canonical URLs, structured data, crawlability, sitemaps, social metadata, and the guidance applications need to use them well.',
    meta: 'SSG · SSR · documentation',
  },
];

const firstContribution: readonly SequenceItem[] = [
  {
    title: 'Choose a useful edge',
    description:
      'Bring a concrete problem, a small improvement, or an experiment from one of the areas above. You do not need to arrive with a complete solution.',
  },
  {
    title: 'Start the conversation',
    description:
      'Open a GitHub issue in the relevant repository, or send a short email if you are not sure where the work belongs.',
  },
  {
    title: 'Shape and ship it together',
    description:
      'Agree on scope, make the reasoning visible, and validate the result. A single focused contribution is worthwhile; there is no ongoing commitment.',
  },
];

export function ContributePage() {
  return (
    <>
      <EditorialHero
        title="Help shape Askr while the decisions are still close to the code."
        lede="Askr is an open-source framework that runs production applications today — static marketing sites and admin consoles, including this site. Contributions land close to the code: there is room to influence how its themes, rendering, and developer experience develop, not just pick up a finished backlog."
      />

      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Where your perspective matters most</h2>
          <p>
            These are open areas, not job descriptions. A specialist review, a
            working prototype, a focused fix, or a carefully documented finding
            can all move the project forward.
          </p>
        </div>
        <SequenceList
          label="Contribution opportunities"
          items={opportunities}
        />
      </RuledSection>

      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Working on Askr is direct</h2>
        </div>
        <div class="editorial-prose">
          <p>
            There is no formal contributor program or large community around
            Askr. You work directly with the people maintaining it, close to the
            code and the reasoning behind it.
          </p>
          <p>
            The surface is broad, and the applications running on it exercise
            one slice of it. Where a documented path ships narrower than it
            reads, the docs mark it <code>experimental</code> or{' '}
            <code>limited</code> — that is a map of where a contribution has the
            most leverage.
          </p>
          <p>
            Contributions are volunteer open-source work. There is no
            expectation that one useful contribution becomes a recurring
            obligation.
          </p>
        </div>
      </RuledSection>

      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>A simple way to begin</h2>
        </div>
        <SequenceList
          label="How to make a first contribution"
          items={firstContribution}
        />
        <div class="contribute-repositories">
          <RepositoryLink href="https://github.com/askrjs/askr-themes/issues">
            Explore theme issues
          </RepositoryLink>
          <RepositoryLink href="https://github.com/askrjs/askr/issues">
            Explore framework issues
          </RepositoryLink>
          <RepositoryLink href="https://github.com/askrjs/website/issues">
            Explore website issues
          </RepositoryLink>
        </div>
      </RuledSection>

      <section class="editorial-cta">
        <Container class="editorial-cta__inner" size="xl">
          <div>
            <h2>Bring the part you care about.</h2>
            <p class="contribute-cta__copy">
              Introduce yourself, mention the area that interests you, and
              include any idea or example you already have. A polished proposal
              is not required.
            </p>
          </div>
          <div class="editorial-cta__actions">
            <Button asChild>
              <a href="mailto:contribute@askrjs.com">
                Email contribute@askrjs.com
                <ArrowRightIcon size={18} aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://github.com/askrjs">Explore Askr on GitHub</a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
