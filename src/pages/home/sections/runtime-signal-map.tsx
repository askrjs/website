import { state } from '@askrjs/askr';
import { Button, Inline, Stack } from '@askrjs/themes/components';
import {
  BracesIcon,
  CodeXmlIcon,
  GitBranchIcon,
  PackageCheckIcon,
  RouteIcon,
} from '@askrjs/lucide';

export function RuntimeSignalMap() {
  const [count, setCount] = state(2);

  return (
    <Stack
      class="runtime-map"
      gap="4"
      aria-label="Interactive runtime signal map"
    >
      <Inline class="runtime-map-topline" justify="between" align="center">
        <span>route:/</span>
        <span>state:{count()}</span>
      </Inline>
      <div class="runtime-map-grid">
        <article class="runtime-node source">
          <BracesIcon size={18} />
          <strong>state()</strong>
          <span>local signal {count()}</span>
        </article>
        <article class="runtime-node derive">
          <GitBranchIcon size={18} />
          <strong>derive()</strong>
          <span>computed only where used</span>
        </article>
        <article class="runtime-node route">
          <RouteIcon size={18} />
          <strong>route()</strong>
          <span>registry shared by SPA, SSR, SSG</span>
        </article>
        <article class="runtime-node output">
          <PackageCheckIcon size={18} />
          <strong>SSG</strong>
          <span>static route output</span>
        </article>
        <article class="runtime-node theme">
          <CodeXmlIcon size={18} />
          <strong>tokens</strong>
          <span>theme values in CSS</span>
        </article>
      </div>
      <Inline
        class="runtime-map-controls"
        justify="center"
        align="center"
        gap="3"
      >
        <Button onPress={() => setCount((value) => Math.max(0, value - 1))}>
          -
        </Button>
        <span>{count()}</span>
        <Button onPress={() => setCount((value) => value + 1)}>+</Button>
      </Inline>
    </Stack>
  );
}
