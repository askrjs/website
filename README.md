# Askr website

Static website for the Askr ecosystem, generated with Vite Plus and the Askr CLI, then deployed to GitHub Pages.

The website consumes published `@askrjs/*` packages from npm. Local builds and
CI therefore validate the same package boundary used by GitHub Pages.

## Commands

- `npm run build` - full static build into `dist/`
- `npm run generate` - run the Askr static-site generator using the built client template
- `npm run build:incremental` - incremental static generation build
- `npm run verify:static` - validate generated document output
- `npm run preview` - run a local production preview
- `npm run typecheck` - TypeScript validation
- `npm run lint` - lint project files
- `npm run fmt` - format project files
- `npm run check` - lint + typecheck + structure + build + static output verification

## Architecture

- `ssg.config.ts`: exports the route registry, document renderer, generation settings, and built assets consumed by `askr ssg`
- `scripts/verify-static-output.ts`: verifies generated document shape, metadata, and assets
- `index.html`: canonical document template for dev and generated output
- `src/pages/_routes.ts`: shared route registry and document metadata lookup
- `src/pages/home/`, `src/pages/framework/`, `src/pages/ui/`, `src/pages/themes/`: top-level route groups with page-owned `_routes` files
- `src/pages/docs/_routes.ts`: docs route group backed by docs-local layout and registry modules
- `src/pages/showcase/_routes.ts`: showcase route group, including nested UI component detail routes
- `src/site/shell/`: body-level site chrome shared by pages
- `src/site/primitives/`: reusable site-level building blocks
- `src/pages/docs/`: docs pages and docs-owned private helpers
- `src/pages/showcase/`: showcase pages plus UI registry, demos, and models
- `src/site/navigation.ts`: cross-site navigation contracts and links
- `src/styles.css`: shared site styles

### Build Pipeline Notes

- Dev (`vp dev`) uses `index.html` and mounts `src/app/client.tsx`.
- Client build (`npm run build:client`) builds `index.html`, app JS, CSS, public assets, and the reusable static document template.
- Static generation (`npm run generate`) runs through `askr ssg`, renders shared route handlers, wraps them with the built client template, and atomically publishes routes and assets.
- Incremental generation is available through `npm run generate:incremental`; use `--changed-route`, `--changed-key`, or `--force-full` when the route source supports those signals.
- SSR build (`npm run build:ssr`) compiles `src/app/server/entry-server.tsx`; SSR callers provide the built document template to `renderPage()`.
- Theme boot is centralized in `public/theme-init.js` and loaded by `index.html`.

## Automation

- `.github/workflows/ci.yml` only installs the published dependencies, builds the static site, verifies `dist`, and uploads the build artifact.
- `.github/workflows/deploy.yml` builds and verifies the site on `main`, then publishes `dist` through GitHub Pages.

## Initial Scope

- Home page
- Showcase landing pages for askr, askr-ui, askr-themes, and askr CLI workflows
- Starter docs pages authored directly in this repository
