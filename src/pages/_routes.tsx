import { createRouteRegistry, group, route } from '@askrjs/askr/router';
import { MarketingLayout } from './_layout';
import { DocsLayout } from './docs/_layout';
import { CoreConceptsPage } from './docs/core-concepts';
import { GettingStartedPage } from './docs/getting-started';
import { DocsOverviewPage } from './docs/overview';
import { HomePage } from './home';

export type RouteMetadata = {
  title: string;
  description: string;
};

export const routeMetadata: Readonly<Record<string, RouteMetadata>> = {
  '/': {
    title: 'Askr — Full-stack TypeScript applications',
    description:
      'Build fast, typed applications across the browser and server with Askr.',
  },
  '/docs': {
    title: 'Documentation — Askr',
    description:
      'Learn how Askr fits together and find the shortest path into the framework.',
  },
  '/docs/getting-started': {
    title: 'Getting started — Askr',
    description:
      'Install Askr, create your first application, and run it locally.',
  },
  '/docs/core-concepts': {
    title: 'Core concepts — Askr',
    description:
      'Understand Askr routes, reactive state, rendering modes, and hydration.',
  },
};

export const routeRegistry = createRouteRegistry(() => {
  group({ layout: MarketingLayout }, () => {
    route('/', HomePage, { meta: routeMetadata['/'] });
  });

  group({ layout: DocsLayout }, () => {
    route('/docs', DocsOverviewPage, { meta: routeMetadata['/docs'] });
    route('/docs/getting-started', GettingStartedPage, {
      meta: routeMetadata['/docs/getting-started'],
    });
    route('/docs/core-concepts', CoreConceptsPage, {
      meta: routeMetadata['/docs/core-concepts'],
    });
  });
});
