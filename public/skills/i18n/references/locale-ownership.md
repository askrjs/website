# Locale ownership

## Contents

- Resolve locale explicitly
- Decide fallback policy
- Keep locale in navigable state
- Preserve user intent

## Resolve locale explicitly

The application chooses the locale. Resolve it from an explicit source such as
a URL prefix, host, persisted preference, authenticated profile, or accepted
request language. Establish precedence in one composition boundary rather than
letting components guess independently.

Validate the candidate against the catalog locale keys before installing it.
Do not pass an unchecked cookie, header, parameter, or storage string into the
scope.

## Decide fallback policy

`createI18n` does not perform missing-key or locale fallback. Decide what
happens when no supported locale matches: redirect to a default locale, select
the source locale, or return an explicit not-found response according to the
product's URL and indexing policy.

Do not silently mix catalogs. Every supported catalog must satisfy the source
contract.

## Keep locale in navigable state

When locale changes the canonical URL, model it through the route tree and use
typed destinations for locale switching. Preserve the equivalent destination,
parameters, and meaningful search state where possible. Ensure canonical and
alternate metadata reflect the actual localized URLs owned by the application.

When locale is preference-only, keep URL, cookie, profile, and hydration policy
consistent so refresh does not choose a different locale.

## Preserve user intent

Do not repeatedly override an explicit user choice with browser detection.
Changing locale must update visible text, formatting, direction, document
language, and persisted preference as one narratable action. Avoid a selector
that appears to change locale while navigation or server refresh restores the
old value.
