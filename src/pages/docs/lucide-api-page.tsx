import { For, state } from '@askrjs/askr';
import { Link, currentRoute } from '@askrjs/askr/router';
import { ArrowLeftIcon, SearchIcon } from '@askrjs/lucide';
import { apiManifest } from './api-manifest';
import { apiSymbolSets } from './api-snapshot';
import { resolveDocsRoute } from './catalog';
import { lucideIconsByName } from './lucide-icons';

const entrypoint = apiManifest.find(
  (candidate) =>
    candidate.packageName === '@askrjs/lucide' && candidate.subpath === '.'
)!;
const symbols = apiSymbolSets[entrypoint.symbolSet] ?? [];
const iconSymbols = symbols.filter((symbol) =>
  lucideIconsByName.has(symbol.name)
);
const typeSymbols = symbols.filter(
  (symbol) =>
    symbol.name !== 'createIcon' && !lucideIconsByName.has(symbol.name)
);

function revealRequestedIcon(element: HTMLElement, anchor: string) {
  if (typeof window !== 'undefined' && window.location.hash === `#${anchor}`)
    window.requestAnimationFrame(() => element.scrollIntoView());
}

export default function LucideApiPage() {
  const route = resolveDocsRoute(currentRoute());
  const [query, setQuery] = state('');
  const visibleIcons = () => {
    const normalized = query().trim().toLowerCase();
    return normalized
      ? iconSymbols.filter((symbol) =>
          symbol.name.toLowerCase().includes(normalized)
        )
      : iconSymbols;
  };

  return (
    <article class="docs-article docs-api-page" data-docs-route={route}>
      <nav class="docs-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/docs">Docs</Link>
        <span>/</span>
        <Link href="/docs/reference">Reference</Link>
        <span>/</span>
        <Link href="/docs/reference/api">API</Link>
        <span>/</span>
        <span aria-current="page">{entrypoint.importName}</span>
      </nav>
      <header class="docs-article__header">
        <div class="docs-eyebrow">
          <span>Generated API snapshot</span>
        </div>
        <h1>{entrypoint.importName}</h1>
        <p>
          Browse the icon components published in {entrypoint.packageName}{' '}
          {entrypoint.version}. The icon artwork comes from the{' '}
          <a href="https://lucide.dev/" rel="external">
            Lucide icon project
          </a>
          .
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
          Search {iconSymbols.length} icon components. Each tile has a stable
          anchor for direct links and shows the component name to import.
        </p>
        <label class="gallery-search">
          <SearchIcon size={18} aria-hidden="true" />
          <span class="sr-only">Filter Lucide icons</span>
          <input
            type="search"
            value={query()}
            placeholder={`Filter ${iconSymbols.length} icons`}
            onInput={(event: Event) =>
              setQuery((event.currentTarget as HTMLInputElement).value)
            }
          />
        </label>
        <p class="gallery-count">{visibleIcons().length} icons</p>
        <div class="icon-gallery icon-gallery--api">
          <For each={visibleIcons} by={(symbol) => symbol.name}>
            {(symbol) => {
              const Icon = lucideIconsByName.get(symbol.name)!;
              return (
                <article
                  id={symbol.anchor}
                  class="icon-gallery__item"
                  key={symbol.name}
                  title={symbol.name}
                  ref={(element: HTMLElement) =>
                    revealRequestedIcon(element, symbol.anchor)
                  }
                >
                  <a
                    class="icon-gallery__anchor"
                    href={`#${symbol.anchor}`}
                    aria-label={`Link to ${symbol.name}`}
                  >
                    <Icon size={26} aria-hidden="true" />
                    <code>{symbol.name}</code>
                  </a>
                </article>
              );
            }}
          </For>
        </div>
        <div class="api-symbols api-symbols--types">
          {typeSymbols.map((symbol) => (
            <article id={symbol.anchor} class="api-symbol" key={symbol.name}>
              <h3>
                <a href={`#${symbol.anchor}`}>
                  <code>{symbol.name}</code>
                </a>
                <span>type</span>
              </h3>
              <pre>
                <code>{symbol.signature}</code>
              </pre>
            </article>
          ))}
        </div>
      </section>
      <nav class="docs-pagination" aria-label="Documentation pagination">
        <Link href="/docs/reference/api">
          <ArrowLeftIcon size={16} aria-hidden="true" />
          <span>
            <small>Back to</small>API Index
          </span>
        </Link>
      </nav>
    </article>
  );
}
