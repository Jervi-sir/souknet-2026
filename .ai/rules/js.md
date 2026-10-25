---
paths:
  - 'app/Http/Controllers/**,app/Services/**,resources/js/**'
---

# Js

## Keep code reusable and responses explicit
Write clean, reusable code and prefer existing components/patterns. Keep controller responses explicit and predictable so frontend Inertia React pages can define reliable TypeScript types from the visible response shape. Extract reusable services only when behavior is genuinely shared or complex; avoid unnecessary service classes.
