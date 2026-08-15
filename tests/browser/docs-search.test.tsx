import { page, userEvent } from '@vitest/browser/context';
import { cleanupApp, createSPA } from '@askrjs/askr/boot';
import { createRouteRegistry, route } from '@askrjs/askr/router';
import { afterEach, beforeEach, describe, expect, it } from 'vite-plus/test';
import { DocsSearch } from '../../src/pages/docs/search';
import { searchDocs } from '../../src/pages/docs/search-index';

const query = 'createSPA';
const destination = searchDocs(query, 1)[0];

if (!destination) {
  throw new Error(`Expected a documentation search result for ${query}`);
}

const registry = createRouteRegistry(() => {
  route('/search-test', DocsSearch);
  route(destination.route, () => <p data-search-destination>Destination reached</p>);
});

async function settle(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

async function waitForElement<T extends Element>(read: () => T | null): Promise<T> {
  const deadline = performance.now() + 5_000;
  do {
    const element = read();
    if (element) return element;
    await settle();
    await new Promise((resolve) => setTimeout(resolve, 25));
  } while (performance.now() < deadline);
  throw new Error('Timed out waiting for the documentation search interaction');
}

describe('documentation command-palette search', () => {
  let container: HTMLDivElement | undefined;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    window.history.replaceState({}, '', '/search-test');
  });

  afterEach(async () => {
    if (container) {
      cleanupApp(container);
      container.remove();
      container = undefined;
    }
    await page.viewport(1280, 900);
  });

  it('moves a real keyboard highlight from the input and navigates on Enter', async () => {
    await createSPA({ root: container!, registry });
    await userEvent.click(container!.querySelector('button')!);

    const input = await waitForElement(
      () => document.querySelector('[data-docs-search-input]') as HTMLInputElement | null
    );
    await userEvent.fill(input, query);
    const firstResult = await waitForElement(
      () => document.querySelector('[data-slot="command-item"]') as HTMLAnchorElement | null
    );

    expect(document.activeElement).toBe(input);
    expect(input.getAttribute('aria-activedescendant')).toBeNull();

    await userEvent.keyboard('{ArrowDown}');

    expect(document.activeElement).toBe(input);
    expect(input.getAttribute('aria-activedescendant')).toBe(firstResult.id);
    expect(firstResult.getAttribute('data-active')).toBe('true');

    await userEvent.keyboard('{Enter}');
    await waitForElement(() => document.querySelector('[data-search-destination]'));

    expect(window.location.pathname).toBe(destination.route);
  });
});
