# Catalogs and formatting

## Contents

- Define the source contract
- Write messages as functions
- Format locale-sensitive values
- Keep catalogs maintainable

## Define the source contract

Create one application-owned service, normally at module scope:

```ts
import { createI18n } from '@askrjs/i18n';

export const i18n = createI18n('en', {
  en: {
    welcome: ({ name }: { name: string }) => `Welcome, ${name}`,
    projectCount: (count: number) => `${count} projects`,
  },
  fr: {
    welcome: ({ name }: { name: string }) => `Bienvenue, ${name}`,
    projectCount: (count: number) => `${count} projets`,
  },
});
```

The source locale's exact keys and argument tuples are required from every
other catalog. Do not use casts or broad record annotations to hide a catalog
mismatch.

## Write messages as functions

Catalog values are ordinary typed functions returning strings. Pass named
objects for messages with several values so call sites remain legible. Keep
markup and components outside the catalog unless the installed return contract
expands beyond strings.

Use `i18n.text(key, ...args)` inside an active scope. Use
`i18n.format(locale, key, ...args)` only when explicitly formatting for a
locale other than the active one, such as a locale preview or generated export.

## Format locale-sensitive values

The package does not parse ICU messages or choose number, date, relative-time,
list, or plural rules. Implement those semantics explicitly with `Intl` inside
catalog functions or application-owned formatting helpers:

```ts
total: (value: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(value),
```

Do not translate by concatenating separately translated fragments around
values; grammar and word order belong to each locale's complete message.

## Keep catalogs maintainable

Organize catalogs by stable product concepts rather than page copy order.
Reuse typed argument shapes where they improve consistency, but do not create a
dynamic untyped message registry. Treat a renamed key or changed argument tuple
as a contract change across every locale.
