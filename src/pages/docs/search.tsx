import { For, state } from '@askrjs/askr';
import { Link } from '@askrjs/askr/router';
import { on } from '@askrjs/askr/resources';
import { SearchIcon, XIcon } from '@askrjs/lucide';
import { Button } from '@askrjs/themes/components';
import type { DocsSearchRecord } from './types';

function focusSearchInput() {
  document.querySelector<HTMLInputElement>('[data-docs-search-input]')?.focus();
}

export function DocsSearch() {
  const [open, setOpen] = state(false);
  const [query, setQuery] = state('');
  const [loading, setLoading] = state(false);
  const [results, setResults] = state<DocsSearchRecord[]>([]);
  const [error, setError] = state(false);

  const openSearch = () => {
    setOpen(true);
    window.setTimeout(focusSearchInput, 0);
  };

  const runSearch = async (value: string | undefined) => {
    const nextValue = value ?? '';
    setQuery(nextValue);
    setError(false);
    if (!nextValue.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { searchDocs } = await import('./search-index');
      if ((query() ?? '') !== nextValue || !open()) return;
      setResults(searchDocs(nextValue));
    } catch {
      if ((query() ?? '') !== nextValue || !open()) return;
      setResults([]);
      setError(true);
    } finally {
      if ((query() ?? '') === nextValue) setLoading(false);
    }
  };

  const close = () => {
    setOpen(false);
    setQuery('');
    setResults([]);
    setLoading(false);
    setError(false);
  };
  const queryValue = query() ?? '';

  // The resource listener follows the component lifecycle, unlike a raw
  // window listener installed from a ref callback.
  on(
    () => (typeof window === 'undefined' ? null : window),
    'keydown',
    (rawEvent: Event) => {
      const event = rawEvent as KeyboardEvent;
      const target = event.target;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement;
      if (
        (event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
        (event.key === '/' && !typing)
      ) {
        event.preventDefault();
        openSearch();
      }
      if (event.key === 'Escape' && open()) close();
    }
  );

  return (
    <div class="docs-search">
      <Button
        class="docs-search__trigger"
        type="button"
        variant="outline"
        width="full"
        onPress={openSearch}
        aria-haspopup="dialog"
      >
        <SearchIcon size={16} aria-hidden="true" />
        <span>Search docs</span>
        <kbd>⌘ K</kbd>
      </Button>
      <div
        class={`docs-search__backdrop${open() ? '' : ' docs-search__backdrop--closed'}`}
        role="presentation"
        aria-hidden={!open()}
        onClick={(event: Event) => {
          const target = event.target as HTMLElement | null;
          if (target?.classList.contains('docs-search__backdrop')) close();
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
              value={queryValue}
              placeholder="Search concepts, imports, and API symbols"
              // Askr delegates DOM events, so currentTarget is the delegation
              // root. The input itself is available through event.target.
              onInput={(event: Event) =>
                void runSearch((event.target as HTMLInputElement).value)
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onPress={close}
              aria-label="Close search"
            >
              <XIcon size={18} aria-hidden="true" />
            </Button>
          </div>
          <div class="docs-search__results" aria-live="polite">
            {loading() ? (
              <p>Loading the API index…</p>
            ) : !queryValue.trim() ? (
              <p>
                Search page titles, component aliases, package imports, CLI
                commands, and every published API symbol.
              </p>
            ) : error() ? (
              <p>Search is temporarily unavailable. Please try again.</p>
            ) : results().length ? (
              <ul>
                <For
                  each={results}
                  by={(result) => `${result.route}#${result.anchor ?? ''}`}
                >
                  {(result) => (
                    <li>
                      <Link
                        href={`${result.route}${result.anchor ? `#${result.anchor}` : ''}`}
                        onPress={close}
                      >
                        <span>
                          <strong>{result.title}</strong>
                          <small>{result.description}</small>
                        </span>
                        <em>{result.group}</em>
                      </Link>
                    </li>
                  )}
                </For>
              </ul>
            ) : (
              <p>No results for “{queryValue}”.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
