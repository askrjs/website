import { renderToStringSync } from '@askrjs/askr/ssr';
import { describe, expect, it } from 'vitest';
import { DocsSearch } from '../src/pages/docs/search';
import { SiteFooter } from '../src/pages/site-footer';

describe('site accessibility contracts', () => {
  it('should keep the visible search shortcut supplemental to the button name', () => {
    const html = renderToStringSync(() => <DocsSearch />);
    const trigger = html.match(
      /<button[^>]*class="[^"]*docs-search__trigger[^"]*"[\s\S]*?<\/button>/
    )?.[0];

    expect(trigger).toContain('aria-label="Search docs"');
    expect(trigger).toContain('<kbd aria-hidden="true">⌘ K</kbd>');
  });

  it('should use a distinct accessible name for the footer home destination', () => {
    const html = renderToStringSync(() => <SiteFooter />);

    expect(html).toMatch(/<a[^>]*href="\/"[^>]*>Home<\/a>/);
    expect(html).not.toMatch(/<a[^>]*href="\/"[^>]*>Overview<\/a>/);
  });
});
