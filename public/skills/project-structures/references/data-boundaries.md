# Data boundaries

## Contents

- Decide whether layers are needed
- Adapters
- Services
- Server boundaries

## Decide whether layers are needed

Skip services and adapters for a static feature with no external data. Add
them when their distinct ownership is real:

```text
features -> queries and mutations -> services -> adapters
```

## Adapters

An adapter is the raw boundary to something the application does not own: a
generated client, `fetch`, browser storage, an SDK, or another service. It owns
transport calls, cancellation, authentication attachment, response decoding,
and structured transport errors. It does not render UI or own reactive state.

Prefer generated clients and validators when available. A TypeScript cast is
not runtime validation. Pass `AbortSignal` through cancellable operations.

## Services

An application service calls adapters and translates decoded transport values
into application vocabulary. It maps DTO names and shapes, composes transport
operations when necessary, and returns models queries and mutations can use.
It does not own component state, cache identity, or rendering.

Queries and mutations call services, not raw transport adapters. Compose the
[queries and mutations skill](../../queries-and-mutations/SKILL.md) for their
runtime contract.

## Server boundaries

Validate request input and enforce authorization on the server path. Register
typed routes once and generate or check OpenAPI from the same runtime registry.
Browser validation improves experience but never becomes the authority for
access or correctness.
