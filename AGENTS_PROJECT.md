You are an AI coding agent working on a greenfield Laravel + React + Inertia.js
full-stack web application called [PROJECT NAME].

---

## What This Project Is

A business directory and listing platform targeting tech companies and startups.
Businesses can create and manage their public profile. Visitors can browse,
search, filter, and contact businesses. Monetization is via freemium subscription
plans with Stripe.

---

## Tech Stack

- **Backend:** Laravel 13, PHP 8.3
- **Frontend:** React 18 + Inertia.js v2 (no separate API, SSR-optional)
- **Styling:** Tailwind CSS v3 (custom only, no component libraries)
- **Database:** PostgreSQL
- **Auth:** Laravel Breeze (Inertia/React scaffold)
- **Payments:** Laravel Cashier (Stripe)
- **Media:** Spatie Laravel Media Library
- **Permissions:** Spatie Laravel Permission
- **Search:** Laravel Scout + Meilisearch
- **Queue:** Laravel Horizon + Redis (for emails, notifications)
- **Slugs:** cviebrock/eloquent-sluggable

---

## Design System

- Dark-first UI. Background #0A0A0A, surface #111111, border #1F1F1F
- Primary accent: Indigo #6366F1
- Font: Inter, base size 14px (text-sm)
- Tight density — no large padding or whitespace
- Component style: Linear.app + Vercel Dashboard aesthetic
- Tailwind class conventions: prefer utility chains, no @apply except for
  repeated patterns

---

## Roles

Three roles managed via spatie/laravel-permission:

- `visitor` — unauthenticated, read-only access
- `business_owner` — authenticated, manages their own listing
- `admin` — full platform control

---

## Project Structure

- `app/Models/` — Eloquent models
- `app/Http/Controllers/` — split into `Public/`, `Owner/`, `Admin/` namespaces
- `app/Http/Requests/` — Form Request validation classes
- `app/Services/` — business logic (ListingService, SubscriptionService, etc.)
- `resources/js/Pages/` — Inertia pages split into `Public/`, `Owner/`, `Admin/`
- `resources/js/Components/` — shared React components
- `resources/js/Layouts/` — GuestLayout, DashboardLayout, AdminLayout

---

## Key Conventions

- Every Inertia page receives its props typed via a TypeScript interface at the
  top of the file
- Controllers return `Inertia::render()` or `redirect()->back()->with()`
- No API routes — all data flows through Inertia shared props or page props
- All forms use Inertia `useForm()` hook
- All money values stored in cents (integer) in the database
- Timestamps: always use `created_at` / `updated_at`, soft deletes where noted
- Slugs are auto-generated from business name, unique, immutable after first set
- Business status enum: `draft | pending | active | rejected | expired`
- Featured and verified are boolean flags on the Business model

---

## Database Models Overview

User

- id, name, email, password, role
- hasOne: Business
- hasMany: Reviews, Notifications

Business

- id, user_id, category_id, name, slug, description, tagline
- logo, cover_photo (via media library)
- address, city, country, lat, lng
- phone, website, email
- status (enum), is_featured, is_verified
- plan_id, subscription expires_at
- softDeletes
- hasMany: BusinessHours, BusinessPhotos, Reviews, Tags (M2M), ContactLeads

Category

- id, name, slug, icon, color
- hasMany: Businesses

Plan

- id, name, slug, stripe_price_id, price_monthly, price_yearly
- max_photos (int), has_analytics (bool), has_featured (bool)
- hasMany: Businesses

BusinessHours

- id, business_id, day_of_week (0-6), open_time, close_time, is_closed

Review

- id, business_id, user_id, rating (1-5), body
- hasOne: ReviewReply
- softDeletes

ReviewReply

- id, review_id, user_id, body

Tag

- id, name, slug
- belongsToMany: Businesses

ContactLead

- id, business_id, name, email, message, is_read

---

## What You Should Always Do

- Follow PSR-12 for PHP code
- Use TypeScript for all React components and pages
- Always validate on the backend via Form Requests
- Always check role/permission before any action
- Never put business logic in controllers — use Services
- Keep components small and single-purpose
- When adding a new page, register its route, controller method, and Inertia
  page component together
- Run `php artisan ide-helper:generate` after adding models
