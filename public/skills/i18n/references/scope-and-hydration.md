# Scope and hydration

## Contents

- Install lexical locale state
- Align language and direction
- Isolate server requests
- Dehydrate and hydrate

## Install lexical locale state

Wrap the owned subtree with the service's `Scope`:

```tsx
<i18n.Scope locale="fr" dir="ltr">
  <Application />
</i18n.Scope>
```

Inside that lexical scope, `i18n.text`, `i18n.locale`, `i18n.direction`, and
`i18n.catalog` read the active selection. Nested scopes may intentionally
select another locale, but avoid accidental mixed-language regions.

## Align language and direction

Supply `dir="ltr"` or `dir="rtl"` according to the locale policy. Keep the
document renderer's `html.lang` and `html.dir`, route metadata, theme direction,
and the i18n scope aligned. Do not infer direction from translated text or use
CSS mirroring as a substitute for correct document semantics.

Audit logical spacing, icon direction, tables, charts, form order, and
navigation in RTL rather than assuming text alignment is the only change.

## Isolate server requests

The service has no process-global active locale; selection is installed through
the scope. Resolve and install locale within each SSR request or SSG entry.
Never store the current request's locale in a mutable module-level variable.

## Dehydrate and hydrate

After installing the server scope, `i18n.dehydrate()` returns an immutable
versioned snapshot containing locale, direction, and selected catalog identity.
Embed that snapshot safely in the rendered document. On the client, install it
with the mutually exclusive hydration form:

```tsx
<i18n.Scope hydration={snapshot}>
  <Application />
</i18n.Scope>
```

Do not pass `locale` or `dir` alongside `hydration`. Verify the server and
client use the same catalog set and that the first hydrated render preserves
text, language, direction, and layout without a flash or mismatch.
