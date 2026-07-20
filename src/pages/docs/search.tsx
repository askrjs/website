import { state } from '@askrjs/askr';
import { Link } from '@askrjs/askr/router';
import { SearchIcon, XIcon } from '@askrjs/lucide';
import type { DocsSearchRecord } from './types';

const adoptedSearchRoots = new WeakSet<HTMLElement>();

export function DocsSearch() {
  const [open, setOpen] = state(false);
  const [query, setQuery] = state('');
  const [loading, setLoading] = state(false);
  const [results, setResults] = state<readonly DocsSearchRecord[]>([]);

  const runSearch = async (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const { searchDocs } = await import('./search-index');
    setResults(searchDocs(value));
    setLoading(false);
  };

  const close = () => {
    setOpen(false);
    setQuery('');
    setResults([]);
  };
  return (
    <div
      class="docs-search"
      ref={(element: HTMLElement | null) => {
        if (!element || adoptedSearchRoots.has(element)) return;
        adoptedSearchRoots.add(element);
        window.addEventListener('keydown', (event) => {
          if (
            (event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
            (event.key === '/' &&
              !(
                event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement
              ))
          ) {
            event.preventDefault();
            setOpen(true);
            window.setTimeout(
              () =>
                element
                  .querySelector<HTMLInputElement>('[data-docs-search-input]')
                  ?.focus(),
              0
            );
          }
          if (event.key === 'Escape' && open()) close();
        });
      }}
    >
      <button
        class="docs-search__trigger"
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <SearchIcon size={16} aria-hidden="true" />
        <span>Search docs</span>
        <kbd>⌘ K</kbd>
      </button>
      {open() && (
        <div
          class="docs-search__backdrop"
          role="presentation"
          onClick={(event: Event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <section
            class="docs-search__dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
          >
            <div class="docs-search__input">
              <SearchIcon size={18} aria-hidden="true" />
              <input
                data-docs-search-input
                type="search"
                value={query()}
                placeholder="Search concepts, imports, and API symbols"
                onInput={(event: Event) =>
                  void runSearch(
                    (event.currentTarget as HTMLInputElement).value
                  )
                }
              />
              <button type="button" onClick={close} aria-label="Close search">
                <XIcon size={18} aria-hidden="true" />
              </button>
            </div>
            <div class="docs-search__results" aria-live="polite">
              {loading() ? (
                <p>Loading the API index…</p>
              ) : !query().trim() ? (
                <p>
                  Search page titles, component aliases, package imports, CLI
                  commands, and every published API symbol.
                </p>
              ) : results().length ? (
                <ul>
                  {results().map((result) => (
                    <li key={`${result.route}#${result.anchor ?? ''}`}>
                      <Link
                        href={`${result.route}${result.anchor ? `#${result.anchor}` : ''}`}
                        onClick={close}
                      >
                        <span>
                          <strong>{result.title}</strong>
                          <small>{result.description}</small>
                        </span>
                        <em>{result.group}</em>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No results for “{query()}”.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
