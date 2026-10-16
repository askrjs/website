import { fallback, group, Link, route } from '@askrjs/askr/router';
import { task } from '@askrjs/askr/resources';
import { MarketingLayout } from './_layout';
import { HomePage } from './home';
import { NotFoundPage } from './not-found';
import { legacyRedirects } from './redirects';

export type RouteMetadata = {
  title: string;
  description: string;
  links?: readonly { rel: string; href: string; [key: string]: string }[];
};

export const marketingRouteMetadata: Readonly<Record<string, RouteMetadata>> = {
  '/': {
    title: 'Askr | TypeScript apps. Explicit by design.',
    description:
      'Build TypeScript interfaces with function components and explicit state. Connect routes, data, and server code as your application grows.',
  },
  '/404': {
    title: 'Page not found | Askr',
    description:
      'We could not find this page. Return home or browse the Askr documentation.',
  },
};

export const legacyRouteMetadata: Readonly<Record<string, RouteMetadata>> =
  Object.fromEntries(
    Object.entries(legacyRedirects).map(([path, destination]) => [
      path,
      {
        title: 'Continue to the Askr documentation',
        description: 'This page is now part of the Askr documentation.',
        links: [{ rel: 'canonical', href: `https://askrjs.com${destination}` }],
      },
    ])
  );

function ForwardToDocs({ destination }: { destination: string }) {
  task(() => {
    if (typeof window !== 'undefined') {
      window.location.replace(
        `${destination}${window.location.search}${window.location.hash}`
      );
    }
  });
  return (
    <section class="legacy-forward">
      <h1>This page is now in the documentation.</h1>
      <Link href={destination}>Continue to the documentation</Link>
    </section>
  );
}

export function registerMarketingRoutes() {
  group({ layout: MarketingLayout }, () => {
    route('/', HomePage, { meta: marketingRouteMetadata['/'] });
    route('/404', NotFoundPage, { meta: marketingRouteMetadata['/404'] });
    fallback(NotFoundPage);
  });
  for (const [path, destination] of Object.entries(legacyRedirects)) {
    route(path, () => <ForwardToDocs destination={destination} />, {
      meta: legacyRouteMetadata[path],
    });
  }
}
