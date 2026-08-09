import { For, Show, state } from '@askrjs/askr';
import { on } from '@askrjs/askr/resources';
import { SearchIcon, XIcon } from '@askrjs/lucide';
import { Button } from '@askrjs/themes/components';
import {
  CommandHeader,
  CommandInput,
  CommandPalette,
  CommandPaletteContent,
  CommandPaletteLink,
  CommandPaletteList,
  CommandPaletteTrigger,
} from '@askrjs/themes/command';
import type { DocsSearchRecord } from './types';

type DocsSearchContentProps = {
  close: () => void;
  isOpen: () => boolean;
};

function DocsSearchInput(props: {
  close: () => void;
  runSearch: (value: string | undefined) => Promise<void>;
}) {
  return (
    <CommandHeader class="docs-search__input">
      <SearchIcon size={18} aria-hidden="true" />
      <CommandInput
        data-docs-search-input
        placeholder="Search concepts, imports, and API symbols"
        aria-label="Search documentation"
        onInput={(event: Event) =>
          void props.runSearch((event.currentTarget as HTMLInputElement).value)
        }
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onPress={props.close}
        aria-label="Close search"
      >
        <XIcon size={18} aria-hidden="true" />
      </Button>
    </CommandHeader>
  );
}

function DocsSearchResults(props: {
  error: () => boolean;
  loading: () => boolean;
  query: () => string;
  results: () => DocsSearchRecord[];
}) {
  return (
    <div class="docs-search__results" aria-live="polite">
      <Show
        when={props.loading}
        fallback={
          <Show
            when={() => !props.query().trim()}
            fallback={
              <Show
                when={props.error}
                fallback={
                  <Show
                    when={() => props.results().length > 0}
                    fallback={<p>No results for “{props.query}”.</p>}
                  >
                    <CommandPaletteList>
                      <For
                        each={props.results}
                        by={(result) =>
                          `${result.route}#${result.anchor ?? ''}`
                        }
                      >
                        {(result) => (
                          <CommandPaletteLink
                            href={`${result.route}${result.anchor ? `#${result.anchor}` : ''}`}
                          >
                            <span>
                              <strong>{result.title}</strong>
                              <small>{result.description}</small>
                            </span>
                            <em>{result.group}</em>
                          </CommandPaletteLink>
                        )}
                      </For>
                    </CommandPaletteList>
                  </Show>
                }
              >
                <p>Search is temporarily unavailable. Please try again.</p>
              </Show>
            }
          >
            <p>
              Search page titles, component aliases, package imports, CLI
              commands, and every published API symbol.
            </p>
          </Show>
        }
      >
        <p>Loading the API index…</p>
      </Show>
    </div>
  );
}

function DocsSearchContent(props: DocsSearchContentProps) {
  const [query, setQuery] = state('');
  const [loading, setLoading] = state(false);
  const [results, setResults] = state<DocsSearchRecord[]>([]);
  const [error, setError] = state(false);

  const runSearch = async (value: string | undefined): Promise<void> => {
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
      if ((query() ?? '') !== nextValue || !props.isOpen()) return;
      setResults(searchDocs(nextValue));
    } catch {
      if ((query() ?? '') !== nextValue || !props.isOpen()) return;
      setResults([]);
      setError(true);
    } finally {
      if ((query() ?? '') === nextValue && props.isOpen()) setLoading(false);
    }
  };
  return (
    <>
      <DocsSearchInput close={props.close} runSearch={runSearch} />
      <DocsSearchResults
        error={error}
        loading={loading}
        query={query}
        results={results}
      />
    </>
  );
}

export function DocsSearch() {
  const [open, setOpen] = state(false);

  const openSearch = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };
  const setSearchOpen = (nextOpen: boolean) => {
    if (nextOpen) {
      setOpen(true);
      return;
    }
    close();
  };

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
    }
  );

  return (
    <div class="docs-search">
      <CommandPalette open={open()} onOpenChange={setSearchOpen}>
        <CommandPaletteTrigger asChild>
          <Button
            class="docs-search__trigger btn btn-outline"
            type="button"
            variant="outline"
            width="full"
            aria-label="Search docs"
            title="Search docs (⌘ K)"
          >
            <SearchIcon size={16} aria-hidden="true" />
            <span>Search docs</span>
            <kbd aria-hidden="true">⌘ K</kbd>
          </Button>
        </CommandPaletteTrigger>
        <CommandPaletteContent
          class="docs-search__dialog"
          title="Search documentation"
          description="Search concepts, imports, and API symbols"
        >
          <DocsSearchContent close={close} isOpen={open} />
        </CommandPaletteContent>
      </CommandPalette>
    </div>
  );
}
