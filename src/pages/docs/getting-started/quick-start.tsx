import { DocLayout } from '../_layout';
import type { DocMeta } from '../types';

export const meta: DocMeta = {
  slug: 'getting-started/quick-start',
  title: 'Quick start',
  summary: 'Build your first page with state, routing, and themed UI.',
  section: 'Getting Started',
  order: 2,
  goal: 'Create your first interactive page in Askr with practical state and routing.',
  outcome: 'You can render a route and interact with a simple component.',
  prerequisites: ['Installed askr packages', 'A route entrypoint configured'],
  next: '/docs/getting-started/project-structure',
  nextLabel: 'Set project structure',
  toc: [
    { id: 'first-island', label: 'First island' },
    { id: 'add-ui-and-theme', label: 'Add UI and theme' },
  ],
};

const counterCode = `import { state, derive } from "@askrjs/askr";
import { Button } from "@askrjs/ui/button";

export function Counter() {
  const [count, setCount] = state(0);
  const doubled = derive(() => count() * 2);

  return (
    <Button onPress={() => setCount((value) => value + 1)}>
      Count {count()} / doubled {doubled()}
    </Button>
  );
}`;

const routeCode = `import { createSPA, hydrateSPA } from "@askrjs/askr/boot";
import { createRouteRegistry, route } from "@askrjs/askr/router";
import { Counter } from "./counter";

export const registry = createRouteRegistry(() => {
  route("/", Counter);
});

const root = document.querySelector("#app");
const hasServerMarkup = Boolean(root?.childNodes.length);

await (hasServerMarkup
  ? hydrateSPA({ root: "#app", registry })
  : createSPA({ root: "#app", registry }));`;

const themeCode = `import "@askrjs/themes/default";
import "./styles.css";`;

export function QuickStartDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="first-island">
        <h2>First island</h2>
        <p>
          Define the smallest interactive component with a local state boundary.
          Read state by calling the getter and update it through the paired
          setter.
        </p>
        <pre class="code-block">
          <code>{counterCode}</code>
        </pre>
      </section>
      <section id="add-ui-and-theme">
        <h2>Add UI and theme</h2>
        <p>
          Capture the page in a route registry so the same definition can be
          used for SPA startup, hydration, SSR, and static generation.
        </p>
        <pre class="code-block">
          <code>{routeCode}</code>
        </pre>
        <p>
          Load the default theme before your site layer. Component styles and
          semantic tokens ship together through that package export.
        </p>
        <pre class="code-block">
          <code>{themeCode}</code>
        </pre>
      </section>
    </DocLayout>
  );
}
