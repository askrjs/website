# askr website

Static website for the askr ecosystem, generated with `vite-plus` + Askr SSG and deployed to GitHub Pages.

## Commands

- `npm run build` - full static build into `dist/`
- `npm run generate` - run the Askr static-site generator using the built client template
- `npm run build:incremental` - incremental static generation build
- `npm run verify:static` - validate generated document output
- `npm run preview` - run a local production preview
- `npm run typecheck` - TypeScript validation
- `npm run lint` - lint project files
- `npm run fmt` - format project files
- `npm run check` - typecheck + full build + static output verification

## Architecture

- `ssg.config.ts`: route registry and generation settings
- `scripts/ssg-build.ts`: renders app routes with Askr SSG and wraps them with the built document template
- `scripts/verify-static-output.ts`: verifies generated document shape, metadata, and assets
- `index.html`: canonical document template for dev and generated output
- `src/pages/_routes.tsx`: root route composition plus SPA/SSR/static adapters
- `src/pages/home/`, `src/pages/framework/`, `src/pages/ui/`, `src/pages/themes/`: top-level route groups with page-owned `_routes` files
- `src/pages/docs/_routes.tsx`: docs route group, backed by docs-local `_content`, `_layout`, and `_registry` files
- `src/pages/showcase/_routes.tsx`: showcase route group, including nested UI component detail routes
- `src/components/site-shell/`: body-level site chrome shared by pages
- `src/components/page-templates/page-shell.tsx`: reusable page container template
- `src/components/site-primitives/`: reusable site-level building blocks
- `src/pages/docs/`: docs pages and docs-owned private helpers
- `src/pages/showcase/`: showcase pages plus UI registry, demos, and models owned by the nested showcase UI route group
- `src/lib/site-nav.ts`: cross-site navigation contracts and links
- `src/styles.css`: shared site styles

### Build Pipeline Notes

- Dev (`vp dev`) uses `index.html` and mounts `src/client.tsx`.
- Client build (`npm run build:client`) builds `index.html`, app JS, CSS, public assets, and the reusable static document template.
- Static generation (`npm run generate`) renders shared route handlers as app HTML, then wraps them with the cached built `index.html` template.
- Incremental generation uses route `invalidationKeys`; pass targeted rebuilds with `--changed-route /` or `--changed-key docs`.
- SSR build (`npm run build:ssr`) compiles `src/server/entry-server.tsx`; SSR callers provide the built document template to `renderPage()`.
- Theme boot is centralized in `public/theme-init.js` and loaded by `index.html`.

## Initial Scope

- Home page
- Showcase landing pages for askr, askr-ui, and askr-themes
- Starter docs pages authored directly in this repository
