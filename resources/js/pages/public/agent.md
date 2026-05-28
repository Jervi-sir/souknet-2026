# Public Directory Domain Guidelines

This directory contains component pages for the public-facing directories search and discover tool. These pages are optimized for performance, visual appeal, and responsiveness.

## Domain Overview

* **`home`**: Redesigned dashboard welcome screen containing live stats, search console card widgets, quick category segmentation chips, and premium cards.
* **`directory`**: Master catalogue explorer view allowing general lookup, pagination, and multi-filter criteria options.
* **`search-result`**: Grid/Row listing views supporting advanced filters (featured status, verified identity tags, sorting order).
* **`category`**: Custom listing grids matching specific categories (Automotive, Technology, Health, Services, etc.).
* **`business-profile`**: Profile page showing business logo, banner covers, operating hours tracker, contact methods (address, phone, mail, site, social accounts), and customer reviews.
* **`pricing-plans`**: Highlights product subscription models (Basic, Growth, Premium) with feature compare lists.

## Layout & Styling Conventions

1. **Layout**: Always wrap pages in `<GuestLayout>` imported from `@/layouts/guest-layout`. This layout automatically mounts the dashboard-style navigation sidebar.
2. **Theme**: Standardizes on unified dark mode backgrounds (`bg-[#0A0A0A]`), premium glass cards, HSL/custom theme color accents, and responsive layout structures.
3. **Data Passing**: Components rely on Inertia page props for real-time dataset delivery (`categories`, `businesses`, `stats`, `filters`).
