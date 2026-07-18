import { Link } from '@askrjs/askr/router';
import { ArrowRightIcon } from '@askrjs/lucide';
import { Button, Container } from '@askrjs/themes/components';
import { marketingPages } from './_marketing-catalog';

const capabilities = marketingPages.slice(1);

export function HomePage() {
  return (
    <>
      <section class="hero" aria-labelledby="hero-title">
        <Container class="hero__content" size="xl">
          <h1 id="hero-title">Build full-stack TypeScript apps with Askr.</h1>
          <p class="hero__lede">
            A focused framework for typed browser and server applications, with
            clear package boundaries and one shared route model.
          </p>
          <div class="hero__actions">
            <Button asChild>
              <Link href="/docs/getting-started">
                Get started
                <ArrowRightIcon size={18} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild>
              <Link href="/docs">Read the docs</Link>
            </Button>
          </div>
          <div class="hero__code" aria-label="Install Askr">
            <span>Start a project</span>
            <code>npx @askrjs/cli@latest create startkit my-app</code>
          </div>
        </Container>
      </section>

      <section
        class="capabilities"
        id="platform"
        aria-labelledby="capabilities-title"
      >
        <Container class="capabilities__inner" size="xl">
          <div class="section-heading">
            <h2 id="capabilities-title">
              Take the layers you need. Keep the boundaries explicit.
            </h2>
            <p>
              Start with runtime and routes. Add themes, server capabilities,
              and build tooling as requirements grow.
            </p>
            <Link class="section-heading__link" href="/platform">
              Explore the platform
              <ArrowRightIcon size={16} aria-hidden="true" />
            </Link>
          </div>
          <div class="capability-list">
            {capabilities.map((capability, index) => (
              <Link class="capability-item" href={capability.path}>
                <span class="capability-item__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{capability.label}</h3>
                <p>{capability.homepageSummary}</p>
                <ArrowRightIcon
                  class="capability-item__arrow"
                  size={18}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section class="final-cta" id="get-started">
        <Container class="final-cta__inner" size="xl">
          <div>
            <h2>Start with the application you need to ship.</h2>
          </div>
          <Button asChild>
            <Link href="/docs/getting-started">
              Open the documentation
              <ArrowRightIcon size={18} aria-hidden="true" />
            </Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
