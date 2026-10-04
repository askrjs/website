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
    title: 'Improve themes across apps and browsers',
    description:
      'Refine theme tokens, responsive layouts, color schemes, and browser behavior. Check that styled components preserve the keyboard and focus behavior from @askrjs/ui.',
    meta: '@askrjs/themes · @askrjs/ui',
  },
  {
    label: 'Rendering',
    title: 'Test server and static rendering in other apps',
    description:
      "Test server and static rendering in other applications. Add examples for dynamic metadata, hydration, performance, and deployment setups beyond this site's static build.",
    meta: '@askrjs/askr · @askrjs/server · @askrjs/cli',
  },
  {
    label: 'Technical SEO',
    title: 'Improve search metadata and sitemaps',
    description:
      'Check canonical URLs, structured data, crawlability, sitemaps, and social previews. Improve the docs and examples for applications using server or static rendering.',
    meta: 'SSG · SSR · documentation',
  },
];

const firstContribution: readonly SequenceItem[] = [
  {
    title: 'Find a project area',
    description:
      'Choose a problem or small improvement from the themes, rendering, or developer tools listed above. You can ask questions before proposing a solution.',
  },
  {
    title: 'Open an issue or send a note',
    description:
      'Use GitHub for a specific repository, or email us if you need help finding the right one.',
  },
  {
    title: 'Review and verify the change',
    description:
      'Discuss tradeoffs, make the change, and check it against the agreed behavior.',
  },
];

export function ContributePage() {
  return (
    <>
      <EditorialHero
        title="Help test Askr in more applications."
        lede="Askr uses one explicit route registry for browser navigation, server rendering, and static builds. This site uses the static generator. Testing the other paths, themes, and developer tools in more applications can show us where the code and documentation need work."
      />

      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Where more testing would help</h2>
          <p>
            Focused reviews, prototypes, fixes, and documented findings can all
            help. You do not need to take on a large project to make a useful
            contribution.
          </p>
        </div>
        <SequenceList
          label="Contribution opportunities"
          items={opportunities}
        />
      </RuledSection>

      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Work directly with maintainers</h2>
        </div>
        <div class="editorial-prose">
          <p>
            Askr is an early project with a small maintainer team. You can
            discuss a change with the people who maintain the code and hear the
            reasoning behind it.
          </p>
          <p>
            Askr supports more paths than this website can exercise. The docs
            mark some areas <code>experimental</code> or <code>limited</code>.
            Testing those areas in another application is a useful way to find
            what needs better examples or implementation.
          </p>
          <p>
            Contributions are volunteer open-source work. One useful change does
            not create an ongoing commitment.
          </p>
        </div>
      </RuledSection>

      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Start with one focused change</h2>
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
            <h2>Have an issue or an idea?</h2>
            <p class="contribute-cta__copy">
              Email us with the area you care about and one problem or example.
              A rough description is enough to start.
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
