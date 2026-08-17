---
name: control-flows
description: Build, change, debug, or review reactive control flow in Askr components. Use for Show, Case, Match, For, keyed collections, positional lists, fallbacks, conditional rendering, reactive row state, selector, thunk props, or render-scoped ordering errors.
---

# Build Askr control flow

Use Askr's control primitives when a branch or collection needs explicit
mounting, cleanup, fallback, identity, or reconciliation behavior. Do not
import the control-flow model of another framework.

## Verify the installed contract

Read the installed `@askrjs/askr/control` declarations and the root declaration
for `selector` before using an API. The canonical control subpath exports
`Show`, `Case`, `Match`, and `For`. Treat their render-scoped ordering and row
identity rules as lifecycle contracts, not syntax preferences.

## Select the needed references

- Read [branches.md](references/branches.md) for `Show`, `Case`, `Match`,
  truthy narrowing, fallbacks, and branch lifecycle.
- Read [collections.md](references/collections.md) for `For`, stable keys,
  positional identity, indexes, row reconciliation, `selector`, and thunk
  props.
- Read [render-order.md](references/render-order.md) when nesting controls,
  conditionally calling primitives, diagnosing hook-order errors, or reasoning
  about mounting and cleanup.

These references compose. A conditional keyed list needs all three; a simple
single branch may need only branches and render order.

## Verify behavior

Exercise every reachable branch and fallback. For collections, prove insertion,
removal, reorder, replacement, empty fallback, duplicate-key diagnostics, and
row-local state preservation as applicable. Verify mounting and cleanup rather
than checking markup alone. When SSR or hydration is involved, confirm the
initial branch and item identities agree before and after hydration.
