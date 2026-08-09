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

export function DocsSearch() {
  const [open, setOpen] = state(false);
  const [query, setQuery] = state('');
  const [loading, setLoading] = state(false);
  const [results, setResults] = state<DocsSearchRecord[]>([]);
  const [error, setError] = state(false);

  const openSearch = () => {
    setOpen(true);
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
  const setSearchOpen = (nextOpen: boolean) => {
    if (nextOpen) {
      setOpen(true);
      return;
    }
    close();
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
    }
  );

  return (
    <div class="docs-search">
      <CommandPalette open={open()} onOpenChange={setSearchOpen}>
        <CommandPaletteTrigger asChild>
          <Button
            class="docs-search__trigger"
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
          <CommandHeader class="docs-search__input">
            <SearchIcon size={18} aria-hidden="true" />
            <CommandInput
              data-docs-search-input
              type="search"
              value={queryValue}
              placeholder="Search concepts, imports, and API symbols"
              aria-label="Search documentation"
              onInput={(event: Event) =>
                void runSearch((event.currentTarget as HTMLInputElement).value)
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
          </CommandHeader>
          <div class="docs-search__results" aria-live="polite">
            <Show
              when={loading()}
              fallback={
                <Show
                  when={() => !query().trim()}
                  fallback={
                    <Show
                      when={error()}
                      fallback={
                        <Show
                          when={() => results().length > 0}
                          fallback={<p>No results for “{queryValue}”.</p>}
                        >
                          <CommandPaletteList>
                            <For
                              each={results()}
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
                      <p>
                        Search is temporarily unavailable. Please try again.
                      </p>
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
        </CommandPaletteContent>
      </CommandPalette>
    </div>
  );
}
