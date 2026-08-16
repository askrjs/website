# Askr Docs/Marketing Accuracy Audit

Scope: every marketing page (`/`, `/platform`, `/application-model`, `/rendering`,
`/full-stack`, `/themes`, `/tooling`, `/production`, `/contribute`), the full
`/docs` nav tree, and the top-level READMEs (`website/README.md`,
`askr/README.md`), checked against real source in `askrjs/askr`,
`askrjs/askr-ui`, `askrjs/askr-themes`, `askrjs/askr-server`,
`askrjs/askr-auth`, `askrjs/askr-cli`, `askrjs/askr-fetch`,
`askrjs/askr-schema`, `askrjs/askr-node`, `askrjs/askr-otel`,
`askrjs/askr-i18n`, `askrjs/askr-charts`, `askrjs/askr-monaco`,
`askrjs/askr-lucide`, `askrjs/askr-testing`, `askrjs/askr-vite`.

All content in this site is generated from typed data files, not per-page
markdown — the prose lives in `src/pages/docs/content-overrides.ts`
(`headingOverrides` + `descriptionOverrides`, keyed by route and heading),
`src/pages/docs/usage-guide.ts` (`routeExamples`, hand-written code
snippets), and `src/pages/docs/catalog.ts` (titles, headings, `status`
flags). All fixes below are edits to those three files, plus two marketing
`.tsx` files and the `askr` repo's `README.md`. **Nothing has been
committed** — all changes are left in the working tree for review, split
across two repos:

- `askrjs/website` (branch `docs-audit-accuracy`, not pushed)
- `askrjs/askr` (uncommitted `README.md` change; that repo also has an
  unrelated pre-existing uncommitted change in
  `benches/tier2/tier2-subsystem-hydration-defer-until-idle.tsx` that I did
  not make and left untouched)

## Method

I did not treat every page as equally likely to be wrong. Before touching
content I ran `tests/package-snapshot-contract.test.ts`, which derives every
`@askrjs/*` package's real exported entrypoints, signatures, CLI help text,
and peer dependencies straight from installed `node_modules` and fails CI on
any drift — confirmed green. That means raw API-surface claims on
`/docs/reference/*` pages (exports exist, signatures match, CLI flags match)
are already mechanically guarded and were **not** the focus of manual
re-verification. The actual risk surface is **behavioral/narrative prose** —
what something _does_, not just that it exists — which nothing checks
automatically. I audited that: six parallel read-only passes (one per major
nav section) each read the real implementation for every checkable claim,
then I applied the confirmed findings myself, sequentially, to avoid
conflicting edits to the same shared files.

Every fix below cites the exact source file/line I verified against before
editing (not the framework's own docs, which can also be stale — I read the
implementation).

## Highest-priority finding: reactivity-model misdescription (fixed)

**Bucket: Inaccurate.** The known issue described in the brief was real and
still present. `/docs/guides/migration-from-react` (four headings) and the
`render-purity` heading on `/docs/core-concepts/determinism` described
`state()`/`derive()` in Solid-style fine-grained-reactivity terms:
"components are not re-executed on every state change," reads "subscribe
that specific expression" instead of re-running the component, "no
`useMemo`/`useCallback` tax... because there's no re-render to guard
against." None of that is true.

