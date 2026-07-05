# SoukNet Features & Workflows

Welcome to the comprehensive feature and workflow guide for **SoukNet**, a high-performance business directory, store generator, B2B lead discovery, and marketing automation platform built on Laravel 13, Inertia.js v3, React 19, and TailwindCSS v4.

---

## 🌟 Core System Architecture

SoukNet operates on three primary access levels:
1. **Public Visitors / Buyers**: Search the directory, browse products/stores, contact businesses, and discover B2B leads.
2. **Business / Store Owners**: Manage listings, job posts, customize storefronts, handle inbound leads, configure reviews, and handle subscription billing.
3. **Administrators**: Moderate users, approve upgrades, manage categories, track global settings, moderate reviews, configure pricing plans, and view payment histories.

---

## 🔍 1. Public Visitor Features

### Directory & Storefronts
- **Home / Landing Page**: Search directory, view categories, browse featured businesses, and explore recent products.
- **Unified Search**: Search through companies, people, jobs, and products with filters.
- **Public Directory**: Browse categorized business listings and individual company profiles.
- **Custom Storefronts**: Publicly view customizable e-commerce storefronts under `/store/{slug}` and product detail pages under `/store/{slug}/products/{productSlug}`.

### Lead Generation & B2B Discovery ("Discover")
- **Discover Companies**: Directory of registered businesses with filter and save options.
- **Discover People**: Contact directory for professionals associated with businesses.
- **Discover Jobs**: Job search interface with applications, salaries, and company search.
- **Discover Products**: Grid of products available from multiple merchants.
- **Data Enrichment**: Fetch additional B2B profile metadata for target companies/people.

### B2B Tools & Automations
- **Inbound Forms**: Embedded contact forms for lead generation.
- **Website Visitors Tracker**: Analytics dashboard showing site traffic and referral sources.
- **Engage (Email Campaigner)**: Interface for managing outgoing outreach templates and sequences.
- **Win Deals (CRM Pipeline)**: 
  - **Deals Pipeline**: Visual sales pipeline tracking deal stages.
  - **Conversations**: Customer chat logs and message threads.
  - **Meetings**: Scheduler and meeting log interface.
- **Analytics & Workflows**: Advanced B2B metrics, triggers, and automated logic flows.

### Saved Records & Lists
- **Saved Items**: Save companies, jobs, people, and products individually or in bulk.
- **Bookmarks Manager**: Dedicated tabs under `/saved-records/` to view stored entries.

---

## 💼 2. Business & Store Owner Panel (`/owner`)

### Listing & Profile Management
- **Business Profile Editor**: Customize business details, description, address, categories, hours of operation, and showcase photos.
- **Job Posting Board**: Publish, update, and manage job listings for the business.

### Storefront Customization (`/stores`)
- **Store Builder**: Build custom online storefronts.
- **Visual Customizer**: Custom layout editing and customization settings.
- **Store Inventory Manager**: Upload, update, and categorize store products.

### Lead & Customer Management
- **Inbound Leads Dashboard**: View incoming client inquiries, filter by read/unread, and mark leads as processed.
- **Reviews & Feedback**: Monitor user ratings, write official owner replies, and track review metrics.

### Subscriptions & Billing
- **Stripe Billing Portal**: Integrate with Laravel Cashier/Stripe to choose pricing tiers and view invoices.
- **Upgrade Workflow**: Submit requests to upgrade regular user accounts to "Business" or "Store" owners.

---

## 🛡️ 3. Admin Panel (`/admin`)

### Moderation & User Management
- **Users List**: Search and manage user accounts, update security roles, or delete users.
- **Business Verification**: Review, approve, or reject business registry profiles.

### Content & Categorization
- **Categories Manager**: Create, edit, and reorganize listing categories.
- **Review Moderation**: View all platform-wide user reviews and remove inappropriate content.

### System Settings & Monetization
- **Pricing Plans**: Manage Stripe-linked plans, update pricing amounts, and customize features per tier.
- **Payments Log**: Detailed historical view of transactions and subscriptions.
- **Upgrade Requests Manager**: Review and approve/reject user upgrade applications.
- **Global Settings**: Configure platform name, site branding, dynamic metadata, and email/API keys.

---

## 🔑 4. Authentication & Security

- **Multi-Role Registration**: Register as standard client/user, with path for requesting merchant/business roles.
- **Secure Authentication**: Fortify-backed login, registration, and session security.
- **User Settings & Security**: Update profile pictures, change passwords, and manage personal data.
