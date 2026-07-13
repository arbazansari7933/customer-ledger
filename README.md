# KGN Collection — Shop Management System

![MERN](https://img.shields.io/badge/Stack-MERN-2ea44f)
![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express%205-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%2B%20Mongoose-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![PWA](https://img.shields.io/badge/PWA-Installable-9146FF)
![QR Billing](https://img.shields.io/badge/Billing-QR%20Based-red)
![Status](https://img.shields.io/badge/Status-In%20Production-success)
![License](https://img.shields.io/badge/License-MIT-blue)

**[🔴 Live Demo](https://customer-ledger-chi.vercel.app/) &nbsp;•&nbsp; [📂 Repository](https://github.com/arbazansari7933/customer-ledger)**

A mobile-first retail shop management system built with the MERN stack for **KGN Collection**, a real clothing retail shop. It replaces handwritten bills and manual stock counting with QR-based product scanning, automatic inventory deduction, customer/wholesaler ledgers with recalculated balances, thermal-style bill printing, and daily sales reporting — all wrapped in an installable PWA that runs like a native app on the shop counter.

This project is actively used in daily operations at the shop it was built for, and demonstrates practical full-stack engineering: JWT authentication with role-based route protection, a QR-driven point-of-sale flow, transactional ledger accounting, PDF/thermal print generation, and a mobile-first PWA shell.

---

## Table of Contents

- [Screenshots](#screenshots)
- [The Problem This Solves](#the-problem-this-solves)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [QR Billing Workflow](#qr-billing-workflow)
- [Billing Workflow](#billing-workflow)
- [Inventory Management](#inventory-management)
- [Customer & Wholesaler Ledger](#customer--wholesaler-ledger)
- [QR Sticker Generation](#qr-sticker-generation)
- [Database Design](#database-design)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Engineering Decisions](#engineering-decisions)
- [Challenges Solved](#challenges-solved)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)
- [Code Review Suggestions](#code-review-suggestions)
- [Author](#author)
- [License](#license)

---

## Screenshots

<p align="center">
  <img src="./screenshots/Ledger.jpeg" width="220" alt="Customer Ledger">
  <img src="./screenshots/Bill1.jpeg" width="220" alt="Billing Screen">
  <img src="./screenshots/Bill2.jpeg" width="220" alt="Bill Items">
</p>
<p align="center">
  <img src="./screenshots/Bill3.jpeg" width="220" alt="Bill Summary">
  <img src="./screenshots/Stock.jpeg" width="220" alt="Stock Page">
  <img src="./screenshots/Report.jpeg" width="220" alt="Sales Report">
</p>

> `[Architecture Diagram]` `[ER Diagram]` `[Sticker Generator]` `[Backup & Restore]` — placeholders for additional screenshots.

---

## The Problem This Solves

Small retail shops like KGN Collection traditionally run on handwritten bills, a calculator, and memory.

**Billing problems:** manual product/price entry, discount mistakes, duplicate line items, slow checkout during rush hours.

**Inventory problems:** stock counts drifting from what's physically on the shelf, no visibility into what sold when the owner isn't at the shop, tedious end-of-day reconciliation.

**Ledger problems:** credit given to regular customers tracked in a notebook, easy to lose or miscalculate, no easy history of who paid what and when.

KGN Collection solves this by making every product scannable, deducting stock automatically the moment a bill is created, and keeping a running, recalculated ledger balance for every customer and wholesaler.

---

## Features

### Authentication
- Email/password registration and login with **bcrypt** password hashing
- **JWT** (7-day expiry) issued on login, sent as a Bearer token
- First registered user automatically becomes `owner`; all subsequent signups default to `employee`
- An `OWNER_SECRET` invite code can be supplied at signup to force-assign the `owner` role
- Global axios interceptor auto-attaches the token to every request and force-redirects to `/login` on a `401`

### QR-Based Billing
- Camera-based QR scanning (live camera **or** image upload) using `html5-qrcode`
- Scan → auto-fill item into the bill cart → audible beep confirmation
- Re-scanning the same product increments quantity instead of adding a duplicate row
- 800ms scan-lock cooldown prevents a single physical scan from firing twice
- Manual entry mode toggle for products without a printed QR sticker

### Inventory Management
- Product creation with category, price, discount %, GST %, and starting quantity
- Adding stock for an existing product (same name + category) increments its stock instead of creating a duplicate
- **Automatic stock deduction** on every bill — stock is checked and decremented per item before the bill is saved
- Bill creation is rejected outright if any scanned/entered item doesn't have enough stock
- Manual stock adjustment endpoint (`+`/`-` change) with a floor at zero
- `lowStockAlert` threshold field on the product schema (default 5)
- Category browser and search-by-name/price on the Stock page

### Customer Ledger
- Auto-created customer record the first time a bill is left with a due amount
- Full transaction history per customer (`give` = credit extended, `receive` = payment collected)
- Balance is **recalculated from the full transaction array** on every edit/delete — never incremented by a delta
- Add / edit / delete individual transactions

### Wholesaler Ledger
- Same data model and recalculation logic as the customer ledger, mirrored for the supply side (money the shop owes wholesalers)

### Billing & POS
- Itemised bill with per-item MRP, discount %, auto-computed final rate and line amount
- Partial payment support — unpaid balance (`due`) is pushed to the customer's ledger automatically
- Bill status is derived (`paid` / `due`) from the due amount
- View, edit, and delete existing bills (edit and delete are `owner`-only)

### Sales Reports
- Pick any date and pull every bill created that day
- Totals for bills count, total sale, total collected, and total due, plus a list of bills still outstanding

### QR Sticker Generator
- Real, functional version lives inside **Add Stock**: after a product is saved, the backend returns a generated QR code (encoding the product's unique code) which is rendered on a 58×40mm sticker layout with shop name, product name, and MRP, and exported as a print-ready PDF via `html2canvas` + `jsPDF`
- A separate **Sticker Generator** page also exists as a standalone/manual layout tool (60×40mm, 1/2/4/6/8-up), but it is **not** wired to the backend and does not embed a real, scannable QR/barcode — see [Code Review Suggestions](#code-review-suggestions)

### Backup & Restore
- One-click JSON export of all collections (`users`, `bills`, `customers`, `wholesalers`, `products`)
- Restore endpoint (`owner`-only) wipes and re-inserts all collections from an uploaded JSON file — used as an offline safety net on free-tier hosting

### PDF & Thermal Bill Printing
- Bill receipt rendered at 80mm width, formatted like a thermal POS printout, exported to PDF via `html2canvas` + `jsPDF`

### Purchase Calculator
- Standalone rate × quantity calculator to estimate a purchase total before buying from a wholesaler (not persisted — client-side only)

### Progressive Web App (PWA)
- `manifest.json` with app icons, standalone display mode, and theme colors — installable to a phone's home screen
- A service worker is registered, but currently only logs installation and does not cache assets or enable offline use (see [Known Limitations](#known-limitations))

### Role-Based Access Control
- Two effective roles: `owner` and `employee` (a `demo` role also exists in the schema but isn't assigned anywhere)
- Route-level `checkRole(["owner"])` middleware protects destructive/financial actions: deleting or editing bills, customers, wholesalers, products, transactions; restoring backups; adjusting stock manually
- Finer-grained, per-record ownership checks (`createdBy` matches the requester) are written in the controllers but currently **commented out** — see [Code Review Suggestions](#code-review-suggestions)

### Settings
- Backup/Restore and account (login/signup) actions are functional
- "Shop Information" and "Bill Preferences" sections are static placeholders (`Edit` / `Configure` buttons with no wired handler) — flagged in-app with a "some features are still under development" notice

---

## Tech Stack

**Languages:** JavaScript (ES Modules, both frontend and backend)

**Frontend:** React 18, React Router v7, Vite, Tailwind CSS 3

**Backend:** Node.js, Express 5

**Database:** MongoDB with Mongoose (ODM)

**Authentication:** JSON Web Tokens (`jsonwebtoken`), `bcryptjs` for password hashing

**QR Technologies:** `html5-qrcode` (camera + image-upload scanning), `qrcode` (server-side QR generation), `qrcode.react` (available as a dependency for client-side QR rendering)

**PDF / Print Generation:** `jspdf`, `html2canvas`

**PWA:** Web App Manifest, custom (minimal) service worker

**Forms & UX:** `react-hook-form`, `framer-motion` (animations), `lucide-react` / `react-icons` (icons)

**File Uploads:** `multer` (used for the backup-restore JSON upload)

**HTTP Client:** `axios` with request/response interceptors

**Dev Tools:** `nodemon` (backend hot reload), ESLint (frontend)

**Hosting / Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

---

## System Architecture

The application is a classic decoupled MERN setup: a Vite-built React SPA calls a stateless Express REST API over HTTPS, secured with JWT bearer tokens, backed by a single MongoDB database with five collections.

```mermaid
flowchart LR
    subgraph Client["React SPA (Vercel)"]
        UI[Pages & Components]
        Axios[Axios instance\n+ JWT interceptor]
        SW[Service Worker\n+ Manifest]
    end

    subgraph Server["Express REST API (Render)"]
        MW1[CORS + JSON parser]
        Auth[authMiddleware\nJWT verify]
        Role[roleMiddleware\nowner-only guard]
        Ctrl[Controllers]
    end

    subgraph DB["MongoDB Atlas"]
        Users[(Users)]
        Products[(Products)]
        Bills[(Bills)]
        Customers[(Customers)]
        Wholesalers[(Wholesalers)]
    end

    UI --> Axios
    Axios -->|Bearer token| MW1
    MW1 --> Auth
    Auth --> Role
    Role --> Ctrl
    Ctrl --> Users
    Ctrl --> Products
    Ctrl --> Bills
    Ctrl --> Customers
    Ctrl --> Wholesalers
    SW -. installs as PWA .- UI
```

**Authentication flow:** Login returns a signed JWT (`id`, `role`) valid for 7 days. The frontend stores it in `localStorage` and an Axios request interceptor attaches it as `Authorization: Bearer <token>` on every call. On the backend, `authMiddleware` verifies the token, loads the user, and attaches it to `req.user`; `roleMiddleware`'s `checkRole([...])` then gates specific routes to the `owner` role.

**Request flow:** every protected route → CORS check (origin must match `CLIENT_URI`) → JWT verification → optional role check → controller → Mongoose model → MongoDB.

---

## QR Billing Workflow

```mermaid
sequenceDiagram
    participant Owner
    participant App as React App
    participant API as Express API
    participant DB as MongoDB

    Owner->>App: Add Stock (name, price, qty, ...)
    App->>API: POST /api/products
    API->>DB: create/update Product + productCode
    API-->>App: product + QR (base64 data URL)
    App-->>Owner: Sticker preview (PDF export)
    Note over Owner: Sticker printed & stuck on product

    participant Employee
    Employee->>App: Open Add Bill → Scan mode
    App->>App: Camera reads QR (html5-qrcode)
    App->>API: GET /api/products/:code
    API->>DB: findOne({ productCode })
    API-->>App: product details
    App-->>Employee: Item added to cart + beep

    Employee->>App: Create Bill
    App->>API: POST /api/bills
    API->>DB: validate stock, decrement Product.stock
    API->>DB: create Bill
    API->>DB: push ledger transaction (if due > 0)
    API-->>App: bill created
```

---

## Billing Workflow

```mermaid
flowchart TD
    A[Items added: scan or manual] --> B[Calculate finalRate = mrp - mrp*discount/100]
    B --> C[Calculate amount = finalRate * qty]
    C --> D[Sum items into total]
    D --> E[due = total - paid]
    E --> F{items have productId?}
    F -->|Yes| G[Find Product, check stock >= qty]
    G -->|Insufficient| H[Reject entire bill - 400]
    G -->|OK| I[Deduct product.stock, save]
    F -->|No manual item| J[Skip stock check]
    I --> K[Create Bill document]
    J --> K
    K --> L{status = due > 0 ?}
    L -->|due| M[Find or create Customer by phone]
    M --> N[Push give-transaction, balance -= due]
    L -->|paid| O[No ledger update]
    N --> P[Return created bill]
    O --> P
```

Key points, matching the actual controller logic:

- **Product validation** — for items carrying a `productId` (i.e. scanned items), the product must exist or the whole bill is rejected.
- **Stock validation** — happens *before* the bill document is created; the first understocked item aborts bill creation with a `400`.
- **Manual items** (no `productId`) skip stock checks entirely — the shop can still bill for products that were never added to inventory.
- **Discount handling** — a flat percentage per line item, applied before quantity.
- **Customer lookup / auto-creation** — only triggered when the bill has a `due > 0`; a brand-new customer is created with a negative balance if none exists for that phone number.

---

## Inventory Management

- **Product creation:** `POST /api/products` either creates a new `Product` with a generated `productCode` (`"PRD" + Date.now()`), or, if a product with the same `name` + `category` already exists, adds the incoming quantity to its existing stock and refreshes price/discount/GST.
- **Stock deduction:** happens exclusively inside `createBill`, item by item, only for items that carry a `productId`.
- **Manual stock adjustment:** `PATCH /api/products/:id/stock` accepts a signed `change` value and blocks any update that would push stock below zero.
- **Low stock:** the schema stores a per-product `lowStockAlert` threshold (default `5`), but no endpoint or UI currently surfaces a "low stock" list or alert — the field is defined but not yet consumed.

---

## Customer & Wholesaler Ledger

Both ledgers share an identical shape: a parent document (`Customer` / `Wholesaler`) with an embedded array of `transaction` sub-documents (`amount`, `type: "give" | "receive"`, `date`, `note`, `createdBy`), plus a `balance` field.

```mermaid
erDiagram
    CUSTOMER ||--o{ TRANSACTION : has
    WHOLESALER ||--o{ TRANSACTION : has
    CUSTOMER {
        string name
        string phone
        string address
        number balance
    }
    WHOLESALER {
        string name
        string phone
        string address
        number balance
    }
    TRANSACTION {
        number amount
        string type
        date date
        string note
        objectId createdBy
    }
```

**Direction of `give` / `receive` is intentionally opposite between the two ledgers**, because they represent opposite sides of money owed:

- **Customer:** `give` = shop extends credit to the customer → balance **decreases** (shop is owed money). `receive` = customer pays → balance **increases**.
- **Wholesaler:** `give` = shop pays the wholesaler → balance **increases** (less owed). `receive` = wholesaler extends credit / shop owes more → balance **decreases**.

**Editing and deleting transactions:** both operations locate the transaction sub-document by `_id`, mutate or remove it, and then run:

```js
customer.balance = customer.transaction.reduce((total, t) => {
  return t.type === "give" ? total - t.amount : total + t.amount;
}, 0);
```

**Why recalculate instead of increment:** if the balance were updated with `balance += / -= amount` on every edit, any missed edge case (a failed request retried, an edit applied twice, a race between two requests) would leave the stored balance silently wrong with no way to detect it. Recalculating from the full transaction history on every write makes the balance a pure, always-correct function of the ledger — it can never drift.

---

## QR Sticker Generation

The functional sticker/QR pipeline lives in **Add Stock → Stock page**:

1. Owner submits name, category, price, discount, GST, and quantity.
2. Backend either updates an existing product's stock or creates a new one with a unique `productCode` (`"PRD" + timestamp`).
3. `generateQR()` (a thin wrapper around the `qrcode` package) encodes the `productCode` into a base64 PNG data URL and returns it alongside the product.
4. The frontend renders a 58mm × 40mm sticker preview (shop name, product name, MRP, and the real QR image).
5. `html2canvas` rasterizes that preview and `jsPDF` exports it as a print-ready PDF sized to the sticker, ready to send to a thermal/label printer.

A second page, **Sticker Generator**, offers a similar layout (product, design, computed MRP, 1–8-up printing) but is a client-only utility: it does not call the backend, has no `productCode`, and renders a randomized bar pattern rather than a real barcode/QR — it cannot be scanned at billing time. See [Code Review Suggestions](#code-review-suggestions).

---

## Database Design

Five Mongoose collections, all in a single MongoDB database.

```mermaid
erDiagram
    USER ||--o{ BILL : creates
    USER ||--o{ CUSTOMER : creates
    USER ||--o{ WHOLESALER : creates
    USER {
        string name
        string email UK
        string password
        string role
    }
    PRODUCT {
        string name
        string productCode UK
        number price
        number gst
        number stock
        string category
        number discount
        number lowStockAlert
    }
    BILL {
        string name
        string phone
        string address
        date date
        objectId createdBy FK
        array items
        number total
        number paid
        number due
        string status
    }
    CUSTOMER {
        string name
        string phone
        string address
        number balance
        array transaction
        objectId createdBy FK
    }
    WHOLESALER {
        string name
        string phone
        string address
        number balance
        array transaction
        objectId createdBy FK
    }
    BILL }o--o{ PRODUCT : "references (best effort)"
```

- **User** — `name`, `email` (unique), hashed `password`, `role` (`owner` | `employee` | `demo`, defaults to `employee`).
- **Product** — `name`, unique `productCode` (QR payload), `price`, `gst`, `stock`, `category`, `discount`, `lowStockAlert`.
- **Bill** — customer snapshot (`name`, `phone`, `address` at time of billing), embedded `items[]` (each with `itemName`, `qty`, `mrp`, `discount`, `finalRate`, `amount`), `total`, `paid`, `due`, derived `status`, and `createdBy` (the employee/owner who created it).
- **Customer** — running `balance` plus an embedded `transaction[]` ledger array; auto-created from bills with a due amount, or manually via "Add Customer."
- **Wholesaler** — identical shape to `Customer`, for the supply side.

**Relationships:** `Bill`, `Customer`, and `Wholesaler` each reference the `User` who created them via `createdBy`. `Bill.items` are intended to reference `Product` by `productId`, but that field is not currently part of the persisted `Bill` item schema — see [Code Review Suggestions](#code-review-suggestions).

---

## API Documentation

All routes are prefixed with `/api`. 🔒 = requires a valid JWT (`authMiddleware`). 👑 = additionally requires the `owner` role (`checkRole(["owner"])`).

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description | Body | Success Response |
|---|---|---|---|---|---|
| POST | `/register` | Public | Create a user; first user ever becomes `owner`, others default to `employee` (or `owner` if `inviteCode` matches `OWNER_SECRET`) | `{ name, email, password, inviteCode? }` | `201` `{ message, roleAssigned, userId }` |
| POST | `/login` | Public | Authenticate and receive a JWT | `{ email, password }` | `200` `{ message, token, user }` |

### Products — `/api/products`

| Method | Endpoint | Auth | Description | Body / Params | Success Response |
|---|---|---|---|---|---|
| GET | `/categories` | 🔒 | Distinct list of product categories | — | `200` `[categories]` |
| GET | `/categories/:name` | 🔒 | All products in a category | `name` (path) | `200` `[products]` |
| GET | `/` | 🔒 | All products, newest first | — | `200` `[products]` |
| GET | `/id/:id` | 🔒 | Single product by Mongo `_id` | `id` (path) | `200` product / `404` |
| GET | `/:code` | 🔒 | Single product by `productCode` (used by the POS scanner) | `code` (path) | `200` `{ success, product }` / `404` |
| POST | `/` | 🔒 | Add stock — creates a product or tops up an existing one, returns a generated QR | `{ name, category, price, gst?, discount?, quantity }` | `200` `{ success, product, qr, quantity }` |
| DELETE | `/:id` | 🔒👑 | Delete a product | `id` (path) | `200` `{ success, message }` |
| PATCH | `/:id/stock` | 🔒👑 | Manually adjust stock by a signed amount | `{ change }` | `200` `{ success, product }` / `400` if it would go negative |

### Bills — `/api/bills`

| Method | Endpoint | Auth | Description | Body / Params | Success Response |
|---|---|---|---|---|---|
| POST | `/` | 🔒 | Create a bill — validates stock, deducts it, creates the bill, updates the customer's ledger if there's a due amount | `{ name, phone, address, items[], paid? }` | `201` `{ message, bill }` |
| GET | `/` | 🔒 | All bills, newest first | — | `200` `{ message, bills }` |
| GET | `/:billId` | 🔒 | Single bill by id | `billId` (path) | `200` `{ message, bill }` / `400` |
| PUT | `/:id` | 🔒👑 | Overwrite a bill's fields (name, phone, address, items, total, paid, due) and re-derive status | `{ name, phone, address, items, total, paid, due }` | `200` `{ message, bill }` |
| DELETE | `/:billId` | 🔒👑 | Delete a bill | `billId` (path) | `200` `{ message, bill }` |

### Customers — `/api/customers`

| Method | Endpoint | Auth | Description | Body / Params | Success Response |
|---|---|---|---|---|---|
| POST | `/` | 🔒 | Add a customer | `{ name, phone, address }` | `201` `{ message, customer }` |
| GET | `/` | 🔒 | All customers, newest first | — | `200` `{ message, customers }` |
| GET | `/:customerId` | 🔒 | Single customer | `customerId` (path) | `200` `{ message, customer }` |
| PUT | `/:customerId` | 🔒👑 | Edit name/phone/address | `{ name, phone, address }` | `200` `{ message, updatedCustomer }` |
| DELETE | `/:customerId` | 🔒👑 | Delete a customer | `customerId` (path) | `200` `{ message, customer }` |
| POST | `/:customerId/transactions` | 🔒👑 | Add a ledger transaction, updates balance | `{ amount, type, note }` | `200` `{ message, customer }` |
| GET | `/:customerId/transactions/:transactionId` | 🔒 | Single transaction | path params | `200` `{ message, transaction }` |
| PUT | `/:customerId/transactions/:transactionId` | 🔒👑 | Edit a transaction, recalculates balance | `{ amount, type, note }` | `200` `{ message, customer }` |
| DELETE | `/:customerId/transactions/:transactionId` | 🔒👑 | Delete a transaction, recalculates balance | path params | `200` `{ message, customer }` |

### Wholesalers — `/api/wholesalers`

| Method | Endpoint | Auth | Description | Body / Params | Success Response |
|---|---|---|---|---|---|
| POST | `/` | 🔒 | Add a wholesaler | `{ name, phone, address }` | `201` `{ message, wholesaler }` |
| GET | `/` | 🔒 | All wholesalers, newest first | — | `200` `{ message, wholesalers }` |
| GET | `/:wholesalerId` | 🔒 | Single wholesaler | `wholesalerId` (path) | `200` `{ message, wholesaler }` |
| PUT | `/:wholesalerId` | 🔒👑 | Edit name/phone/address | `{ name, phone, address }` | `200` `{ message, updatedwholesaler }` |
| DELETE | `/:wholesalerId` | 🔒👑 | Delete a wholesaler | `wholesalerId` (path) | `200` `{ message, wholesaler }` |
| POST | `/:wholesalerId/transactions` | 🔒👑 | Add a ledger transaction (inverted give/receive logic vs. customer) | `{ amount, type, note }` | `200` `{ message, wholesaler }` |
| GET | `/:wholesalerId/transactions/:transactionId` | 🔒 | Single transaction | path params | `200` `{ message, transaction }` |
| PUT | `/:wholesalerId/transactions/:transactionId` | 🔒👑 | Edit a transaction, recalculates balance | `{ amount, type, note }` | `200` `{ message, wholesaler }` |
| DELETE | `/:wholesalerId/transactions/:transactionId` | 🔒👑 | Delete a transaction, recalculates balance | path params | `200` `{ message, wholesaler }` |

### Reports — `/api/reports`

| Method | Endpoint | Auth | Description | Body | Success Response |
|---|---|---|---|---|---|
| POST | `/` | 🔒 | All bills created on a given calendar day (00:00–23:59 local) | `{ selectedDate }` | `200` `[bills]` |

### Backup — `/api`

| Method | Endpoint | Auth | Description | Body | Success Response |
|---|---|---|---|---|---|
| GET | `/backup` | Public* | Downloads a JSON dump of all collections | — | `200` file download (`backup.json`) |
| POST | `/restore` | 🔒👑 | Wipes and re-inserts all collections from an uploaded JSON file | multipart `file` | `200` `{ message }` |

\* Note: the download route (`/backup`) is **not** wrapped in `authMiddleware`, unlike restore — see [Code Review Suggestions](#code-review-suggestions).

### Health check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api` | Returns `"Backend is running!"` |

---

## Folder Structure

```
customer-ledger-master/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection (mongoose.connect)
│   ├── controllers/
│   │   ├── authController.js      # register, login
│   │   ├── billController.js      # create/list/detail/update/delete bill
│   │   ├── customerController.js  # CRUD + transactions/ledger
│   │   ├── wholesalerController.js# CRUD + transactions/ledger
│   │   ├── productController.js   # CRUD + stock + QR generation
│   │   ├── reportController.js    # daily sales report
│   │   └── backupController.js    # JSON export/import
│   ├── middlewares/
│   │   ├── authMiddleware.js      # JWT verification, attaches req.user
│   │   └── roleMiddleware.js      # checkRole([...]) route guard
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Bill.js
│   │   ├── Customer.js
│   │   └── Wholesaler.js
│   ├── routes/                    # one router per resource, mounted in server.js
│   ├── utils/
│   │   └── generateQR.js          # qrcode wrapper
│   ├── uploads/                   # multer destination for backup-restore files
│   └── server.js                  # app bootstrap, CORS, route mounting
│
└── frontend/
    ├── public/
    │   ├── manifest.json          # PWA manifest
    │   ├── sw.js                  # service worker (minimal stub)
    │   └── beep.mp3               # scan confirmation sound
    └── src/
        ├── components/            # Navbar, BottomNavbar, Scanner, cards, ProtectedRoute
        ├── pages/
        │   ├── bills/             # AddBill (scan/manual), BillDetails, BillPrint, EditBill, BillsDashboard
        │   ├── customers/         # Dashboard, Add/Edit/Details, Add/Edit/Details Transaction
        │   ├── wholesalers/       # mirror of customers/
        │   ├── products/          # AddStock (QR + sticker), StockPage, ProductDetail
        │   ├── StickerGenerator.jsx
        │   ├── Reports.jsx
        │   ├── Settings.jsx       # Backup/Restore + account
        │   └── PurchaseCalculator.jsx
        ├── utils/
        │   └── api.js             # axios instance, JWT interceptor, 401 handler
        ├── App.jsx                # route table
        └── main.jsx                # app entry, BrowserRouter, service worker registration
```

---

## Installation

**Prerequisites:** Node.js 18+, npm, and a MongoDB instance (local or Atlas).

```bash
git clone https://github.com/arbazansari7933/customer-ledger.git
cd customer-ledger
```

### Backend

```bash
cd backend
npm install
```

Create `backend/.env` (see [Environment Variables](#environment-variables) for full details), then:

```bash
npm run dev      # nodemon, auto-restarts on change
# or
npm start        # plain node
```

The API starts on `http://localhost:<PORT>/api` (default `5000`).

### Frontend

```bash
cd ../frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

> ⚠️ The frontend currently talks to a **hardcoded** backend URL rather than an environment variable — see [Environment Variables](#environment-variables) and [Code Review Suggestions](#code-review-suggestions) before running locally against your own backend.

---

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/kgn-collection
JWT_SECRET=replace_with_a_long_random_string
CLIENT_URI=http://localhost:5173
OWNER_SECRET=replace_with_a_private_invite_code
```

| Variable | Used in | Purpose |
|---|---|---|
| `PORT` | `server.js` | Port the Express server listens on (falls back to `5000`) |
| `MONGO_URI` | `config/db.js` | MongoDB connection string |
| `JWT_SECRET` | `authController.js`, `authMiddleware.js` | Signs and verifies JWTs |
| `CLIENT_URI` | `server.js` | Comma-separated list of allowed CORS origins — **required**, `server.js` calls `.split(",")` on it directly with no fallback |
| `OWNER_SECRET` | `authController.js` | Invite code that force-assigns the `owner` role at signup |

### Frontend

There is currently **no `.env` file or `import.meta.env` variable used** by the frontend. `src/utils/api.js` hardcodes the API base URL:

```js
baseURL: process.env.NODE_ENV === "production"
  ? "https://customer-ledger-backend.onrender.com/api"
  : "http://localhost:5000/api"
```

To point the frontend at a different backend, this value currently has to be edited directly in `src/utils/api.js` (see [Code Review Suggestions](#code-review-suggestions) for a recommended fix using Vite's `VITE_`-prefixed env vars).

---

## Deployment

| Layer | Provider | Notes |
|---|---|---|
| Frontend | Vercel | `vercel.json` rewrites all routes to `index.html` for client-side routing |
| Backend | Render | Node/Express service; `CLIENT_URI` must include the deployed Vercel origin |
| Database | MongoDB Atlas | Connection string supplied via `MONGO_URI` |

**Production build:**

```bash
# frontend
cd frontend
npm run build      # outputs to dist/
```

Deploy `frontend/dist` to Vercel (or any static host) and `backend/` as a Node web service to Render, setting the five backend environment variables in the Render dashboard. Because the API base URL is currently hardcoded (see above), redeploying the backend to a different domain requires a matching code change in `src/utils/api.js`, not just an environment variable update.

---

## Engineering Decisions

**Why QR codes instead of manual billing** — Typing product names and prices at the counter is slow and error-prone during a rush. A camera scan is near-instant, removes typos, and lets any employee bill correctly without memorizing prices.

**Why JWT authentication** — The frontend and backend are fully decoupled (different hosts, Vercel vs. Render), so a stateless, header-based auth scheme avoids the complexity of shared server-side sessions/cookies across origins.

**Why MongoDB** — Bills and ledgers are naturally document-shaped (a bill "owns" its line items; a customer "owns" their transaction history). Embedding `items[]` in `Bill` and `transaction[]` in `Customer`/`Wholesaler` keeps a bill or a ledger readable in a single query, which matches how the UI consumes them.

**Why automatic inventory deduction** — Manual stock updates get forgotten during a busy shift. Deducting stock as part of the same request that creates the bill guarantees stock and sales never fall out of sync.

**Why balance recalculation instead of incremental updates** — see [Customer & Wholesaler Ledger](#customer--wholesaler-ledger) above: recalculating from the transaction array on every write makes the balance a derived, self-correcting value instead of a counter that can drift.

**Why PWA** — The shop uses a phone/tablet at the counter. Installing to the home screen gives an app-like, full-screen experience without needing an app store listing.

**Why PDF generation for bills and stickers** — `html2canvas` + `jsPDF` let the exact same styled HTML that's already rendered in the browser be turned into a print-ready file sized to real thermal paper/label dimensions (80mm bills, 58–60mm stickers), without maintaining a separate print template engine.

---

## Challenges Solved

- **Manual retail billing** — replaced with scan-to-bill, cutting per-item entry time and typos.
- **Inventory synchronization** — stock is deducted transactionally as part of bill creation, not as a separate manual step.
- **Duplicate QR scans** — solved with a scan-lock cooldown and an "increment existing cart line" rule instead of adding a new row.
- **Automatic ledger updates** — a due bill automatically finds-or-creates the customer and appends a ledger entry, with no manual bookkeeping step.
- **Balance drift** — solved by recalculating balances from the full transaction history rather than incrementing/decrementing a stored counter.
- **Mobile-first usability** — bottom tab navigation, large touch targets, and a scan-mode toggle designed around a phone/tablet at a shop counter, not a desktop back-office.
- **Offline safety net on free hosting** — the backup/restore JSON export exists specifically because the shop runs on free-tier hosting where data loss risk (cold starts, plan resets) is non-trivial.

---

## Known Limitations

These are things the app does not yet do, as opposed to bugs in what it does do (those are listed separately below):

- No pagination on customers, wholesalers, bills, or product lists — everything loads in one query.
- No low-stock notification/alert view, even though the `lowStockAlert` field exists on every product.
- "Shop Information" and "Bill Preferences" in Settings are non-functional placeholders.
- The standalone Sticker Generator page produces a decorative pattern, not a real scannable code.
- Service worker does not cache anything, so the PWA is installable but not usable offline.
- No automated tests, CI/CD pipeline, or TypeScript.

---

## Future Improvements

- Wire up real caching in the service worker for genuine offline support
- Surface a low-stock dashboard/alert using the existing `lowStockAlert` field
- Add pagination and server-side search/filtering to list endpoints
- Re-enable and finish the ownership-based (`createdBy`) access checks that are currently commented out
- Barcode/hardware scanner support as an alternative to camera-based scanning
- WhatsApp bill sharing from the print view
- Push notifications for overdue customer balances
- Multi-store support
- Automated unit/integration tests and a CI/CD pipeline
- Move the frontend API base URL into a proper Vite environment variable

---

## Code Review Suggestions

> The following are observations from inspecting the source code — reported for awareness, not applied to the code or to the feature list above.

1. **`Bill.items` schema is missing the `productId` field.** `billController.js` builds each processed item with `productId: item.productId || null`, and stock deduction during `createBill` correctly uses that value from the *incoming request*. However, `models/Bill.js`'s `itemSchema` does not declare a `productId` field, so Mongoose (strict mode by default) silently drops it when the `Bill` document is saved. The result: stock deduction works correctly at creation time, but the **persisted bill has no link back to the product** — which will surface as a real bug the moment any feature needs to look up "what product was this line item" from a saved bill (e.g. returns, per-product sales analytics, re-printing with live product data).

2. **`deleteBill` does not reverse the customer's ledger balance.** If a due bill created a ledger transaction for a customer and that bill is later deleted, the corresponding `give` transaction remains in the customer's `transaction[]` array and their `balance` is never adjusted — the customer will still show as owing money for a bill that no longer exists.

3. **`updateBill` doesn't reconcile stock.** Editing a bill's `items`/`total`/`paid`/`due` overwrites the bill document directly but never re-validates or adjusts `Product.stock` for the difference between old and new quantities — a bill edited to a higher quantity does not deduct the extra stock, and an edit to a lower quantity does not return stock.

4. **Frontend API base URL is hardcoded**, and the check used to select it (`process.env.NODE_ENV === "production"`) is a Node-style check, not Vite's `import.meta.env.MODE`/`import.meta.env.PROD`. It happens to work because Vite statically replaces `process.env.NODE_ENV`, but there's no `.env`/`VITE_API_URL` mechanism at all — anyone forking the project or standing up a second environment (staging, a different Render URL) has to edit `src/utils/api.js` directly.

5. **Ownership checks are commented out across `customerController.js` and `wholesalerController.js`.** Every controller has a commented `if (req.user.role !== "owner" && record.createdBy.toString() !== req.user._id.toString())` block. As shipped, any authenticated user with the right role can view/edit/delete *any* customer, wholesaler, or transaction — the `createdBy` field is recorded but not enforced.

6. **`GET /api/backup` has no auth middleware**, unlike `POST /api/restore` which requires `owner`. Anyone who can reach the backend URL can currently download a full JSON export of every user (including hashed passwords), bill, customer, and wholesaler without authenticating.

7. **`.gitignore` does not exclude `.env` files.** No `.env` is currently committed in this snapshot, but the `.gitignore` in both `backend/` and `frontend/` has no `.env` rule, which is a latent risk if a `.env` is ever added without remembering to exclude it manually.

8. **Two separate, disconnected "sticker generator" implementations exist** — the functional one inside `AddStock.jsx` (real QR, hits the backend) and the standalone `StickerGenerator.jsx` page (fake bar pattern, no backend call, duplicate sticker-layout logic). This is likely to confuse both users (which one makes a *real* scannable sticker?) and future maintainers (two copies of similar PDF/canvas logic to keep in sync).

9. **`reportController.js`'s date range mutates the same `Date` object twice** (`date.setHours(0,0,0,0)` then `date.setHours(23,59,59,999)` on the *same* `date` instance) — this happens to work here only because both calls read into separate `start`/`end` `Date` wrappers before the second mutation, but it's a fragile pattern that would break if reordered.

10. **No server-side validation on transaction `type`.** `addTransaction`/`editTransaction` for both customers and wholesalers only check `if (!amount || !type)`, not that `type` is actually `"give"` or `"receive"` — an unexpected string would silently fail to match either branch in the balance-update logic and leave the balance calculation wrong for that entry without any error being raised.

11. **Minor:** `MainDashboard.jsx`-style routes mix `<ProtectedRoute>` inconsistently — `/purchase-calculator` and `/products/:id` are the only two authenticated-feeling pages mounted **without** `ProtectedRoute` in `App.jsx`, while every functionally similar page is wrapped. Likely an oversight rather than an intentional public route.

---

## Author

**Arbaz Ansari**
B.Tech Computer Science Engineering

Built for KGN Collection, a real retail shop currently using this system in production.

- GitHub: [arbazansari7933](https://github.com/arbazansari7933)
- LinkedIn: [Arbaz Ansari](https://linkedin.com/in/arbaz-ansari-48b634330/)

---

## License

MIT
