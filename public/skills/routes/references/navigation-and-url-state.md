# Navigation and URL state

## Contents

- Model paths and parameters
- Model search state
- Build destinations
- Navigate accessibly

## Model paths and parameters

Use the installed router's path syntax. Static segments, `{name}` parameters,
single-segment wildcards, and named splats have distinct matching behavior.
Let `route()` infer parameter props from the literal path rather than manually
redeclaring them.

Put state in path parameters when it identifies the resource or hierarchy.
Put shareable view state such as filters, search terms, sorting, and pagination
in the query string. Keep transient interaction state in the owning component.

## Model search state

Attach the installed schema contract to a route's `search` option so parsing
and destination construction share one type. Use `updateRouteQuery` for
query-string changes. Its default replacement behavior is appropriate for
high-frequency controls; choose pushed history only when each change should be
a navigable history entry.

## Build destinations

Keep the typed route reference returned by `route()`. Use `to(routeRef, params,
search?)` to build a destination rather than interpolating application paths by
hand. This preserves parameter, search, and registry base-path handling.

## Navigate accessibly

Use `Link` from `@askrjs/askr/router` for ordinary internal navigation. It
retains native anchor behavior. Use the themed `NavLink` from
`@askrjs/themes/components` when a navigation item also needs automatic active
route styling. Use buttons for actions, not navigation.

Use programmatic `navigate` only when navigation follows application behavior
rather than a link the user can activate directly. Preserve meaningful link
text, `aria-current` where appropriate, and safe `rel` values for new browsing
contexts.
