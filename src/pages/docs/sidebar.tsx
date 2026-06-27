import { Stack } from '@askrjs/themes/layouts';
import { NavLink, Sidebar } from '@askrjs/themes/shells';
import { Separator } from '@askrjs/themes/surfaces';

import type { DocsNavSection } from './content';

function SidebarItem(props: { href: string; label: string }) {
  return (
    <li>
      <NavLink href={props.href} class="docs-nav-link" match="exact">
        <span>{props.label}</span>
      </NavLink>
    </li>
  );
}

function SidebarSection(props: { section: DocsNavSection }) {
  return (
    <Stack asChild gap="2">
      <section class="docs-sidebar-section">
        <p class="docs-sidebar-section-title">{props.section.title}</p>
        <ul>
          {props.section.items.map((item) => (
            <SidebarItem href={item.href} label={item.label} />
          ))}
        </ul>
      </section>
    </Stack>
  );
}

export function DocsSidebar(props: {
  searchQuery: string;
  onSearchInput: (value: string) => void;
  sections: DocsNavSection[];
}) {
  return (
    <Sidebar
      id="docs-sidebar"
      class="docs-sidebar"
      breakpoint="md"
      collapseLabel="Browse docs sections"
      aria-label="Documentation navigation"
    >
      <Stack class="docs-sidebar-inner" gap="3">
        <span class="docs-sidebar-kicker">Askr documentation</span>
        <label class="docs-sidebar-search">
          <span>Search docs</span>
          <input
            type="search"
            placeholder="Filter docs"
            value={props.searchQuery}
            onInput={(event: Event) => {
              const target = event.target as HTMLInputElement | null;
              if (!target) return;
              props.onSearchInput(target.value);
            }}
          />
        </label>
        <Separator class="docs-rule" decorative />
        <nav class="docs-sidebar-nav">
          {props.sections.map((section) => (
            <SidebarSection section={section} />
          ))}
          {!props.sections.length ? (
            <p class="docs-sidebar-empty">No docs pages match that search.</p>
          ) : null}
        </nav>
      </Stack>
    </Sidebar>
  );
}
