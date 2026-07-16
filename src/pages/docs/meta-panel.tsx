import { Link } from '@askrjs/askr/router';
import { Stack } from '@askrjs/themes/components';

import type { DocsNavItem } from './content';

function MetaList(props: { items?: string[] }) {
  if (!props.items?.length) return null;

  return (
    <ul class="docs-meta-list">
      {props.items.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  );
}

export function DocsMetaPanel(props: { item: DocsNavItem | null }) {
  const { item } = props;
  if (!item) return null;

  return (
    <Stack class="docs-meta-panel" gap="3">
      {item.goal ? (
        <Stack class="docs-meta-row" gap="2">
          <span class="docs-meta-label">Goal</span>
          <p>{item.goal}</p>
        </Stack>
      ) : null}
      {item.outcome ? (
        <Stack class="docs-meta-row" gap="2">
          <span class="docs-meta-label">Expected outcome</span>
          <p>{item.outcome}</p>
        </Stack>
      ) : null}
      {item.prerequisites?.length ? (
        <Stack class="docs-meta-row" gap="2">
          <span class="docs-meta-label">Prerequisites</span>
          <MetaList items={item.prerequisites} />
        </Stack>
      ) : null}
      {item.next ? (
        <Link href={item.next} class="docs-next-link">
          {item.nextLabel ?? 'Continue'}
        </Link>
      ) : null}
    </Stack>
  );
}
