import { SignalHero } from '../../../site/primitives';
import { docsStartPath } from '../../../site/navigation';
import { RuntimeSignalMap } from './runtime-signal-map';

export function HomeHeroSection() {
  return (
    <SignalHero
      eyebrow="Askr framework"
      title="Build reactive apps, docs, and static sites with one route model."
      intro="Askr is a TypeScript UI framework with fine-grained state, shared SPA/SSR/SSG routes, and theme primitives that render cleanly from development to static output."
      primary={{
        href: docsStartPath,
        label: 'Start building',
        detail: 'Install packages, create a route',
      }}
      secondary={{
        href: '/framework',
        label: 'See the runtime',
        detail: 'State, routing, SSG',
      }}
    >
      <RuntimeSignalMap />
    </SignalHero>
  );
}
