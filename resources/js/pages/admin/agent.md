# Admin Domain Guidelines

This directory contains component pages for the site administration console, providing configuration panels for managing listings, users, tiers, and auditing payments.

## Domain Overview

* **`business-management`**: Moderators' center to verify listings, claim pages, toggle featured settings, or flag spam entries.
* **`category-management`**: Configure listing tags, code hooks, hex accents, and icon mappings.
* **`dashboard`**: High-level platform statistics including growth rates, active listing numbers, and user ratios.
* **`payment-history`**: Invoice list logging Stripe transaction IDs, statuses, and periods.
* **`plans`**: Edit business subscription packages and limits.
* **`reviews`**: Review moderation controls to audit text reviews.
* **`user-management`**: List system users, update access permissions, and revoke accounts.
* **`settings`**: Configuration options for system variables.

## Layout & Styling Conventions

1. **Layout**: Always wrap pages in `<AdminLayout>` (or unified `AppShell` components with sidebar variant).
2. **Access Control**: Relies on backend middleware checks. Never expose admin controls to public visitors.
3. **Data Integrity**: Follow standard table list views, with clear actions (Delete, Verify, Edit) wrapped in proper feedback dialogs.
