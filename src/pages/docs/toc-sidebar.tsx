import { Stack } from '@askrjs/themes/components';

import type { TocEntry } from './types';

export function TocSidebar(props: { toc: TocEntry[] }) {
  return (
    <aside class="docs-toc">
      <Stack class="docs-toc-inner" gap="2">
        <p class="docs-toc-heading">On this page</p>
        <ul class="docs-toc-list">
          {props.toc.map((entry) => (
            <li key={entry.id}>
              <a href={`#${entry.id}`} class="docs-toc-link">
                {entry.label}
              </a>
            </li>
          ))}
        </ul>
      </Stack>
    </aside>
  );
}
