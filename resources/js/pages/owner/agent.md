# Owner Domain Guidelines

This directory contains React component pages representing the Business Owner console. These components allow registered owners to manage their businesses, collect customer leads, and configure subscriptions.

## Domain Overview

* **[ListingForm.tsx](file:///Users/bekheiragacemlamine/Desktop/souknet/resources/js/pages/owner/ListingForm.tsx)**: The main form interface containing steps/tabs to register or update a business listing (address, description, phone numbers, contact info, gallery photos, operating hours, categories).
* **`dashboard`**: Contains panels displaying metric stats, reviews averages, and quick actions.
* **`leads-management`**: Console for managing inbound business leads, customer messages, and communication threads.
* **`reviews-management`**: Shows reviews posted by users, with capabilities for owners to reply.
* **`subscription-billing`**: Handles tier upgrades, monthly/yearly billing preferences, and features integration (e.g. verified identity tag, photos limits).
* **`settings`**: General business configuration and security details.

## Layout & Styling Conventions

1. **Layout**: Always wrap pages in `<OwnerLayout>` imported from `@/layouts/owner-layout`.
2. **Icons**: Use `lucide-react` icons (e.g., `Building2`, `Mail`, `Star`, `Clock`, `CreditCard`, `Inbox`).
3. **Form Submissions**: Use `@inertiajs/react`'s `useForm` hook for robust form handovers, validation handling, and error rendering.
4. **Design System**: Use Shadcn component library layers (`@/components/ui/...`) and Tailwind v4. Avoid custom CSS/inline utility overlaps.
