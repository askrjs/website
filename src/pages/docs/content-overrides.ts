// Hand-written meta descriptions, keyed by route. These become the page's
// <meta name="description"> and its search-result snippet. Where a route has
// no entry here, definePage() falls back to a per-section template — see
// sectionDescription() in catalog.ts.
// The ten heading bodies that previously fell through to guidance(). Written
// against the published prop types in @askrjs/ui.
export const lateHeadingOverrides: Readonly<
  Record<string, Readonly<Record<string, string>>>
> = {
  '/docs/components/switch': {
    anatomy:
      'Switch has no sub-parts — it is a single control, unlike Accordion or Select. It renders as a button carrying `role="switch"` and `aria-checked`, and takes `checked` with `onCheckedChange` for controlled use or `defaultChecked` for uncontrolled. `name` and `value` make it submit inside a plain form, and `required` and `disabled` behave as they would on a native input. Pair it with `Field` from `@askrjs/themes/field` and `FieldLabel` from the `@askrjs/themes/components` barrel (it isn\'t exported from `/field` itself) rather than a bare `label`, so the description and error slots line up with the rest of your form controls.',
  },
  '/docs/components/table': {
    purpose:
      "Table is semantic table markup with the theme's type, spacing, and border tokens applied — `Table`, `TableCaption`, `TableHead`, `TableHeaderCell`, `TableBody`, `TableRow`, `TableCell`, and `TableFoot` map one-to-one onto the HTML elements of the same name. Reach for it when you already have the rows in hand and want them to look right. It does no sorting, filtering, paging, or windowing; when the row count grows past what you want in the DOM at once, move to Virtual Table.",
  },
  '/docs/components/data-table': {
    purpose:
      'Data Table is the themed composition layer over Table: it takes the same semantic parts and wires in the presentational conventions an application table usually needs, so you are not rebuilding header, body, and cell styling per feature. It is typed loosely against the shared catalog prop shape rather than a bespoke column API, so treat the composition on this page as the contract and keep sorting, filtering, and pagination state in your own application code, where the URL or server can own it.',
  },
  '/docs/components/virtual-list': {
    purpose:
      'Virtual List renders only the rows currently in view, for collections long enough that putting every node in the DOM costs you scroll performance. You give it `items`, a fixed `rowHeight`, a `getKey` for stable identity, and a `rowComponent` that renders one item; `overscan` controls how many extra rows are kept outside the viewport. `followBottom` pins the view to the newest row, which is what you want for a log or a chat transcript, and `apiRef` exposes imperative scrolling for jump-to-row.',
  },
  '/docs/components/virtual-table': {
    purpose:
      'Virtual Table applies the same windowing as Virtual List, but along columns as well as rows. Each entry in `columns` is a `VirtualTableColumn` — an `id`, a `header` (string or element), an optional `width`, and a `cellComponent` that renders one cell for one row — so the table describes itself as data rather than as nested markup. Use it when both the row count and the column count are large enough that a plain Table would put more nodes in the DOM than the browser can scroll smoothly.',
  },
  '/docs/components/scroll-area': {
    purpose:
      'Scroll Area gives you a scroll container whose scrollbars you can style, without giving up native scrolling, keyboard paging, or momentum on touch. Compose `ScrollArea` around a `ScrollAreaViewport` holding the content, plus a `ScrollAreaScrollbar` and `ScrollAreaThumb` per axis and a `ScrollAreaCorner` when both axes are present. Reach for it when a default scrollbar would break the visual design — not to hide that content overflows, which users still need to be able to discover.',
  },
  '/docs/components/structures': {
    'live-examples':
      'The example on this page composes `Dialog` with its trigger, content, and title as you would in application code. The pattern generalizes across the structural components: a root that owns open state, a trigger that trips it, and a portalled content region that takes focus. Read the composition rather than copying it verbatim — your own content, labels, and actions belong in the same slots.',
  },
  '/docs/components/navbar-and-navigation-menu': {
    'live-examples':
      'The example composes `NavigationMenu` with a `NavigationMenuList` of `NavigationMenuItem`/`NavigationMenuLink` pairs, and passes route destinations rather than hand-written path strings. Note the `aria-label` on the menu itself: with more than one navigation landmark on a page, each needs its own name for that landmark list to be usable.',
  },
  '/docs/components/breadcrumb-and-pagination': {
    'live-examples':
      'The example composes `Breadcrumb` down to the current page, with `BreadcrumbPage` marking the last crumb rather than a link — that is what stops a screen reader announcing the page you are already on as somewhere to go. Build the intermediate `BreadcrumbLink` destinations from route parameters so the trail stays correct when the route shape changes.',
  },
  '/docs/components/application-chrome': {
    'live-examples':
      'The example composes the persistent frame around routed content: brand, primary navigation, and the actions that stay put while the page beneath them changes. Keep the chrome in a layout component registered on a route group rather than repeating it per page, so navigating within the group replaces only the routed region.',
  },
};

