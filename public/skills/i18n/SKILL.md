---
name: i18n
description: Add, change, debug, or review internationalization in an Askr application. Use for @askrjs/i18n, createI18n, typed message catalogs, locale selection, text direction, Intl formatting, locale routes, SSR locale isolation, dehydration, or hydration.
---

# Internationalize an Askr application

Use `@askrjs/i18n` as an application-owned, lexically scoped translation
service. Keep locale policy explicit: the package validates aligned catalogs
and installs locale state, but it does not choose locales, parse ICU messages,
or create process-global state.

## Verify the installed contract

Read the installed `@askrjs/i18n` declarations before designing catalogs or
hydration. The source locale defines the exact message keys and argument tuples
every other locale must implement. Missing, extra, or incompatible messages
are type and runtime contract failures, not fallbacks.

## Select the needed references

- Read [catalogs-and-formatting.md](references/catalogs-and-formatting.md) when
  defining messages, parameters, numbers, dates, currencies, or plural logic.
- Read [locale-ownership.md](references/locale-ownership.md) when resolving a
  locale from routes, hosts, cookies, profiles, or user choice and when
  deciding fallback policy.
- Read [scope-and-hydration.md](references/scope-and-hydration.md) for lexical
  scopes, direction, request isolation, SSR, SSG, dehydration, and hydration.
- Compose the sibling [routes skill](../routes/SKILL.md) when locale is URL
  state, and the sibling [themes skill](../themes/SKILL.md) when direction or
  locale changes layout and visual presentation.

## Verify localized behavior

Exercise every supported locale with representative short, long, missing,
zero, singular, plural, negative, and large values relevant to the product.
Check direction, document language, metadata, navigation, formatting, overflow,
focus order, and server/client parity. Verify concurrent server requests do not
share locale state and hydration does not flash or replace the server locale.
