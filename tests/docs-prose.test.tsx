import { renderToStringSync } from '@askrjs/askr/ssr';
import { describe, expect, it } from 'vitest';
import { InlineProse } from '../src/pages/docs/prose';

describe('authored documentation prose', () => {
  it('renders code, emphasis, and useful links in reading order', () => {
    const html = renderToStringSync(() => (
      <InlineProse text="Use `state()` for **local state**. Read [the guide](/docs/core-concepts) or [email us](mailto:contribute@askrjs.com)." />
    ));
    expect(html).toContain('<code>state()</code>');
    expect(html).toContain('<strong>local state</strong>');
    expect(html).toContain('href="/docs/core-concepts"');
    expect(html).toContain('href="mailto:contribute@askrjs.com"');
    expect(html.indexOf('<code>')).toBeLessThan(html.indexOf('<strong>'));
  });

  it('escapes HTML and leaves unsafe link schemes as text', () => {
    const html = renderToStringSync(() => (
      <InlineProse
        text={
          '<script>alert(1)</script> [unsafe](javascript:alert) [external](//example.com) `<img src=x>`'
        }
      />
    ));
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img');
    expect(html).not.toContain('href=');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('<code>&lt;img src=x&gt;</code>');
  });
});
