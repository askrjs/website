# askr website

Static website for the askr ecosystem, generated with `@askrjs/askr/ssg` and deployed to GitHub Pages.

## Commands

- `npm run build` - full static build into `dist/`
- `npm run build:incremental` - incremental build
- `npm run typecheck` - TypeScript validation
- `npm run check` - typecheck + full build

## Architecture

- `ssg.config.ts`: route registry and generation settings
- `scripts/build-site.ts`: asks Askr SSG source to generate static output
- `src/site/content.ts`: route metadata + docs content
- `src/site/routes.ts`: route definitions for all website pages
- `src/components/`: shared shell and UI building blocks
- `src/pages/`: page-level TSX components
- `src/styles.css`: shared site styles

## Initial Scope

- Home page
- Showcase landing pages for askr, askr-ui, and askr-themes
- Starter docs pages authored directly in this repository