export const descriptionOverrides: Readonly<Record<string, string>> = {
  '/docs/getting-started/overview':
    'What the Askr runtime owns, what your application owns, and which published packages the docs are written against.',
  '/docs/getting-started/installation':
    'Run the CLI with npx or install it globally, check the Node version Askr needs, and confirm a scaffolded project starts.',
  '/docs/getting-started/choose-a-starter':
    'Compare the startkit, spa, ssr, ssg, and full-stack templates, or describe your product and let the CLI pick one.',
  '/docs/getting-started/first-application':
    'Scaffold a project, register a route, add a piece of state, and produce a real production build.',
  '/docs/getting-started/project-structure':
    'Where the composition root, routes, server boundary, and generated artifacts live in a scaffolded Askr project.',
  '/docs/getting-started/application-modes':
    'Choose between SPA, SSR, SSG, and full-stack delivery — and see why the choice is a boot-file change, not a rewrite.',

  '/docs/core-concepts/components-and-jsx':
    'Askr components are plain functions returning JSX, with no compiler-owned reactivity and no hidden re-render rules.',
  '/docs/core-concepts/state-and-derived-values':
    'Read and write state through explicit getter/setter pairs, and derive values instead of synchronizing copies.',
  '/docs/core-concepts/lists-with-for':
    'Render keyed collections with For so list updates move DOM nodes instead of rebuilding them.',
  '/docs/core-concepts/conditional-rendering':
    'Branch markup with Show and friends, keeping the mounted and unmounted paths explicit.',
  '/docs/core-concepts/scopes':
    'Pass a value down the component tree without prop drilling, and have it read back from wherever `readScope()` is called below the provider.',
  '/docs/core-concepts/lifecycle-work':
    'Attach mount, cleanup, and DOM-only work to the component lifecycle so server rendering stays deterministic.',
  '/docs/core-concepts/error-boundaries':
    'Catch render-time failures at a boundary with a fallback and a reset path, instead of losing the whole application shell.',
  '/docs/core-concepts/determinism':
    'The runtime rules that let the same component tree render identically on the server and in the browser.',

  '/docs/routing/definitions-and-layouts':
    'Declare routes, nested layouts, and groups in one typed registry you can read and enumerate.',
  '/docs/routing/paths-and-parameters':
    'Path params are inferred from the literal route string, so a component gets typed params without hand-written types.',
  '/docs/routing/navigation-and-url-state':
    'Navigate with Link and navigate(), and keep URL-owned state in the URL rather than mirroring it into component state.',
  '/docs/routing/loaders-and-deferred':
    'Load route data before render, and mark the slow parts deferred so they do not block the first paint.',
  '/docs/routing/access-policies':
    'Attach auth requirements to a route or group so denied users never see a flash of protected UI.',
  '/docs/routing/route-metadata':
    'Set titles, meta tags, and structured data per route, and serialize them into server-rendered documents.',
  '/docs/data/choosing-a-primitive':
    'When to reach for a resource, a query, or a plain loader — and what each one owns.',
  '/docs/data/resources':
    'Bind asynchronous work to the active lifecycle so navigating away cancels it instead of resolving into a dead component.',
  '/docs/data/queries-and-consistency':
    'Key queries, share results between components, and control how cached data goes stale.',
  '/docs/data/mutations-and-invalidation':
    'Write through a mutation, invalidate the queries it affects, and let dependents refetch.',
  '/docs/data/server-queries':
    'Resolve query data on the server and hand it to the browser so hydration does not refetch what you already have.',
  '/docs/data/actions-and-forms':
    'Page actions are POST handlers that return a redirect or field-level errors, and work with JavaScript disabled.',

  '/docs/rendering/client-and-islands':
    'Boot a fully client-rendered app, or mount single interactive components into an otherwise static page.',
  '/docs/rendering/server-side-rendering':
    'Render a route to HTML on the server, including how request data and loader results reach the renderer.',
  '/docs/rendering/streaming':
    'Stream a response so slow data arrives after the shell, without blocking the rest of the page.',
  '/docs/rendering/hydration':
    'Attach the browser runtime to server-rendered markup, and verify the markup matches before it does.',
  '/docs/rendering/selective-hydration':
    'Defer hydration until idle or below the fold — worth reaching for only once profiling says hydration is the bottleneck.',
  '/docs/rendering/static-site-generation':
    'Render every route to HTML at build time and deploy the output as plain files with no server runtime.',

  '/docs/tooling':
    'Scaffold, generate, and check an Askr project with the published CLI and Vite plugin.',
  '/docs/tooling/cli-overview':
    'The commands @askrjs/cli actually ships, how to target a project with --cwd, and which generators do not exist.',
  '/docs/tooling/create':
    'Create a project from a template, or from a product prompt that picks the template and writes a build blueprint.',
  '/docs/tooling/add':
    'Generate a page or a declared action as ordinary files you review in a normal diff before committing.',
  '/docs/tooling/openapi':
    'Emit an OpenAPI document from your schemas, fail CI when it drifts, and generate a typed client from it.',
  '/docs/tooling/ssg':
    'Run static generation from a config file, choose the output directory, and verify what was written.',
  '/docs/tooling/dependency-updates':
    'askr update applies peer-compatible changes; askr upgrade moves to the latest peer set as a deliberate step.',
  '/docs/tooling/skills':
    'Check project-specific instructions into the repo so an AI assistant does not rediscover your conventions each session.',
  '/docs/tooling/vite':
    'How the Vite plugin owns the HTML document, injects Askr-managed head content, and composes the SSR response.',
};
