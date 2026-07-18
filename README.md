# Askr website

Hydrated Askr marketing and documentation site, generated with Vite Plus and
the Askr CLI, then deployed to GitHub Pages.

The website consumes published `@askrjs/*` packages from npm. Local builds and
CI therefore validate the same package boundary used by GitHub Pages.

## Commands

- `npm run dev` starts the Vite development server.
- `npm run build` builds the client and runs `askr ssg` into `dist/`.
- `npm run verify:static` validates the generated route, markup, and assets using
  only Node.js built-ins.
- `npm run fmt:check` checks formatting without changing files.
- `npm test` verifies the generated static output after a build.
- `npm run preview` serves `dist/` with `vp preview --outDir dist`.
- `npm run check` runs lint, typecheck, build, and static verification.

## Architecture

- `src/pages/_layout.tsx` owns the marketing shell and shared Askr branding.
- `src/pages/_routes.tsx` owns the shared browser/SSG route registry.
- `src/pages/home.tsx` renders the `/` page.
- `src/pages/docs/` owns the docs shell and the three documentation pages.
- `src/main.tsx` hydrates generated markup and starts the SPA in development.
- `public/assets/askr-logo.png` provides the favicon and touch icon; the GitHub
  mark variants come from the official GitHub Brand Toolkit.
- `ssg.config.ts` injects rendered HTML and route-specific metadata into Vite's
  built document and publishes its hashed assets.

The internal route registry is the only interface shared by the browser and
SSG. This package does not expose a public API.

## Build and publish flow

1. `npm run build:client` builds the browser entry and stylesheet into
   `.askr/client/` with hashed asset names.
2. `npm run build:ssg` renders the marketing route and three docs routes,
   injects them into the built Vite document, and publishes the result to
   `dist/`.
3. `npm run verify:static` checks `dist/metadata.json`, pre-rendered content,
   and every referenced asset.

`.github/workflows/ci.yml` runs format, lint/typecheck, build, and test on pull
requests. Pushes to `main` and manual dispatches use
`.github/workflows/deploy.yml` to run the aggregate check, upload `dist/`, and
deploy it through the `github-pages` environment.

The repository does not carry a `CNAME` file. Configure `askrjs.com` in the
repository's Pages settings (or through the Pages API), wait for DNS and the
certificate to become healthy, then enable HTTPS enforcement.
