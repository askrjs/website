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

let searchIndexPromise: Promise<typeof import('./search-index')> | undefined;

function loadSearchIndex(): Promise<typeof import('./search-index')> {
  return (searchIndexPromise ??= import('./search-index'));
}

function DocsSearchInput(props: {
  activeResultId: () => string | undefined;
  close: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
  runSearch: (value: string | undefined) => Promise<void>;
}) {
  return (
    <CommandHeader class="docs-search__input">
      <SearchIcon size={18} aria-hidden="true" />
      <CommandInput
        data-docs-search-input
        role="combobox"
        aria-autocomplete="list"
        aria-controls="docs-search-results"
        aria-expanded="true"
        aria-activedescendant={props.activeResultId()}
        placeholder="Search concepts, imports, and API symbols"
        aria-label="Search documentation"
        onKeyDown={props.onKeyDown}
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

function searchResultId(index: number): string {
  return `docs-search-result-${index}`;
}

function DocsSearchResult(props: {
  activeIndex: () => number;
  index: () => number;
  result: DocsSearchRecord;
  setActiveIndex: (index: number) => void;
}) {
  const index = props.index();
  const active = props.activeIndex() === index;
  return (
    <CommandPaletteLink
      id={searchResultId(index)}
      href={`${props.result.route}${props.result.anchor ? `#${props.result.anchor}` : ''}`}
      role="option"
      aria-selected={active ? 'true' : 'false'}
      data-active={active ? 'true' : undefined}
      data-docs-search-result
      onPointerEnter={() => props.setActiveIndex(props.index())}
    >
      <span>
        <strong>{props.result.title}</strong>
        <small>{props.result.description}</small>
      </span>
      <em>{props.result.group}</em>
    </CommandPaletteLink>
  );
}

function DocsSearchResults(props: {
  activeIndex: () => number;
  error: () => boolean;
  loading: () => boolean;
  query: () => string;
  results: () => DocsSearchRecord[];
  setActiveIndex: (index: number) => void;
}) {
  return (
    <div
      class="docs-search__results"
      aria-live="polite"
      aria-busy={props.loading() ? 'true' : 'false'}
    >
      <Show
        when={() => !props.query().trim()}
        fallback={
          <Show
            when={() => props.results().length > 0}
            fallback={
              <Show
                when={props.error}
                fallback={
                  <Show
                    when={props.loading}
                    fallback={<p>No results for “{props.query}”.</p>}
                  >
                    <p>Searching…</p>
                  </Show>
                }
              >
                <p>Search is temporarily unavailable. Please try again.</p>
              </Show>
            }
          >
            <CommandPaletteList id="docs-search-results" role="listbox">
              <For
                each={props.results}
                by={(result) => `${result.route}#${result.anchor ?? ''}`}
              >
                {(result, index) => (
                  <DocsSearchResult
                    activeIndex={props.activeIndex}
                    index={index}
                    result={result}
                    setActiveIndex={props.setActiveIndex}
                  />
                )}
              </For>
            </CommandPaletteList>
          </Show>
        }
      >
        <p>
          Search page titles, component aliases, package imports, CLI commands,
          and every published API symbol.
        </p>
      </Show>
    </div>
  );
}

function DocsSearchContent(props: DocsSearchContentProps) {
  const [activeIndex, setActiveIndex] = state(-1);
  const [query, setQuery] = state('');
  const [loading, setLoading] = state(false);
  const [results, setResults] = state<DocsSearchRecord[]>([]);
  const [error, setError] = state(false);

  const runSearch = async (value: string | undefined): Promise<void> => {
    const nextValue = value ?? '';
    setActiveIndex(-1);
    setQuery(nextValue);
    setError(false);
    if (!nextValue.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { searchDocs } = await loadSearchIndex();
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
  const activeResultId = (): string | undefined => {
    const index = activeIndex();
    return index >= 0 && index < results().length
      ? searchResultId(index)
      : undefined;
  };
  const onSearchKeyDown = (event: KeyboardEvent): void => {
    const count = results().length;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (count === 0) return;
      event.preventDefault();
      const current = activeIndex();
      setActiveIndex(
        event.key === 'ArrowDown'
          ? current < 0 || current >= count - 1
            ? 0
            : current + 1
          : current <= 0
            ? count - 1
            : current - 1
      );
      return;
    }
    if (event.key !== 'Enter') return;
    const id = activeResultId();
    if (!id) return;
    event.preventDefault();
    document.getElementById(id)?.click();
  };
  return (
    <>
      <DocsSearchInput
        activeResultId={activeResultId}
        close={props.close}
        onKeyDown={onSearchKeyDown}
        runSearch={runSearch}
      />
      <DocsSearchResults
        activeIndex={activeIndex}
        error={error}
        loading={loading}
        query={query}
        results={results}
        setActiveIndex={setActiveIndex}
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
