# Static generation and GitHub Pages

## Contents

- Define the static contract
- Configure one SSG path
- Handle GitHub Pages base paths
- Deploy and verify
- Five-page marketing composition

## Define the static contract

Before implementation, identify every crawlable route, its purpose, primary
action, title, description, canonical URL, Open Graph data, and navigation
label. Do not guess the repository segment, production origin, custom domain,
contact destination, analytics identifier, or social image.

Use the shared route registry as the only route manifest. An SSG configuration
must render into the built client template, include required browser and public
assets, use the real `siteUrl`, and generate only intended crawlable routes.
When using themed SSR output, wrap the document renderer with the published
theme style integration and treat missing style registration as an error.

Build client assets first and static HTML second. Do not add a second static
generator, sitemap implementation, or deployment build.

## Configure one SSG path

Keep the repository's generated build path. A typical application has one
`ssg.config.ts` that imports `routeRegistry`, injects generated `appHtml` into
the built client template, copies both `public/` and built browser assets, and
excludes the explicit `/404` document from the sitemap:

```ts
// ssg.config.ts
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { DocumentRenderArgs } from '@askrjs/askr/ssg';
import { withThemeStyles } from '@askrjs/themes/ssr';
import { routeRegistry } from './src/pages/_routes';

let clientTemplate: string | undefined;

function renderDocument({ appHtml }: DocumentRenderArgs): string {
  clientTemplate ??= readFileSync(
    resolve(process.cwd(), '.askr/client/index.html'),
    'utf8'
  );
  const appRoot = /<div([^>]*\bid=["']app["'][^>]*)>\s*<\/div>/i;
  if (!appRoot.test(clientTemplate)) {
    throw new Error('Built client template must contain an empty #app root.');
  }
  return clientTemplate.replace(appRoot, `<div$1>${appHtml}</div>`);
}

export const staticConfig = {
  registry: routeRegistry,
  outputDir: 'dist',
  document: withThemeStyles(renderDocument),
  styleRegistrationValidation: 'error' as const,
  assets: [
    { from: resolve(process.cwd(), 'public'), to: '.' },
    { from: resolve(process.cwd(), '.askr/client/assets'), to: 'assets' },
  ],
  siteUrl: 'https://example.com',
  sitemap: { routes: { '/404': false } },
};
```

Give every crawlable route explicit metadata. Register `/404` as a concrete
route so SSG emits `dist/404/index.html`, and also use a fallback so unmatched
navigation renders the same UI:

```tsx
// src/pages/_routes.tsx
import { createRouteRegistry, fallback, route } from '@askrjs/askr/router';
import NotFoundPage from './not-found';

export const routeRegistry = createRouteRegistry(() => {
  route('/404', NotFoundPage, {
    meta: {
      title: 'Page not found',
      description: 'The requested page does not exist.',
      robots: 'noindex',
    },
  });
  fallback(NotFoundPage);
});
```

Copy the generated file to `dist/404.html` after the build for static hosts
that expect a top-level fallback: `cp dist/404/index.html dist/404.html`.

## Handle GitHub Pages base paths

- A custom domain or `owner.github.io` site uses the origin root.
- An `owner.github.io/repository` project site uses `/repository` as the route
  registry `basePath`, `/repository/` as Vite's `base`, and includes that
  segment in `siteUrl`.

Set both route and asset bases; setting only one breaks either navigation or
assets. Use router links for internal navigation. Import build-owned assets or
prefix public assets with the configured base instead of hard-coding paths
such as `/images/hero.webp`. Canonical and Open Graph URLs must be absolute and
include the project segment.

```ts
// src/pages/_routes.tsx
export const routeRegistry = createRouteRegistry(registerRoutes, {
  basePath: '/repository',
});

// vite.config.ts
export default defineConfig({
  base: '/repository/',
  plugins: [askr()],
});
```

Use the real repository segment in both places, and omit both entirely for an
origin-root deployment (custom domain or `owner.github.io`).

## Deploy and verify

Use GitHub Pages artifact deployment rather than committing `dist/` or adding
a publishing branch. The workflow should install from the lockfile, run the
repository's validation gates, build once, create `dist/404.html`, verify
expected output, upload `dist/`, and deploy it. Grant only `contents: read`,
`pages: write`, and `id-token: write`; use the `github-pages` environment and
serialize deployments. Pin third-party actions to reviewed commits.

Before merge, run the production build, then run the repository's preview
script (typically `vp preview`, which serves `dist/` honoring `vite.config.ts`'s
`base`) and open the printed local URL — for a project site that URL already
includes `/<repository>/`; do not strip it. Verify all routes, assets,
internal links, metadata, sitemap, robots directive, 404, keyboard behavior,
narrow layout, hydration, and browser console. After merge, wait for the Pages
deployment and repeat those checks against the live URL.

Match a broken build to its likely cause before guessing at a fix:

| Symptom                                                  | Likely cause                                                                    |
| -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Blank page, console 404s on `/assets/*`                  | `basePath`/Vite `base` missing or mismatched for a project site                 |
| Every route 404s except `/`                              | Only one of route `basePath` or Vite `base` is set — both are required together |
| Broken link preview on social share                      | `openGraph`/`canonical` missing or relative instead of absolute                 |
| GitHub Pages serves an unstyled 404                      | `dist/404.html` copy step didn't run before upload                              |
| Images or CSS 404 only on the deployed site, not locally | Hard-coded root-relative asset path instead of an import or base-prefixed path  |

## Five-page marketing composition

Treat “five pages” as five crawlable marketing routes; `/404` is deployment
infrastructure and does not count. Unless the brief says otherwise, start with
home, features, pricing, about, and contact, but decide their distinct jobs
before implementation.

Use a marketing route group with its own `_routes.tsx` and `_layout.tsx`. Each
page composes one or more marketing features; features compose reusable
marketing components and published primitives. The layout owns shared header,
navigation, main landmark, container, and footer. Do not create five variants
of one hero or leave starter copy, fake claims, invented prices, dead links, or
controls that only appear to work.

GitHub Pages cannot process a contact form. Use published contact information
or a mail link unless a real endpoint is authorized. When an endpoint exists,
put it behind a validated adapter and mutation, then show pending, failure,
recovery, and success states.
