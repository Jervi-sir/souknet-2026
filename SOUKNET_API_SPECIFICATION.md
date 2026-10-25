# Souknet API Endpoints Specification

This document defines all backend API routes required to power the **Inertia Dashboard**, **Storefronts**, and any external clients (TanStack, mobile apps, integrations).

All endpoints follow the **Predictable Controller Responses** standard:
- Return explicit JSON structures directly visible in controllers.
- IDs formatted as strings.
- Statuses and codes lowercase snake_case.
- Dates in ISO-8601 (`toIso8601String()`).

---

## 1. Catalogs & Geography (Algerian Administrative Data)
Used for cascading geographic selectors (`Wilaya` ➔ `Commune` ➔ `Stopdesk`) across checkout forms and dashboards.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/catalogs/wilayas` | List all 58 wilayas with code, Arabic and French names |
| `GET` | `/api/v1/catalogs/wilayas/{wilaya}/communes` | List communes/baladiyas belonging to a specific wilaya |
| `GET` | `/api/v1/catalogs/categories` | Global category taxonomy tree (parent & subcategories) |

---

## 2. Organization & Team Management
Tenant profile, business details, team memberships, and permissions.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/organization` | Get current organization profile & active subscription |
| `PUT` | `/api/v1/organization` | Update business name, phone, legal tax number (NIF/RC) |
| `GET` | `/api/v1/organization/members` | List organization team members and roles |
| `POST` | `/api/v1/organization/members/invite` | Invite a member (`admin`, `manager`, `member`) |
| `DELETE` | `/api/v1/organization/members/{member}` | Revoke or remove a team member |

---

## 3. Stores & Settings
Storefront instances, branding, custom domains, and marketing pixels.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/stores` | List all stores belonging to the organization |
| `POST` | `/api/v1/stores` | Create a new store (`name`, `slug`, `currency`) |
| `GET` | `/api/v1/stores/{store}` | Get single store details with theme & checkout configs |
| `PUT` | `/api/v1/stores/{store}` | Update general settings, logo, WhatsApp number |
| `PUT` | `/api/v1/stores/{store}/theme` | Update theme settings (primary color, banner, fonts) |
| `PUT` | `/api/v1/stores/{store}/pixels` | Update tracking pixels (Meta Pixel, TikTok, GTM) |

---

## 4. Courier & Delivery Accounts (`store_delivery_accounts`)
Carrier credentials (Yalidine, ZR Express, EcoTrack, Noest, etc.) and per-wilaya shipping pricing matrices.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/delivery-providers` | Available system providers (`yalidine`, `zr_express`, etc.) |
| `GET` | `/api/v1/stores/{store}/delivery-accounts` | List configured courier accounts for a store |
| `POST` | `/api/v1/stores/{store}/delivery-accounts` | Connect account credentials (API key, token) |
| `PUT` | `/api/v1/stores/{store}/delivery-accounts/{account}` | Update credentials or toggle active/default |
| `DELETE` | `/api/v1/stores/{store}/delivery-accounts/{account}` | Disconnect/delete a courier account |
| `GET` | `/api/v1/delivery-accounts/{account}/fees` | Get wilaya pricing table (home fee & stopdesk fee) |
| `PUT` | `/api/v1/delivery-accounts/{account}/fees` | Bulk update shipping fees per wilaya |
| `GET` | `/api/v1/delivery/stopdesks` | Search stopdesk pickup hubs by provider & wilaya |

---

## 5. Products, Variants & Collections
Product catalog, pricing, options, variants, and media.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/stores/{store}/products` | Paginated product list with search, status & stock filters |
| `POST` | `/api/v1/stores/{store}/products` | Create a product (`name`, `slug`, `base_price`, `stock`) |
| `GET` | `/api/v1/products/{product}` | Get full product with media, options & variants |
| `PUT` | `/api/v1/products/{product}` | Update product information, price, and status |
| `DELETE` | `/api/v1/products/{product}` | Archive or delete product |
| `POST` | `/api/v1/products/{product}/media` | Upload product images/videos |
| `PUT` | `/api/v1/products/{product}/variants` | Bulk sync variants (SKU, title, price overrides, stock) |
| `GET` | `/api/v1/stores/{store}/collections` | List store collections |
| `POST` | `/api/v1/stores/{store}/collections` | Create collection and attach products |

---

## 6. Orders & Checkout (Core COD Engine)
Customer orders, confirmation, status workflows, and timeline auditing.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/stores/{store}/orders` | Paginated orders with filtering by status, logistic status, date |
| `POST` | `/api/v1/stores/{store}/orders` | Create an order (from storefront checkout or manual admin input) |
| `GET` | `/api/v1/orders/{order}` | Detailed order view (items, timeline, customer contact) |
| `PATCH` | `/api/v1/orders/{order}/status` | Update business status (`pending`, `confirmed`, `cancelled`, etc.) |
| `PATCH` | `/api/v1/orders/{order}/logistic-status` | Update logistics status (`prepared`, `in_transit`, `delivered`) |
| `GET` | `/api/v1/orders/{order}/timeline` | Audit history of all status changes, notes, and call attempts |
| `POST` | `/api/v1/orders/{order}/notes` | Add call center memo or customer note to the order timeline |

---

## 7. Call Center & Confirmation Desk (`agents`)
Call desk workflow, agent assignments, and attempt tracking.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/agents` | List call center agents with stats (calls handled, confirmed) |
| `POST` | `/api/v1/agents` | Register an agent linked to a user account |
| `PATCH` | `/api/v1/agents/{agent}/status` | Toggle agent status (`active`, `on_call`, `paused`, `offline`) |
| `GET` | `/api/v1/call-center/queue` | Next orders queue awaiting confirmation for the logged-in agent |
| `POST` | `/api/v1/orders/{order}/call-attempt` | Log call attempt with outcome (`confirmed`, `unreachable_1`, `busy`, etc.) |
| `POST` | `/api/v1/orders/{order}/assign-agent` | Assign or reassign order to a specific agent |

---

## 8. Shipments & Courier Parcel Dispatch
Generating waybills, tracking, and courier API sync.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/orders/{order}/ship` | Dispatch order to carrier API (creates `Shipment` & tracking number) |
| `GET` | `/api/v1/shipments/{shipment}/label` | Get printable PDF delivery sticker / bordereau |
| `POST` | `/api/v1/shipments/bulk-print` | Bulk generate shipping labels for multiple orders |
| `GET` | `/api/v1/shipments/{shipment}/track` | Real-time tracking event status from courier API |

---

## 9. Analytics & Audit (Matching Dashboard)
Powers dashboards such as `audit-order-tentatives`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/analytics/overview` | High-level KPIs (Total orders, revenue, delivery rate) |
| `GET` | `/api/v1/analytics/audit-tentatives` | Stores call-attempt breakdown (`pending`, `attempt1`, `attempt2`, `attempt3`) |
| `GET` | `/api/v1/analytics/stores/{store}/tentatives` | Detailed order attempt history and problematic orders for drawer |

---

## 10. Billings & Plans
SaaS subscriptions and feature gates.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/plans` | Public plans list (Starter, Pro, Scale, Enterprise) |
| `POST` | `/api/v1/subscriptions/subscribe` | Choose/upgrade organization plan |
| `GET` | `/api/v1/subscriptions/current` | Active subscription details, limits, and renewal dates |
