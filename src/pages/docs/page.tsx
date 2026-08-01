import { Link, currentRoute } from '@askrjs/askr/router';
import { ArrowLeftIcon, ArrowRightIcon, CopyIcon } from '@askrjs/lucide';
import { docsByRoute, docsSections, resolveDocsRoute } from './catalog';
import { cliSnapshot } from './cli-snapshot';
import { componentDemoFor } from './component-demos';
import { upgradeGuidance } from './release-notes';
import type { DocsHeadingDefinition, DocsPageDefinition } from './types';
import { buildUsageGuide, routeExampleFor } from './usage-guide';

function CodeBlock({ code }: { code: string }) {
  return (
    <div class="code-block" data-code-block>
      <button
        class="code-block__copy"
        type="button"
        aria-label="Copy code"
        title="Copy code"
        onClick={(event: Event) => {
          void navigator.clipboard?.writeText(code);
          const button = event.currentTarget as HTMLButtonElement;
          button.dataset.copied = 'true';
          window.setTimeout(() => delete button.dataset.copied, 1200);
        }}
      >
        <CopyIcon size={15} aria-hidden="true" />
        <span>Copy</span>
      </button>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function HeadingContentList({
  headings,
  page,
}: {
  headings: readonly DocsHeadingDefinition[];
  page: DocsPageDefinition;
}) {
  return (
    <>
      {headings.map((item) => (
        <HeadingContent key={item.id} item={item} page={page} />
      ))}
    </>
  );
}

function DocsLandingDetails() {
  return (
    <section aria-labelledby="upgrade-guidance">
      <h2 id="upgrade-guidance" class="anchored-heading">
        <a href="#upgrade-guidance">Upgrade guidance</a>
      </h2>
      {upgradeGuidance.map((note) => (
        <article key={note.title} class="docs-release-note">
          <h3>{note.title}</h3>
          <p>
            <small>{note.when}</small>
          </p>
          <p>{note.summary}</p>
        </article>
      ))}
    </section>
  );
}

function CliReferenceSection() {
  return (
    <section aria-labelledby="published-commands">
      <h2 id="published-commands" class="anchored-heading">
        <a href="#published-commands">Published commands</a>
      </h2>
      <p>
        These commands come from <code>@askrjs/cli</code>. Planned generators
        such as <code>route</code>, <code>crud</code>, <code>table</code>, and{' '}
        <code>form</code> are not available commands.
      </p>
      <div class="api-table-wrap">
        <table class="api-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Run</th>
            </tr>
          </thead>
          <tbody>
            {cliSnapshot.commands.map((command) => (
              <tr key={command}>
                <td>
                  <code>{command}</code>
                </td>
                <td>
                  <code>askr {command} --help</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function UsageGuide({ page }: { page: DocsPageDefinition }) {
  const guide = buildUsageGuide(page, routeExampleFor(page.route));
  if (!guide) return null;
  return (
    <section class="docs-usage" aria-labelledby="how-to-use">
      <h2 id="how-to-use" class="anchored-heading">
        <a href="#how-to-use">Example</a>
      </h2>
      {guide.intro && <p>{guide.intro}</p>}
      <CodeBlock code={guide.code} />
    </section>
  );
}

function ComponentDemo({ page }: { page: DocsPageDefinition }) {
  const demo = componentDemoFor(page.title);
  if (!demo) return null;
  const Demo = demo.component;
  return (
    <div class="component-demo" data-component-demo>
      <strong>{demo.title}</strong>
      <p>{demo.description}</p>
      <Demo />
    </div>
  );
}

function HeadingContent({
  item,
  page,
}: {
  item: DocsHeadingDefinition;
  page: DocsPageDefinition;
  [prop: string]: unknown;
}) {
  return (
    <section aria-labelledby={item.id}>
      <h2 id={item.id} class="anchored-heading">
        <a href={`#${item.id}`}>{item.title}</a>
      </h2>
      <p>{item.body}</p>
      {item.code && <CodeBlock code={item.code} />}
      {page.navGroup === 'UI & Components' &&
        item.title === 'Keyboard and accessibility' && (
          <aside class="docs-callout" data-tone="accessibility">
            <strong>Accessibility note</strong>
            <p>
              Test the rendered control with a keyboard and a screen reader. The
              headless primitive supplies behavior; your labels, help text,
              focus order, and contrast remain application responsibilities.
            </p>
          </aside>
        )}
    </section>
  );
}

function PreviousNext({ page }: { page: DocsPageDefinition }) {
  const previous = page.previous ? docsByRoute.get(page.previous) : undefined;
  const next = page.next ? docsByRoute.get(page.next) : undefined;
  return (
    <nav class="docs-pagination" aria-label="Documentation pagination">
      {previous ? (
        <Link href={previous.route}>
          <ArrowLeftIcon size={16} aria-hidden="true" />
          <span>
            <small>Previous</small>
            {previous.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.route}>
          <span>
            <small>Next</small>
            {next.title}
          </span>
          <ArrowRightIcon size={16} aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}

export default function DocsPage() {
  const route = resolveDocsRoute(currentRoute());
  const page = docsByRoute.get(route);
  if (!page)
    return (
      <article class="docs-article">
        <h1>Documentation page not found</h1>
      </article>
    );
  const group = docsSections.find((section) => section.label === page.navGroup);
  return (
    <article class="docs-article" data-docs-route={page.route}>
      <nav class="docs-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/docs">Docs</Link>
        <span aria-hidden="true">/</span>
        {group && page.route !== group.landingRoute && (
          <>
            <Link href={group.landingRoute}>{group.label}</Link>
            <span aria-hidden="true">/</span>
          </>
        )}
        <span aria-current="page">{page.title}</span>
      </nav>
      <header class="docs-article__header">
        <div class="docs-eyebrow">
          <span>{page.navGroup}</span>
          {page.status !== 'stable' && (
            <span data-status={page.status}>{page.status}</span>
          )}
        </div>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </header>
      {page.status !== 'stable' && (
        <aside class="docs-callout" data-tone="warning">
          <strong>
            {page.status === 'experimental'
              ? 'Experimental surface'
              : 'Published limitation'}
          </strong>
          <p>
            This surface ships in the pinned package version, but its contract
            is still shallow or limited. Validate it against your use case
            before depending on it broadly.
          </p>
        </aside>
      )}
      <UsageGuide page={page} />
      <ComponentDemo page={page} />
      <HeadingContentList headings={page.headings} page={page} />
      {page.route === '/docs' && <DocsLandingDetails />}
      {page.route === '/docs/tooling/cli-overview' && <CliReferenceSection />}
      <PreviousNext page={page} />
    </article>
  );
}

export { CodeBlock };
