---
title: SSG Overview
summary: Generate static pages deterministically with askr-ssg.
---

## Route Model

Register each static path in ssg.config.ts using RouteConfig entries.

Use props on routes to pass page-level data into reusable view components.

## Build Modes

Use full builds for release branches and incremental builds during rapid iteration.

Keep route keys stable so incremental invalidation remains predictable.