**Verified against:** `askr/src/runtime/component-internal.ts`
(`executeComponentSync` calls `instance.fn` again on every update — a full
re-invocation, not a per-expression patch) and `askr/src/renderer/reconcile.ts`
(the re-run's output is diffed/patched as a VNode tree). Also verified the
real, useful distinction that _was_ getting lost: subscriptions are tracked
per component instance (a component only re-runs if it actually read a
changed source last render — no top-down cascade the way an unmemoized React
tree re-renders every child), and `<For>` genuinely does patch per-row
without re-invoking the render callback for unchanged rows (confirmed
`INSERT_ONE`/`REMOVE_ONE`/`SWAP`/`FULL_KEYED` commit strategies in
`askr/src/runtime/for-reconcile.ts`). Rewrote all five headings to state this
accurately — components re-run, output is reconciled, not per-node
signal-based updates — without borrowing Solid's vocabulary for a mechanism
that works differently, and without implying speed parity with (or against)
Solid either way.

Also added a load-bearing caveat the page never mentioned: hook-order
enforcement and the "state cannot be mutated during render" runtime check
(`askr/src/runtime/state.ts:170`, exact string `[Askr] state.set() cannot be
called during component render.`; ordering rule from
`askr/docs/concepts/runtime-enforcement.md`, confirmed live in
`component-internal.ts`). These are real React-like constraints nothing on
the site mentioned.

**Landing page / READMEs:** the website's own `home.tsx` and README do
_not_ currently make the false claim (they only describe routing, not
reactivity mechanics) — the false claims were concentrated in the migration
guide and one core-concepts heading, both now fixed. The `askr` repo's own
top-level `README.md` reactivity section was already conservative (getter/
setter description only, no re-render-model claim) and needed no change on
that front — but see the separate ErrorBoundary fix below, found in the same
file.

## Bucket classification by section

### Marketing pages — mostly Accurate; one fixed

- `/` (home.tsx) — **Accurate.** No reactivity-model claims present; routing
  claims checked against `askr/src/router/authoring.ts` and `askr-cli`
  templates.
- `/platform` — **Inaccurate → fixed.** Claimed `@askrjs/fetch` clients are
  "generated from an OpenAPI document." Backwards: `@askrjs/fetch` is
  hand-authored (`defineApi`, `.query()`, `.returns()`, etc. —
  `askr-fetch/README.md:16-30`); OpenAPI-driven _generation_ is a separate
  `askr-cli` command (`askr generate`) that the `/tooling` page already
  described correctly. Fixed the sentence to describe both paths accurately.
  Also fixed the ErrorBoundary dev/prod claim shared with the README (below).
- `/application-model`, `/rendering`, `/full-stack`, `/themes`, `/tooling`,
  `/production`, `/contribute` — **Accurate.** Spot-checked against
  `askr/src/router/authoring.ts`, `askr/src/data/query-cell.ts`,
  `askr/src/data/invalidation.ts`, `askr/src/boot/index.ts`,
  `askr-server/src/askr/action-stages.ts`, `askr-schema/src/index.ts`,
  `askr-cli/src/bin/cli.ts` + `templates/*`, `askr-server/src/contracts.ts`,
  `askr-i18n/src/index.ts`, `askr-otel/src/index.ts` (the "OTel field
  allowlist has no room for bodies/cookies/tokens" claim checks out exactly
  — `TelemetryFields` is a closed 8-field interface).

### `website/README.md` and `askr/README.md`

- `website/README.md` — **Accurate.** Describes this repo's own build
  pipeline; all referenced scripts/paths exist.
- `askr/README.md` — **Inaccurate → fixed.** The "Developer error
  boundaries" section claimed the visible fallback UI only renders "in
  development." Verified against `askr/src/renderer/error-boundary-dom.ts`:
  the default fallback renders in _every_ environment; only its `<details>`
  panel's `open` state is dev-specific (`details.open =
isDevelopmentEnvironment()`). Fixed the README and the matching
  `/docs/core-concepts/error-boundaries` `reporting` heading, which had the
  identical error.

### Getting Started — Accurate-but-incomplete → fixed

Four findings, all about template-shape assumptions baked into prose as if
universal:

- `/docs/getting-started/installation` (`install-packages-directly`) claimed
  the CLI has zero subpath exports; `@askrjs/cli/ssg` is real
  (`askr-cli/package.json` exports). Fixed.
- `/docs/getting-started/project-structure` (`pages-and-routes`) and
  `/docs/getting-started/first-application` (`create-the-project`) both
  called `src/pages/**/_routes.tsx` "the CLI's default shape." Actual
  default template is `startkit`, which uses `src/router.tsx` +
  `src/routes/*.ts` — `_routes.tsx` is specific to the `spa` template.
  Verified against `askr-cli/src/bin/create.ts:905` and the templates
  directory. Fixed both to name the real per-template shape.
- `/docs/getting-started/first-application` (`build-the-application`)
  grouped SPA and full-stack together as producing "a client bundle only" —
  full-stack also builds a server bundle, same as SSR. Fixed.

### Core Concepts — Accurate-but-incomplete / Inaccurate → fixed

- `state-and-derived-values`, `components-and-jsx`, `lists-with-for`,
  `conditional-rendering`, `scopes`, `lifecycle-work`, `error-boundaries` —
  mostly accurate; two real errors found and fixed:
  - `determinism` (`hydration-diagnostics`): claimed dev diagnostics use
    `devWarningsEmitted` to point at "which subtree diverged" with "a
    specific warning." `devWarningsEmitted` is unrelated (used only for
    unused-state/slow-render warnings — `component-internal.ts:125`); the
    real check (`askr/src/ssr/verify-hydration.ts`) is a whole-document
    string comparison producing exactly one generic message (quoted
    verbatim from `askr/src/boot/index.ts:362`). Fixed.
  - `lifecycle-work` (`events-and-streams`): claimed `stream()` returns "the
    same `{ value, pending, error }` shape as `resource`." Actual shape
    (`askr/src/runtime/stream-operation.ts:20-29`) is `{ value, status,
pending, stale, error, restart(), close() }` — meaningfully richer.
    Fixed.
  - `scopes` description (`descriptionOverrides`): claimed "scopes own
    effects and resources, and dispose of them with their lexical owner."
    `Scope<T>` (`askr/src/runtime/context.ts`) is a pure context-provider —
    no effect/resource ownership exists there; that's the component
    instance's `cleanupFns`, unrelated to `defineScope`. Rewrote to describe
    what scopes actually do (pass a value down the tree).

### Routing — Accurate-but-incomplete / Inaccurate → fixed

Six findings, all fixed:

- `definitions-and-layouts` (`fallback-routes`): "exactly one fallback per
  `RouteRegistry`" — actually one per _scope_; `page()` sections can each
  register their own (`askr/src/router/authoring.ts:482-514`).
- `paths-and-parameters` (`static-and-dynamic-segments`): conflated
  `wildcard` (a bare `*` after a static prefix) with `catchall` (reserved
  for the bare path `/*` alone, what `fallback()` uses internally) — verified
  against `askr/src/router/match.ts`.
- `navigation-and-url-state` (`active-route-state`): described
  `currentRoute()`'s render-only requirement as a style suggestion ("call it
  during render rather than..."); it's an enforced throw
  (`askr/src/router/activity.ts:315-324`).
- `navigation-and-url-state` (`history-and-scroll`): claimed
  `ScrollRestorationOptions` is per-navigation configurable; it's app-wide,
  set once via `configureScrollRestoration()`
  (`askr/src/router/navigation-scroll.ts`). `NavigateOptions.scroll` is the
  real (narrower) per-call override, confirmed to actually exist.
- `route-metadata` (`head-reconciliation`, `ssg-metadata`) — **real product
  gap, not just a docs error.** `resolveRouteMeta`/`serializeRouteMeta`/
  `reconcileRouteMeta` are real, working functions, but they're **only ever
  called from the router's client-side navigation code** — grepped
  `askr/src/ssr/**` and `askr/src/ssg/**` for all three names: zero hits.
  There is no automatic wiring of route metadata into an SSR or SSG
  document's `<head>`. Rewrote both headings to say so explicitly and added
  `status: 'limited'` in `catalog.ts` with an inline comment explaining why
  — this is exactly the "Published limitation" pattern the brief asked me to
  extend consistently.

### Data — Inaccurate → fixed (one significant)

- `actions-and-forms` (`redirects-and-revalidation`): claimed "there's no
  separate redirect API in the actions module itself." False — there's a
  dedicated, security-checked redirect pipeline end to end: server
  `ActionOutcome.redirect` → same-origin validation
  (`askr/src/actions/index.tsx:97-105`) → `location.assign()` on the
  enhanced path, or a real HTTP 303 on the no-JS form-post path
  (`askr-server/src/askr/action-stages.ts`). This also directly contradicted
  the page's own `descriptionOverrides` entry, which already got it right.
  Fixed the prose to match reality (and the rest of the page).
- `queries-and-consistency` (`refresh-behavior`, `define-a-query`): both
  claimed `reconcile()` decides whether fetched data replaces the cache.
  Traced `askr/src/data/query-cell.ts:395-451`: fetched data is written to
  state _before_ `reconcile()` even runs; `reconcile()`'s return value only
  controls whether an automatic retry is scheduled. Out-of-order responses
  are guarded separately by generation/controller-identity checks. Fixed
  both headings.
- `/docs/data` + `mutations-and-invalidation` (`writes-and-invalidation`,
  `targeted-invalidation`): both said `affects()` "automatically triggers
  invalidate()" without the actual gate — it only fires when
  `afterSuccess === 'invalidate'` (`askr/src/data/mutation-cell.ts:116-123`).
  Fixed both.
- `server-queries` (`prefetch`): claimed `prefetchQuery` "runs that query
  against the registered handler," unqualified. Only true in `'ssr'` mode;
  `'spa'` mode (the default) never consults the registry and calls the
  query's own `fetch()` instead (`askr/src/data/query-registry.ts:83-114`).
  Fixed.

### Rendering, Server, Authentication, HTTP Contracts — Inaccurate/Incomplete → fixed (20 findings)

The largest cluster of concrete errors, all fixed:

- **Rendering:** `shared-application-model` claimed `RouteHandler`/
  `RouteRegistry` are re-exported identically from `/ssr`, `/ssg`, and
  `/boot` — they're defined once in `/router` and imported from there, not
  redeclared per module. `island-ownership` misattributed a doc comment to
  the wrong symbol. `hydration` (`mismatch-diagnostics`) claimed
  `skipSelectors` exempts a region from markup verification — it only
  exempts listener attachment/deferred tracking, not `verifyMarkup`'s
  comparison (`askr/src/renderer/dom-internal.ts` vs `verify-hydration.ts`).
- **Server:** `onError`/`error-handling` (two pages) claimed
  `ServerAppOptions.onError` is _the_ single funnel for unhandled
  exceptions — several framework-recognized failures (oversized body,
  malformed path param, `ctx.bind()` failure) are converted to a fixed
  problem+json response _before_ `onError` runs (`askr-server/src/application.ts:60-72`).
  `problem-details` cited RFC 7807; the real implementation self-identifies
  as RFC 9457 (`askr-server/src/contracts.ts`, `http/responses.ts`).
  `server-actions` (`action-responses`) omitted that `ActionOutcome` also
  carries cookie instructions (`askr-server/src/askr/action-types.ts`).
- **Authentication (7 findings, the weakest section before this pass):**
  malformed-token handling claimed uniform throw behavior — bearer JWTs
  throw, but a malformed JWT _cookie_ is caught internally and falls through
  silently (`askr-auth/src/auth-resolver.ts:31-67`). Session expiry claimed
  "no built-in expiry enforcement beyond your store" — `createAuth` actually
  checks `expiresAt`/`revokedAt` itself against `clock()`
  (`auth-resolver.ts:12-13,71-72`). The `usage-guide.ts` authorization
  example called `auth.permissions` — `AuthContext` has no such field, it's
  `principal.permissions` and `principal` can be `null`; the example would
  throw at runtime — fixed. JWT `clock` default was described as raw
  `Date.now` (milliseconds); it's `Math.floor(Date.now()/1000)` (Unix
  seconds) — and it's a _different_ clock from the session-side
  `AuthOptions.clock`, both sharing the name "clock" across pages, now
  called out explicitly. OIDC `callback-validation` described
  `exchangeCode()` as returning a raw, unvalidated token response requiring
  a separate `validateOidcIdToken()` call — it already validates internally
  and returns `{ tokens, principal }` (`askr-auth/src/oidc-client.ts:54-86`).
  `framework-routes`: the `/auth/v1` prefix was described as a convention;
  it's hardcoded inside `registerAuthRoutes` (`askr-server/src/auth.ts:171`).
  A throttled `allowAttempt` was described as surfacing via `AuthRouteError`
  429; it actually short-circuits straight to `tooManyRequests()` —
  `AuthRouteError` exists for the caller's own register/authenticate
  callbacks to throw instead.
- **HTTP Contracts (6 findings):** `open-api` `client-generation` claimed no
  code-generation path exists for consuming an API — `askr generate` is a
  real CLI command that does exactly that (`askr-cli/src/bin/generate.ts`).
  `generate-and-check` overstated `toOpenApiDocument()`'s validation — the
  missing-operationId/undocumented-response checks are gated behind
  `metadata: 'authored'`, not on by default (`askr-server/src/openapi/validate.ts`).
  `results-and-errors` (`retries`) attributed upload-retry exclusion to "has
  a body" — the real cause is POST simply not being in retry's default
  eligible-methods list; only a genuinely streaming body is permanently
  excluded (`askr-fetch/src/middleware.ts:93-111`). `typed-clients`
  (`typed-input`) said query/headers become required only when _every_
  field is required — it's _any_ required field
  (`askr-fetch/src/client.ts:386-392`). `typed-output` omitted the
  `'request'` failure kind. `schemas` (`safe-parsing`) described
  `schema.record()` as the mechanism for extra-key validation on
  `schema.object()`; the real mechanism is `additionalProperties: <schema>`
  — `schema.record()` builds an unrelated standalone schema.

### MCP, Platform Services, Tooling — Inaccurate/Incomplete → fixed (11 findings)

- **MCP:** session-store description flatly wrong — claimed an unbounded,
  no-TTL in-memory `Set`; the real default (`askr-server/src/mcp/http.ts`)
  is a TTL- and capacity-bounded `Map` (`sessionTtlMs` default 30 min,
  `maxSessions` default 1,000, returns 503 at capacity) — fixed across three
  headings (`deployment`, `http-requests`, `sessions/expiry`,
  `sessions/state-ownership`). The `Accept` header requirement was described
  as OR (`application/json` _or_ `text/event-stream`); the code requires
  both, else 406 (`askr-server/src/mcp/http.ts:158-160`) — fixed. Removed a
  reference to a nonexistent `initialized: true` session field.
- **Platform Services:** `createNodeHandler(app, options?)` — `options` is
  required, not optional (`askr-node/src/handler.ts:84`). OTel `span()`
  described as accepting a "custom operation" — it's restricted to a closed
  set of `askr.*` names, no escape hatch (`askr-otel/src/index.ts:19-27`).
  Exception-capture behavior was undocumented: `createTelemetry` only
  exports an exception if you supply `sanitizeException` and it returns a
  value — by default, nothing is captured at all, not auto-redacted.
- **Tooling:** SSG document composition was claimed to share machinery with
  `@askrjs/vite`'s dev-server plugin (different mechanisms — a plain
  `DocumentRenderer` function vs. HTML-comment marker replacement,
  `askr-vite/src/server/document.ts`). `askr create` was described as
  triggering interactive template selection whenever no template name is
  given; it silently defaults to `startkit` unless the _name_ is also
  omitted or `--prompt` is passed (`askr-cli/src/bin/create.ts:905-963`).
  `askr upgrade`'s major-bump behavior was described as "next-version" —
  there's no per-run cap at one major version; the target is whatever the
  registry's `latest` tag resolves to (`askr-cli/src/update/planner.ts`,
  `range.ts`). Also fixed a repeated `invalidationKeys`/`cache-hit` error
  (below).

### Guides section — Inaccurate/Incomplete → fixed (≈25 findings across 15 routes)

`/docs/guides/migration-from-react` was fixed as part of the top-priority
finding above. Every other guide route was checked; findings and fixes:

- **`generate-a-static-site`:** `result.routes[].reason` was said to include
  a `'cache-hit'` value — the real `RouteRenderReason` union
  (`askr/src/ssg/types.ts:24-32`) has no such value; `'unchanged'` is what a
  correctly-skipped route reports. The CLI's incremental flags were named
  `invalidationKeys`/`changedRoutes` in prose; the real names are
  `--changed-key`/`--changed-route`, forwarded internally as
  `changedKeys`/`changedRoutes` (`invalidationKeys` doesn't exist anywhere
  in `askr-cli`). Fixed in three places (this guide, the `/docs/data` SSG
  summary, and `rendering/static-site-generation`).
- **`protected-routes-and-permissions`** (worst-scoring guide before this
  pass): claimed a nested `auth.check` field — no such field exists;
  the real per-route option is a sibling field simply named `auth`
  (`askr/src/common/router.ts:131-144`). Claimed `deny('forbidden' |
'unauthorized' | ...)` takes a string reason — `deny()` takes a numeric
  HTTP status (`401 | 403 | 404`, `askr/src/common/router.ts:82`). The
  `AuthContext` example omitted its `authenticated` field. All three fixed.
- **`build-an-authenticated-full-stack-app`:** `route(path, Component,
{ policy })` — the real field is plural, `policies: [...]`
  (`askr/src/common/router.ts:141-144`). Fixed.
- **`add-ssr-to-an-spa`:** claimed `RouteRenderOptions` (the SSR-side type)
  carries an `auth` field the way the SSG side's `RouteConfig.auth` does —
  it doesn't (`askr/src/ssr/route-render.ts:38-53`); auth for SSR lives on
  `resolveRequest({ auth })` instead. Also claimed the user's server entry
  module calls `createDocumentApp()` itself — the Vite plugin does that
  internally; the entry module only exports a plain `ServerApp`. Both fixed.
- **`accessibility`:** claimed `Dialog`, `Popover`, _and_ `Menu` all build
  on `FocusScope` — `Menu` uses its own roving-focus mechanism, not
  `FocusScope`. Claimed a `.a11y.d.ts` file is what you'd read — the real
  source files are `.a11y.ts` (`.d.ts` only exists in compiled `dist/`).
  Softened an overclaim that `FOCUS_RULES` exists on every contract (only
  some do). Fixed.
- **`dashboards-charts-and-polling`:** shown `invalidateOnInterval({...})`
  without its required `prefix` argument
  (`askr/src/data/invalidation.ts:40-42`) — fixed to a working call.
  Claimed cross-`createPlot()`-factory mixing is a compile-time type error;
  it's a runtime `TypeError` via factory-identity branding
  (`askr-charts/src/descriptors.ts:87-91`) that TypeScript often won't catch
  structurally — fixed.
- **`file-uploads-and-artifacts`:** attributed upload-retry exclusion to "by
  design" rather than the real mechanism (POST not in retry's default
  method list; only streaming bodies are permanently excluded) — fixed,
  consistent with the same correction on `/docs/http-contracts/results-and-errors`.
- **`forms-actions-and-crud`:** "nothing in `action()` serializes concurrent
  submissions for you" was true but incomplete — a generation counter
  silently discards a stale response's effect on UI state even though the
  earlier write completed server-side (`askr/src/actions/index.tsx:12,123-181`).
  Fixed to explain the actual behavior, not just "no guarantee."
- **`loading-empty-error-and-pending-states`:** `mockQuery`/`queryState`
  constructor list omitted `.pendingWrite()`, the one that actually exercises
  the `pending-write` consistency state the same page's `goal-and-architecture`
  heading mentions. Fixed.
- **`testing-deterministic-applications`:** conflated `mockQuery` builder
  method names with the real (narrower, hyphenated) `consistency` field
  values — `loading`/`error` aren't `consistency` values at all. Claimed
  `retry()` and `debounce()` both expose `cancel()`/`flush()` — `retry()`
  returns a plain `Promise` with nothing to drive; `debounce`/`throttle`
  have `.cancel()` only, no `.flush()` (that's on the separate
  `debounceEvent`/`throttleEvent` variants). Both headings fixed.
- **`testing-http-applications`:** "It is Node-only" — no Node-specific
  dependency exists anywhere in `askr-testing/src/**` (built entirely on
  standard Web APIs); reworded to describe this as a publishing/testing
  scope statement, not a technical restriction.
- **`build-an-api-only-server`:** `ctx.bind()`'s merge-priority description
  was self-contradictory (listed body first, then said params are
  authoritative). Fixed to state the real order: params, then query, then
  body.
- **Guides landing page** (`choose-a-guide`): called `createSPA`,
  `hydrateSPA`, and `createStaticGen` "mutually exclusive entry points."
  The first two really are (`askr/src/runtime/execution-model.ts:10-21`
  throws on mixing them); `createStaticGen` is a separate build-time step
  routinely _paired_ with `hydrateSPA`, not a fourth exclusive option.
  Fixed.
- All other guide routes (`build-an-spa`, `build-an-mcp-server`,
  `environment-configuration`, `production-readiness`, `realtime-streams`,
  `tables-filters-and-url-state`, `api-integration-and-error-handling`) —
  **Accurate**, no changes.

### UI & Components, Charts, Integrations

This section had the largest raw finding count (~50 across 34 routes) —
almost entirely narrative/behavioral overclaims about specific components,
not export-existence problems (those are already covered by the contract
test). Given the volume, I prioritized and fixed the highest-severity class
— capability claims that materially overstate what ships, and examples/
import paths that are flatly broken — and I'm disclosing the rest here
rather than silently leaving them unflagged.

**Fixed (bucket: Inaccurate, verified against source):**

- `/docs/components/toast-and-sonner` — **Inaccurate, needs Published
  limitation → fixed.** Sonner (`themes/sonner`, aliasing `Toaster`) was
  described as "a drop-in notifier." It's a bare presentational div wrapper
  (`askr-themes/src/components/catalog.tsx:798-800`) with no imperative
  `toast()` API, queueing, stacking, timing, or dismiss logic — despite
  sharing a name with the standalone Sonner library, it doesn't reproduce
  its behavior. Set `status: 'limited'` in `catalog.ts` with an explanatory
  comment and rewrote `purpose`, `anatomy`, and `live-examples` to say so
  plainly; pointed readers at the real `Toast`/`ToastHost` primitive instead.
- `/docs/components/advanced-layout` — **Inaccurate, needs Published
  limitation → fixed.** Claimed `SidebarScope` "coordinates open/closed and
  rail-expanded state." Verified `SidebarScope` is `sidebarPart(props,
"sidebar-scope")` — a pure styling wrapper with zero state logic
  (`askr-themes/src/components/sidebar/sidebar.tsx:74-77`). Set `status:
'limited'` and rewrote `state-model` to say the app owns all collapse
  state itself.
- `/docs/components/button-and-button-group` (`install-and-import`) —
  example implied `import { Button, ButtonGroup } from
'@askrjs/themes/button'` works as one statement. `@askrjs/themes/button`
  only re-exports `Button`; `ButtonGroup` requires the separate
  `@askrjs/themes/button-group` entrypoint (`askr-themes/src/entries/button.ts`
  vs `button-group.ts`) — as written, the combined import fails. Fixed.
- `/docs/components/application-layout`, `/docs/components/advanced-layout`
  (`install-and-import`, both pages) — both cited `@askrjs/themes/core`,
  which does not exist anywhere in the package's real exports (confirmed
  against `package.json` and the `dist/entries/*` wildcard target — no
  `block.ts`/`header.ts`/`main.ts`/`core.ts` entry files exist). The real
  path is `@askrjs/themes/components`. Fixed both.
- `/docs/components/table` (`install-and-import`) — claimed `/table`,
  `/data-table`, and `/scroll-area` "all resolve to the same
  `dist/components.js` barrel." They're three separate entry files
  (`askr-themes/src/entries/{table,data-table,scroll-area}.ts`); `data-table`
  in particular pulls a completely different, presentational-only component
  off an internal catalog module, not the same `@askrjs/ui/table`
  primitives `table` re-exports. Fixed.
- `/docs/components/virtual-list`, `/docs/components/virtual-table`
  (`install-and-import`) — both claimed "no themed counterpart... no styled
  wrapper component" exists in `@askrjs/themes`. Both components are in
  fact re-exported through the `@askrjs/themes/components` barrel
  (`askr-themes/src/components.ts:161-180`) — there's no _dedicated_
  `/virtual-list` subpath, but the "no themed counterpart at all" framing
  overstated the gap. Fixed both to describe the real (narrower) situation.
- `/docs/integrations` (`editor-integration`) — claimed the Monaco wrapper
  "keeps the host div sized." No resize/sizing logic exists anywhere in
  `askr-monaco/src/components/monaco-editor/monaco-editor.tsx`. Fixed to
  say sizing is the caller's responsibility.
- `usage-guide.ts` Monaco Editor example — passed an `onChange` prop that
  doesn't exist on `MonacoEditorProps` (`askr-monaco/src/components/monaco-editor/monaco-editor.types.ts`
  only has `onMount`/`onUnmount`). This example would not compile. Fixed to
  use the real pattern: `onMount` + `editor.onDidChangeModelContent()`.

**Update — second pass, all of the below are now fixed too.** Every item
that was listed here as "identified but not yet fixed" in the first pass
has since been verified against source and corrected:

- `/docs/components/interaction-policies` — `edge-cases` wrongly claimed
  Input/Textarea/Label ship no `_A11Y_CONTRACT` (all three do — confirmed
  `askr-ui/src/components/{input,textarea,label}/*.a11y.ts`); `state-model`
  conflated `DISABLED_ATTRIBUTES.asChild` (just the string `'aria-disabled'`,
  confirmed in `button.a11y.ts`) with a bundled `tabindex="-1"` that's
  actually separate component behavior. Fixed both.
- `/docs/components/portals-and-layers` — wrong `--ak-z-dropdown` value
  (claimed 1000; real token in `askr-themes/src/themes/default/tokens.css`
  is 1500, tied with `--ak-z-popover`). Fixed the whole z-index ladder to
  match source exactly.
- `/docs/components/aria-and-ref-utilities` — `asChild` ref claimed typed as
  `Ref<unknown>`; verified `button.types.ts` types it `Ref<Element>`. Fixed
  in both the `api` and `edge-cases` headings.
- `/docs/components/textarea` — claimed `asChild` on a non-`<textarea>` host
  silently drops props "as with Input"; verified `textarea.tsx` actually
  throws `Textarea \`asChild\` requires a native <textarea> host.` — a real
  behavioral difference from Input (which has no such guard). Fixed.
- `/docs/components/switch` — verified `switch.tsx`: the hidden `<input>`
  renders unconditionally off `name` regardless of `asChild` (not removed by
  it as claimed), `aria-disabled` comes from the same `pressable()` call on
  both branches (not something you wire yourself for `asChild`), and the
  thumb is a `::after` pseudo-element with no `data-slot` of its own (not a
  separately targetable node as claimed). Also pointed `FieldLabel` at the
  `@askrjs/themes/components` barrel, since `@askrjs/themes/field` doesn't
  export it (confirmed against `field.ts`/`catalog.tsx`). Fixed all four.
- `/docs/components/select`, `/docs/components/slider` — confirmed both
  `select.ts`/`slider.ts` are JS-only re-exports (no CSS in the subpath).
  Select's claimed `data-side`/`data-align` styling hooks don't exist in the
  real CSS (`select.css`); actual attributes are `data-placeholder` (on
  `SelectValue`) and `data-size` (on `SelectTrigger`, values `sm`/`md`/`lg`
  — `md` has no dedicated rule since it's the unstyled default). Fixed.
  Slider: fixed the registry-key claim (`WeakMap` on an identity object, not
  a string `sliderId`, confirmed in `slider.tsx`) and the clamp/snap order
  (source snaps first, then clamps — the reverse of what was documented,
  confirmed in `_internal/range.ts`).
- `/docs/components/toggle-family` — clarified there's no dedicated
  `toggle.css` (only `toggle-group.css` exists; both JS subpaths are
  confirmed real, just sharing one stylesheet).
- `/docs/components/form-label-field-and-input-group` — `Field`'s `invalid`
  prop does set a real `data-invalid` attribute (confirmed in
  `field.tsx`), but `field.css` has zero rules keyed to it — fixed to say
  the hook exists but ships no default visual treatment. Also added that
  `FieldError` renders with `role="alert"` (confirmed in `field.tsx`),
  which the page had called "purely presentational."
- `/docs/components/dialog` — fixed the surface token (`--ak-color-bg`
  claimed; real token in `dialog.css` is `--ak-color-surface-raised`) and
  the animation-duration claim (open/close aren't symmetric: `normal` vs.
  `fast`, confirmed in `dialog.css`).
- `/docs/components/alert-dialog` — fixed four related overclaims, all
  checked against `askr-ui/src/components/alert-dialog/*.tsx` and the
  7-line real `alert-dialog.css`: `role="alertdialog"` is not applied
  automatically (defaults to Dialog's own role); the trigger and content
  aren't bare re-exports (both wrap real dismissal-guarding logic, verified
  in `alert-dialog-trigger.tsx`/`alert-dialog-content.tsx`); the theme layer
  doesn't style an "action row" or apply a destructive button variant
  automatically — the real CSS only strengthens the content's border.
- `/docs/components/popover` — fixed the focus-trap claim (`FocusScope` is
  used without `trapped`, confirmed default `trapped = false` in
  `focus-scope.tsx` and the actual call site) and the z-index claim (tied
  with dropdown at 1500, above modal at 1400 — not "below modals").
- `/docs/components/tooltip` — fixed `data-disabled` attribution (it's set
  on `TooltipTrigger`, not `TooltipContent`, confirmed in
  `tooltip-trigger.tsx`) and removed a claimed CSS fallback value for
  `--ak-z-tooltip` that doesn't exist in the real stylesheet.
- `/docs/components/hover-card` — rewrote two headings after finding real
  Tab/Escape/focus-on-open support in `hover-card-trigger.tsx` and
  `hover-card-content.tsx` (Tab from the trigger moves into the content,
  Escape returns focus, Tab cycling is handled) — the page's flat "keyboard
  users can't reach the content" was wrong; what's actually missing is only
  a hard focus trap.
- `/docs/components/tabs` — fixed the `role="tab"` claim (verified
  `TabsTrigger` is built on `buttonPart()`, whose third argument is a CSS
  class name, not a role — no role is set) and the "fully manual active
  state" claim (`Tab`'s active styling is computed automatically from the
  current route via the same `isActiveNavLink` machinery the rest of the
  nav components use, confirmed in `nav.tsx`).
- `/docs/components/navbar-and-navigation-menu` — fixed the `as`-on-trigger
  claim (`NavigationMenuTrigger` is built on the same `buttonPart()` helper,
  which explicitly discards `as` — `void as;` in `catalog.tsx`) and the
  "collapse menu uses Dropdown" claim (the mobile hamburger collapse is
  built on `Collapsible`/`CollapsibleTrigger`; `Dropdown` is used for a
  separate per-item flyout, confirmed in `navbar.tsx`).
- `/docs/components/sidebar` — fixed the "every part accepts `as`" claim;
  confirmed `SidebarProps` and `SidebarButtonProps` (used by
  `SidebarMenuButton`/`SidebarMenuAction`/`SidebarTrigger`/`SidebarRail`)
  both omit `as` in `sidebar.types.ts`, while only the plain layout parts
  take it.
- `/docs/components/scroll-area` — the biggest single correction in this
  pass. Read the full `scroll-area.tsx`: `ScrollAreaScrollbar` renders with
  `role="scrollbar"`, `aria-valuenow`/`aria-valuemin`/`aria-valuemax` kept
  live via a `ResizeObserver` and scroll listener, and its own `onKeyDown`
  handling Arrow/PageUp/PageDown/Home/End that calls back into the real
  `scrollTop`/`scrollLeft`. Four headings (`edge-cases`,
  `keyboard-and-accessibility`, `state-model`, `styling-and-tokens`) had
  described this as `aria-hidden`, unwired, and "a static visual accent" —
  rewrote all four to describe the real, working custom scrollbar.
- `/docs/components/card` — added the missing `titleAs` prop (confirmed in
  `card.tsx`/`card.types.ts`: `CardTitle` defaults to `h3` but accepts
  `titleAs?: 'h1'-'h6'`) across three headings that had said it "always
  renders as h3." Also fixed a token-family mix-up: confirmed in
  `catalog.css` that Card's internal spacing reads `--ak-space-*`, not a
  `--ak-density-*` family (which does exist, but is scoped to form-control
  sizing per `tokens.css` — not what Card uses).
- `/docs/components/avatar-and-item` — same `--ak-density-*`/`--ak-space-*`
  correction for `Item`'s `size`/`variant` styling, confirmed against the
  real `[data-slot="item"]` rules in `catalog.css`.
- `/docs/components/typography-and-display-primitives` — fixed a
  fabricated `--ak-type-*` token family (real tokens are `--ak-font-size-*`)
  and the `TypographyMuted` color token name (`--ak-color-text-subtle`, not
  "muted-foreground" — confirmed in `catalog.css`).
- `/docs/components/alert-badge-empty-skeleton-spinner-and-stat` — the page
  was conflating two separate real components: `Empty` (the compound
  `EmptyHeader`/`EmptyMedia`/`EmptyTitle`/`EmptyDescription`/`EmptyContent`
  family, confirmed in `catalog.tsx`) and `EmptyState` (a separate,
  single all-in-one component in its own `empty-state/` directory with
  `icon`/`title`/`titleAs`/`description`/`action` props). Rewrote `anatomy`
  and `api` to name both correctly instead of using the names
  interchangeably.
- `/docs/charts/channels-and-transforms` (`row-lineage`) — confirmed in
  `askr-charts/src/transforms.ts` (`applyRowTransforms`) that a fresh,
  frozen array is allocated as soon as any transform is configured at all,
  even a no-op one — not only "when they change something" as claimed.
  Fixed.
- `/docs/charts/interactions` (`zoom`) — confirmed in
  `askr-charts/src/controller.ts` that plain arrow keys move mark focus,
  and panning requires `Shift`+arrow specifically (`event.shiftKey &&
zoom?.pan`) — the page claimed plain arrows pan. Fixed, and cross-checked
  against the page's own `crosshair` heading, which was already correct
  about arrow keys driving inspection focus.
- `/docs/charts/accessibility-and-ssr` (`ssr-output`) — confirmed in
  `controller.ts` (`requireCanvas(host, "plot-canvas-chrome" |
"-marks" | "-overlay")`) that hydration mounts three canvases (chrome,
  marks, overlay), not the two the page described. Fixed.

None of these needed a `status` downgrade — they're wrong details on real,
shipped things, not missing capability. Combined with the earlier pass,
every item flagged by the six original audit agents has now been either
fixed or explicitly reasoned through and left as-is with a stated reason
(see "Unverified," below, for the small remainder that's genuinely open).

**Unrelated finding during this pass:** one of the six original read-only
audit agents ignored its "do NOT edit any files" instruction and created a
top-level `AGENTS.md` file in this repo. It wasn't part of any requested
deliverable, so I deleted it rather than let it ship as an unreviewed
side effect.

## Unverified

- `/docs/server/probes` (`readiness`) — the readyz/startupz semantic split
  is presented as app-author convention, which the source supports
  (`askr-server/src/dispatch.ts` dispatches all four probes identically) —
  I judged the existing wording already frames this correctly and made no
  change, but flagging that the underlying claim rests on absence-of-enforcement
  rather than a positive guarantee.
- `/docs/guides/build-an-mcp-server` — "signal cancellation actually aborts
  the underlying work" was not traced to individual tool-dispatch code;
  plausible but not directly confirmed.
- A handful of "middleware executes outward in declaration order"-style
  claims in `/docs/http-contracts/client-middleware` and
  `/docs/guides/api-integration-and-error-handling` — the composition
  function itself wasn't traced line-by-line; the behavior is standard for
  this kind of middleware array and consistent with how it's used elsewhere,
  but I'm not marking it independently confirmed.

## Verification of the edits themselves

- `npx tsc --noEmit` — clean after both passes (found and fixed two
  string-escaping syntax errors during the first pass, and one dropped
  object key — an `api:` prefix accidentally deleted during an edit —
  during the second; all three resolved and reverified clean).
- `npx vitest run tests/docs-catalog.test.ts tests/package-snapshot-contract.test.ts tests/llm-docs.test.ts`
  — all pass, reverified after the second pass too.
- `npm run lint` — clean, both passes.
- Full `vitest run` has one expected failure in
  `tests/generated-output-contract.test.ts`, which diffs the _built_
  `dist/llms-full.txt` against current source — that's comparing against a
  stale pre-edit build artifact, not a regression; it will pass again after
  the next `npm run build`. I did not run a full production build as part
  of this pass since the instruction was to leave everything uncommitted
  for review, not to publish.
