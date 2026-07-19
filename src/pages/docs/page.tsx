import { Link, currentRoute } from '@askrjs/askr/router';
import { ArrowLeftIcon, ArrowRightIcon, CopyIcon } from '@askrjs/lucide';
import {
  docsByRoute,
  docsSections,
  publishedVersions,
  resolveDocsRoute,
} from './catalog';
import { cliSnapshot } from './cli-snapshot';
import type { DocsHeadingDefinition, DocsPageDefinition } from './types';
import { buildUsageGuide } from './usage-guide';

const routeExamples: Readonly<Record<string, string>> = {
  '/docs/getting-started/first-application': `import { state } from '@askrjs/askr';
import { createRouteRegistry, route } from '@askrjs/askr/router';

function HomePage() {
  const count = state(0);
  return <button onClick={() => count.set(count() + 1)}>Count: {count()}</button>;
}

export const registry = createRouteRegistry(() => route('/', HomePage));`,
  '/docs/core-concepts/state-and-derived-values': `import { derive, state } from '@askrjs/askr';

const quantity = state(2);
const unitPrice = state(12);
const total = derive(() => quantity() * unitPrice());`,
  '/docs/routing/definitions-and-layouts': `const registry = createRouteRegistry(() => {
  group({ layout: AppLayout }, () => {
    route('/', HomePage);
    route('/projects/:projectId', ProjectPage);
  });
});`,
  '/docs/data/queries-and-consistency': `const project = defineQuery({
  key: ({ id }: { id: string }) => 'project:' + id,
  fetch: ({ id, signal }) => api.projects.get(id, { signal }),
});

const result = createQuery(project, { id: projectId });`,
  '/docs/rendering/server-side-rendering': `const result = await renderToString({
  registry,
  url: request.url,
});`,
  '/docs/server/request-binding': `router.post('/projects', async (context) => {
  const input = await context.bind<CreateProjectInput>();
  return created(await projects.create(input));
});`,
  '/docs/authentication/authorization': `route('/admin', AdminPage, {
  auth: { requirement: 'authenticated' },
  policy: ({ auth }) => auth.permissions.includes('admin') ? allow() : forbidden(),
});`,
  '/docs/http-contracts/schemas': `const project = schema.object({
  id: schema.string(),
  name: schema.string(),
});

project.jsonSchema;`,
  '/docs/charts/cartesian-marks': `const Plot = createPlot<ProjectRow>();

<Plot.Root data={rows} rowKey={(row) => row.id} label="Revenue by day">
  <Plot.Axis axis="x" />
  <Plot.Axis axis="y" />
  <Plot.Line x="createdAt" y="revenue" />
  <Plot.Point x="createdAt" y="revenue" />
</Plot.Root>`,
  '/docs/mcp/primitives': `const mcp = createMcpServer({ name: 'project-tools', version: '1.0.0' })
  .tool('lookup-project', { input: projectInput }, async (context, input) => {
    return { content: [{ type: 'text', text: await lookup(input.id) }] };
  });`,
  '/docs/tooling/create': `npx @askrjs/cli@0.0.5 create startkit my-app
npx @askrjs/cli@0.0.5 create --prompt "Authenticated operations dashboard"`,
};

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

function PackageBadges({ page }: { page: DocsPageDefinition }) {
  return (
    <ul class="package-badges" aria-label="Published package versions">
      {page.packages.map((pkg) => (
        <li key={`${pkg.name}:${pkg.importPath}`}>
          <code>{pkg.importPath ?? pkg.name}</code>
          <span>{pkg.version}</span>
        </li>
      ))}
    </ul>
  );
}

function UsageGuide({ page }: { page: DocsPageDefinition }) {
  const guide = buildUsageGuide(page, routeExamples[page.route]);
  return (
    <section class="docs-usage" aria-labelledby="how-to-use">
      <h2 id="how-to-use" class="anchored-heading">
        <a href="#how-to-use">How to use {page.title.toLowerCase()}</a>
      </h2>
      <p>{guide.intro}</p>
      <ol>
        {guide.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <CodeBlock code={guide.code} />
    </section>
  );
}

function HeadingContent({
  item,
  page,
}: {
  item: DocsHeadingDefinition;
  page: DocsPageDefinition;
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
        <PackageBadges page={page} />
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
      {page.headings.map((item) => (
        <HeadingContent item={item} page={page} />
      ))}
      {page.route === '/docs' && (
        <section aria-labelledby="versions">
          <h2 id="versions" class="anchored-heading">
            <a href="#versions">Published versions</a>
          </h2>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Version</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(publishedVersions).map(([name, version]) => (
                  <tr key={name}>
                    <td>
                      <code>@askrjs/{name}</code>
                    </td>
                    <td>{version}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {page.route === '/docs/tooling/cli-overview' && (
        <section aria-labelledby="published-commands">
          <h2 id="published-commands" class="anchored-heading">
            <a href="#published-commands">Published commands</a>
          </h2>
          <p>
            These commands come from <code>@askrjs/cli</code>{' '}
            {cliSnapshot.version}. Planned generators such as <code>route</code>
            , <code>crud</code>, <code>table</code>, and <code>form</code> are
            not available commands.
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
      )}
      <PreviousNext page={page} />
    </article>
  );
}

export { CodeBlock };
