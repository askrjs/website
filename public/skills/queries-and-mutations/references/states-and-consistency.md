# Query states and consistency

## Contents

- Render the state contract
- Keep previous data visible
- Model empty data
- Apply consistency and reconciliation

## Render the state contract

Read the discriminated fields directly:

- `loading` means the first request has not produced data; `data` is `null`.
- `fresh` means committed data is current.
- `refreshing` keeps previous data while a confirming fetch runs.
- `pending-write` keeps previous data while a successful write is being
  confirmed.
- `stale` is settled but not current, with reason `inconsistent`, `aborted`, or
  `error`.

Use `refresh()` for explicit retry or user refresh. Concurrent manual refresh
calls coalesce while work is pending.

## Keep previous data visible

A refresh failure can retain the last successful data. Keep that data visible,
explain that it is stale, and offer retry. A first-load failure has
`data === null` and needs a full failure state. An aborted refresh may also
retain stale data and should not be reported as an unexplained server failure.

Treat `pending-write` as saved locally but still syncing. Do not claim remote
confirmation before the subsequent query state supports it.

## Model empty data

Queries reserve `null` for “no successful value yet.” Return an empty array or
an explicit result object for a successful empty response. Render that as a
normal empty state distinct from loading and failure. Do not return `null` or
`undefined` as successful query data.

## Apply consistency and reconciliation

Use `isConsistent(data)` when a fetched value must satisfy an application
invariant such as a minimum version. Use `reconcile(data, { key })` only when
the application has a real, bounded way to restore consistency. It may be
async, and its result is awaited before retry scheduling.

A thrown consistency or reconciliation callback becomes a terminal stale
error. Keep both callbacks deterministic, aligned across readers of the same
key, and free of hidden UI behavior.
