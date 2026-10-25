---
paths:
  - 'database/migrations/**,app/Models/**'
---

# Models

## Database design preferences
Prefer string columns for classifications and status-like values rather than PHP/database enums; document accepted strings in the related model and validate inputs. For classification/reference values that are not true entity relationships, store a stable string code rather than an integer foreign key. Use conventional relational foreign keys for actual entity relationships.
