# Website TODO

Findings from a full copy, CTA, flow, and structure audit. Ordered by return on
effort. Evidence paths are given so each item can be verified before it is
picked up.

> All audit fixes so far are **uncommitted** working-tree changes on `403c2e9`.
> `npm run check` passes clean.

---

## P0 — Blocking credibility

### 1. Build live component demos

**A UI framework site that never renders a component.** The only import of
`@askrjs/themes/components` anywhere under `src/pages/docs/` is `_layout.tsx`
(the site's own chrome). All 69 component pages describe Dialog, Select,
Combobox, Calendar, Accordion, Slider purely as code blocks.

52 of those pages carry a heading literally called **"Live examples."**

Why it matters: the core claim of `@askrjs/ui` is correct focus order,
dismissal, keyboard behavior, and ARIA. That is precisely the claim that can
only be verified by interacting with it. Every competitor in the category
(Radix, Base UI, shadcn, Chakra) leads with interactive demos because for a
component library the demo _is_ the argument.

The machinery was planned and never built — `ComponentDemoDefinition` exists in
`src/pages/docs/types.ts` with no implementation and no consumer.

- [ ] Implement demo rendering in `src/pages/docs/page.tsx`
- [ ] Build demos for the ~15 components where behavior is the product: Dialog,
      Select, Combobox, Tabs, Accordion, Switch, Calendar, Toast, Popover,
      Tooltip, Menu, Slider, Checkbox, Radio Group, Command
- [ ] Not all 69 — the long tail can stay code-only

### 2. Publish benchmark numbers

Grepped all seven marketing pages for
`benchmark|performance|faster|users|adopt|testimonial|case stud` — **zero
hits.** No logos, no adoption, no production story, no numbers.

`askrjs/js-framework-benchmark` already exists as a fork in the org. Benchmarks
are the one form of hard evidence a pre-adoption framework can produce, and the
only falsifiable claim available. Every current claim ("deterministic,"
"explicit," "readable top to bottom") is architectural assertion.

- [ ] Run the existing benchmark fork and publish results
- [ ] Surface a headline number on `/` or `/platform`

### 3. State the maturity honestly

Packages ship at 0.0.1–0.1.3 (`@askrjs/fetch` 0.0.1, `@askrjs/testing` 0.0.1,
`@askrjs/askr` 0.0.59). Grepped marketing for
`alpha|beta|pre-1.0|early|breaking change|unstable` — **zero hits.**

Meanwhile the voice is finished and total ("Everything a full-stack app needs").
A reader hits that, runs `npm i`, sees `0.0.59`, and discounts everything else
on the page. Per-page `experimental` / `limited` badges already exist in the
docs, so the honesty is present at the leaf and missing at the top.

- [ ] One-sentence maturity statement on `/` and `/docs` — e.g. which surfaces
      are stable vs still moving
- [ ] Add a changelog / release notes section. None exists today; the only
      adjacent pages are `/docs/charts/migration-0-1`,
      `/docs/guides/migration-from-react`, `/docs/reference/compatibility`
- [ ] `askr update` vs `askr upgrade` is documented as a careful distinction
      with nothing to read about what an upgrade actually brings

---

## P1 — Structure

### 4. Break the component-page template

52 of 69 component pages have byte-identical heading skeletons:

```
purpose | install-and-import | live-examples | anatomy | state-model |
keyboard-and-accessibility | styling-and-tokens | api | edge-cases |
related-pages
```

The prose inside is now hand-written (66,447 words across 1,020 heading
bodies), but a reader who opens three component pages sees the same ten
sections in the same order and concludes "generated" before evaluating a
sentence. 328 pages for 0.0.x packages compounds it.

Item 1 largely defuses this on its own — pages stop being interchangeable once
each has something running in it.

- [ ] Let pages differ where the components differ; drop sections that have
      nothing specific to say for a given component

### 5. Rename the "Live examples" heading

Needs a decision, not just work. There are no live examples (see item 1), so
the heading is inaccurate on 52 pages. Renaming re-slugs the `live-examples`
override keys, the anchors, the TOC entries, and the search records.

- [ ] Either build the demos (item 1) and keep the name, or rename to something
      truthful and migrate the 52 override keys in
      `src/pages/docs/content-overrides.ts`

### 6. Homepage shows configuration, not capability

The hero's only visual is a route registry — plumbing. No screenshot, no demo,
nothing depicting an application built with the framework. A full-stack UI
framework whose homepage never shows a UI.

- [ ] Add a visual: demo, screenshot, or embedded running example

### 7. Two-registry boot hack

`src/main.tsx:11` picks between the marketing and docs registries by sniffing
`location.pathname`. This already produced one live bug — `<Link>` to a `/docs`
route from a marketing page client-side navigated into the marketing fallback
and 404'd. Fixed in `components.tsx` via an `isMarketingRoute()` check, but the
underlying split remains.

- [ ] Decide whether the framework should support this cleanly, or whether the
      site should use a single registry

---

## P2 — Open decisions from the audit

- [ ] **CTA convention.** The seven capability pages now use
      _primary = topic-specific docs, secondary = "Create an app"_, deliberately
      not linking the next marketing page since prev/next nav already does that.
      One line per page to change if the tour should continue instead.
- [ ] **`/platform` verb line.** `Build / Compose / Deliver / Operate` is now an
      optional `label` on `SequenceList`, shared with `FlowMap`'s slot. Kept at
      eyebrow weight. Drop if it still reads redundant against the titles.

---

## Tracked upstream (with another agent)

- [ ] [askrjs/askr#74](https://github.com/askrjs/askr/issues/74) — make
      `createRouteRegistry` the only supported way to declare routes; deprecate
      the ambient `registerRoutes` / `getManifest` / `getRoutes` / `clearRoutes`
      registry and resolve the contradicting jsdoc in `dist/boot/index.d.ts`
      (lines 32 and 75 each declare a different thing "preferred")
- [ ] [askrjs/askr-cli#3](https://github.com/askrjs/askr-cli/issues/3) — migrate
      the `spa` starter, the last of five templates still using the ambient
      registry

Site-side docs already teach `createRouteRegistry` as the only path, so no
follow-up here is expected when those land.

**Anomaly worth knowing:** mid-audit, `api-snapshot.ts` regenerated with the
four ambient symbols removed and `RegisterRoutesOptions` renamed to
`RouteRegistryOptions` — i.e. #74 implemented. Re-running the generator later
restored them, and the installed package is still 0.0.59 with all four exports
present. `@askrjs/askr` appears to have been briefly swapped to a build with
#74 applied and then rolled back. The tree is consistent now (snapshot matches
installed 0.0.59, `docs:drift` passes), but worth knowing if that package is
being iterated against this working copy.

---

## Done in this pass

Kept for context; no action needed.

- Routing story reconciled — docs taught the ambient registry as primary while
  the homepage taught `createRouteRegistry`; all seven passages rewritten
- Placeholder prose removed sitewide — the templated "How to use X" block
  (repeated intros on 152 + 69 pages, one step sentence on 264), 172 boilerplate
  meta descriptions, 10 generated heading bodies, and 4 bodies claiming
  interactive demos that do not exist. Zero occurrences remain in `dist/`
- Seven bespoke marketing patterns collapsed into two components
  (`SequenceList`, `FlowMap`); arrows removed; `styles.css` 1,779 → 1,614 lines
- Three `aria-label`s on bare `<div>`s (silently dropped by screen readers) now
  carry `role="group"`
- CTAs added to all seven capability pages; hero CTA repointed at
  `/docs/getting-started` with a real primary/secondary hierarchy
- Six stale `@askrjs/cli@0.0.5` literals now derive from the generated version
  map (published CLI is 0.0.7)
- Generated package table on `/platform` from real `peerDependencies`, with
  `docs:api:check` gating it
- `verify:static` strengthened: the `'How to use'` literal-phrase check that
  filler satisfied now asserts the actual section anchor
