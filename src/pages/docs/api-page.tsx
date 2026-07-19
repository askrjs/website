import { currentRoute } from '@askrjs/askr/router';
import { ArrowLeftIcon } from '@askrjs/lucide';
import { apiManifest } from './api-manifest';
import { apiSymbolSets } from './api-snapshot';
import { resolveDocsRoute } from './catalog';
import { DocsLink } from './transition-link';

export default function ApiPage() {
  const route = resolveDocsRoute(currentRoute());
  const entrypoint = apiManifest.find(
    (candidate) =>
      `/docs/reference/api/${candidate.packageName.slice('@askrjs/'.length)}/${candidate.slug}` ===
      route
  );
  if (!entrypoint)
    return (
      <article class="docs-article">
        <h1>API entrypoint not found</h1>
      </article>
    );
  const symbols = apiSymbolSets[entrypoint.symbolSet];
  return (
    <article class="docs-article docs-api-page" data-docs-route={route}>
      <nav class="docs-breadcrumbs" aria-label="Breadcrumb">
        <DocsLink href="/docs">Docs</DocsLink>
        <span>/</span>
        <DocsLink href="/docs/reference">Reference</DocsLink>
        <span>/</span>
        <DocsLink href="/docs/reference/api">API</DocsLink>
        <span>/</span>
        <span aria-current="page">{entrypoint.importName}</span>
      </nav>
      <header class="docs-article__header">
        <div class="docs-eyebrow">
          <span>Generated API snapshot</span>
        </div>
        <h1>{entrypoint.importName}</h1>
        <p>
          Exports from the declarations published in {entrypoint.packageName}{' '}
          {entrypoint.version}. Signatures are generated from the installed
          artifact.
        </p>
        <ul class="package-badges">
          <li>
            <code>{entrypoint.importName}</code>
            <span>{entrypoint.version}</span>
          </li>
        </ul>
      </header>
      <section aria-labelledby="exports">
        <h2 id="exports" class="anchored-heading">
          <a href="#exports">Exports</a>
        </h2>
        <p>
          This entrypoint publishes {symbols.length} exports. Use the anchored
          symbol rows for direct links. Type-only exports are labeled separately
          from runtime values.
        </p>
        <div class="api-symbols">
          {symbols.map((symbol) => (
            <article id={symbol.anchor} class="api-symbol" key={symbol.name}>
              <h3>
                <a href={`#${symbol.anchor}`}>
                  <code>{symbol.name}</code>
                </a>
                {symbol.typeOnly && <span>type</span>}
              </h3>
              <pre>
                <code>{symbol.signature}</code>
              </pre>
            </article>
          ))}
        </div>
      </section>
      <nav class="docs-pagination" aria-label="Documentation pagination">
        <DocsLink href="/docs/reference/api">
          <ArrowLeftIcon size={16} aria-hidden="true" />
          <span>
            <small>Back to</small>API Index
          </span>
        </DocsLink>
      </nav>
    </article>
  );
}
