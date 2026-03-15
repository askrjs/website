---
title: Installation
summary: Install askr, askr-ui, and askr-themes into your app.
---

## Project Setup

Create a new app with your preferred toolchain and enable ESM output.

Install @askrjs/askr for runtime primitives, @askrjs/askr-ui for headless components, and @askrjs/askr-themes for CSS theme tokens.

Use one package manager across your workspace to keep lockfiles consistent.

## Recommended Baseline

Start with a tiny route graph and one interactive island so rendering and hydration are easy to validate.

Add a CI check that runs typecheck and static generation before merge.
