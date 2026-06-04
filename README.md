# KGN Collection — Shop Management System

[🔴 Live Demo](https://customer-ledger-chi.vercel.app/) •
[📂 Repository](https://github.com/arbazansari7933/customer-ledger)

A mobile retail management system built with the MERN stack for KGN Collection, currently used in production for billing, inventory management, and customer credit tracking.

---

## Highlights

- QR-based product scanning for billing
- Automatic stock deduction on sale
- Customer & wholesaler ledger management
- QR sticker generation with PDF export
- Daily sales reporting
- Backup & restore system
- PWA support for mobile installation

## What it does

**Customer Ledger** — Track credit given to each customer. Every transaction (give/receive) updates their running balance in real time. Full history with edit and delete support.

**Wholesaler Ledger** — Mirror of the customer system on the supply side. Track what you owe wholesalers and what payments you've made, with the same transaction model.

**Billing (POS)** — Create itemised bills with per-item MRP, discount percentage, and auto-calculated final rate. Supports partial payment — the due amount is automatically added to the customer's ledger, creating or updating their account by phone number.

**Inventory & Stock** — Add products with category, price, GST, and discount. Every bill deducts stock automatically. Low stock alert threshold per product. Scan a QR code at the billing screen to auto-fill product details.

**QR Code + Sticker Generator** — When stock is added, a QR code is generated for that product. The sticker generator converts it into a printable PDF label (60×40mm) with product name, design, MRP, and a barcode visual. Print 1, 2, 4, 6, or 8 stickers per page.

**Daily Sales Reports** — Pick any date to see all bills raised that day — total sales, amount collected, and dues.

**Backup & Restore** — Download a full JSON export of all data (customers, wholesalers, bills, products, users) in one click. Upload a backup file to restore everything. Useful for switching servers or recovering data.

**Purchase Calculator** — Quick utility for calculating buying price, margin, and selling price before purchasing new stock from a wholesaler.

**PWA Support** — Has a `manifest.json`, service worker, and app icons. Installable on Android as a home screen app for use like a native app on the shop floor.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router v7, Tailwind CSS, Vite |
| Backend | Node.js, Express.js v5 |
| Database | MongoDB, Mongoose |
| Auth | JWT (Bearer token), bcryptjs |
| PDF / Print | jsPDF, html2canvas |
| QR Code | qrcode (server), html5-qrcode (scanner), qrcode.react |
| Forms | react-hook-form |
| Icons | lucide-react, react-icons |
| Animations | framer-motion |
| File Upload | multer |
| PWA | manifest.json, service worker |

---

## Architecture

### How billing connects to the ledger

The most important design decision is how bills and the customer ledger stay in sync automatically.

When a bill is created with a due amount, the system finds the customer by phone number and pushes a `give` transaction to their ledger and deducts from their balance — no manual step needed. If no customer exists for that phone number yet, a new one is created automatically.

```
Create Bill (due: ₹500)
        │
        ▼
Customer.findOne({ phone })
        │
   Found?  ──── NO ────▶  Customer.create({ balance: -500, transaction: [...] })
        │
       YES
        │
        ▼
customer.transaction.push({ amount: 500, type: "give" })
customer.balance -= 500
customer.save()
```

### Balance recalculation on edit/delete

When a transaction is deleted or edited, the balance is not adjusted by a delta. It is fully recalculated from scratch by reducing over the entire transaction array:

```js
customer.balance = customer.transaction.reduce((total, t) => {
  return t.type === "give" ? total - t.amount : total + t.amount;
}, 0);
```

This prevents drift — no matter how many edits happen, the balance is always the true sum of all recorded transactions.

### Stock deduction at billing

When a bill is created, each item with a `productId` triggers a stock check before the bill is saved. If any product is out of stock, the whole bill is rejected with an error. Only after all items pass the check does the system deduct stock and create the bill.

### JWT auth flow

All protected routes go through `authMiddleware`, which reads the `Authorization: Bearer <token>` header, verifies the JWT, fetches the user from the database, and attaches it to `req.user`. The same user object is used for `createdBy` fields across all records.

---

## Project structure

```
customer-ledger-master/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── controllers/    # Auth, customer, wholesaler, bill, product, report, backup
│   ├── middlewares/    # JWT auth, role check
│   ├── models/         # User, Customer, Wholesaler, Bill, Product schemas
│   ├── routes/         # Route definitions for all modules
│   ├── utils/          # QR code generator
│   └── server.js       # Express app entry point
│
└── frontend/
    └── src/
        ├── components/     # Reusable UI (Navbar, BottomNavbar, Cards, Scanner)
        ├── pages/
        │   ├── customers/  # Dashboard, Add, Edit, Details, Transactions
        │   ├── wholesalers/# Same structure as customers
        │   ├── bills/      # Dashboard, Add, Edit, Details, Print
        │   ├── products/   # AddStock, StockPage
        │   ├── Reports.jsx
        │   ├── Settings.jsx       # Backup / Restore
        │   ├── StickerGenerator.jsx
        │   └── PurchaseCalculator.jsx
        └── utils/
            └── api.js      # Axios instance with base URL + auth header
```

---

## Running locally

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone the repo

```bash
git clone https://github.com/arbazansari7933/customer-ledger.git
cd customer-ledger
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/kgn-collection
JWT_SECRET=your_minimum_32_char_secret_here
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` folder:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## Key technical decisions

**Why balance is recalculated, not incremented**
Incrementing a balance on every add and decrementing on every delete sounds simpler, but it creates drift when edits happen — especially if an edit changes both the amount and the type. Recalculating from the full transaction array on every mutation makes the balance a pure derived value with no state to go wrong.

**Why bills auto-create customers by phone**
The billing screen is the fastest interaction in the shop — the owner is at the counter. Requiring a separate customer creation step before billing would slow things down. Matching by phone and auto-creating makes the ledger a side effect of billing, not a prerequisite.

**Why QR-based product lookup at POS**
Manual item entry at billing is slow and error-prone, especially for a textile shop with dozens of items. Scanning a QR code on the product sticker auto-fills name, price, GST, and discount. The sticker generator and QR system are designed to work as a pair.

**Why backup is a JSON download instead of cloud sync**
The app runs on a free-tier backend. A JSON export that can be downloaded anytime and restored in one click is more reliable for a small business than a cloud sync that depends on API limits and connectivity. The owner can keep a backup on their phone.

---

## Known limitations / what's next

- RBAC (role-based access for owner vs employee) is scaffolded in the code but commented out — needs to be enabled and tested
- Bill deletion does not currently reverse the customer's ledger balance
- CORS is fully open (`app.use(cors())`) — should be restricted to the frontend domain in production
- No pagination on long customer or bill lists
- Push notifications for overdue balances
- WhatsApp share for bills (using the bill print view)

---

## Author

**Arbaz Ansari**

B.Tech Computer Science Engineering

Built for KGN Collection, a real retail shop currently using the system for billing, inventory management, and customer credit tracking.

- GitHub: https://github.com/arbazansari7933
- LinkedIn:# KGN Collection — Shop Management System

[🔴 Live Demo](https://customer-ledger-chi.vercel.app/) •
[📂 Repository](https://github.com/arbazansari7933/customer-ledger)

A mobile-first billing and stock management app built with the MERN stack for a real retail shop.

---
## Highlights

- QR-based product scanning for billing
- Automatic stock deduction on sale
- Customer & wholesaler ledger management
- QR sticker generation with PDF export
- Daily sales reporting
- Backup & restore system
- PWA support for mobile installation

## What it does

**Customer Ledger** — Track credit given to each customer. Every transaction (give/receive) updates their running balance in real time. Full history with edit and delete support.

**Wholesaler Ledger** — Mirror of the customer system on the supply side. Track what you owe wholesalers and what payments you've made, with the same transaction model.

**Billing (POS)** — Create itemised bills with per-item MRP, discount percentage, and auto-calculated final rate. Supports partial payment — the due amount is automatically added to the customer's ledger, creating or updating their account by phone number.

**Inventory & Stock** — Add products with category, price, GST, and discount. Every bill deducts stock automatically. Low stock alert threshold per product. Scan a QR code at the billing screen to auto-fill product details.

**QR Code + Sticker Generator** — When stock is added, a QR code is generated for that product. The sticker generator converts it into a printable PDF label (60×40mm) with product name, design, MRP, and a barcode visual. Print 1, 2, 4, 6, or 8 stickers per page.

**Daily Sales Reports** — Pick any date to see all bills raised that day — total sales, amount collected, and dues.

**Backup & Restore** — Download a full JSON export of all data (customers, wholesalers, bills, products, users) in one click. Upload a backup file to restore everything. Useful for switching servers or recovering data.

**Purchase Calculator** — Quick utility for calculating buying price, margin, and selling price before purchasing new stock from a wholesaler.

**PWA Support** — Has a `manifest.json`, service worker, and app icons. Installable on Android as a home screen app for use like a native app on the shop floor.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router v7, Tailwind CSS, Vite |
| Backend | Node.js, Express.js v5 |
| Database | MongoDB, Mongoose |
| Auth | JWT (Bearer token), bcryptjs |
| PDF / Print | jsPDF, html2canvas |
| QR Code | qrcode (server), html5-qrcode (scanner), qrcode.react |
| Forms | react-hook-form |
| Icons | lucide-react, react-icons |
| Animations | framer-motion |
| File Upload | multer |
| PWA | manifest.json, service worker |

---

## Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
---

## Architecture

### How billing connects to the ledger

The most important design decision is how bills and the customer ledger stay in sync automatically.

When a bill is created with a due amount, the system finds the customer by phone number and pushes a `give` transaction to their ledger and deducts from their balance — no manual step needed. If no customer exists for that phone number yet, a new one is created automatically.

```
Create Bill (due: ₹500)
        │
        ▼
Customer.findOne({ phone })
        │
   Found?  ──── NO ────▶  Customer.create({ balance: -500, transaction: [...] })
        │
       YES
        │
        ▼
customer.transaction.push({ amount: 500, type: "give" })
customer.balance -= 500
customer.save()
```

### Balance recalculation on edit/delete

When a transaction is deleted or edited, the balance is not adjusted by a delta. It is fully recalculated from scratch by reducing over the entire transaction array:

```js
customer.balance = customer.transaction.reduce((total, t) => {
  return t.type === "give" ? total - t.amount : total + t.amount;
}, 0);
```

This prevents drift — no matter how many edits happen, the balance is always the true sum of all recorded transactions.

### Stock deduction at billing

When a bill is created, each item with a `productId` triggers a stock check before the bill is saved. If any product is out of stock, the whole bill is rejected with an error. Only after all items pass the check does the system deduct stock and create the bill.

### JWT auth flow

All protected routes go through `authMiddleware`, which reads the `Authorization: Bearer <token>` header, verifies the JWT, fetches the user from the database, and attaches it to `req.user`. The same user object is used for `createdBy` fields across all records.

---

## Project structure

```
customer-ledger-master/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── controllers/    # Auth, customer, wholesaler, bill, product, report, backup
│   ├── middlewares/    # JWT auth, role check
│   ├── models/         # User, Customer, Wholesaler, Bill, Product schemas
│   ├── routes/         # Route definitions for all modules
│   ├── utils/          # QR code generator
│   └── server.js       # Express app entry point
│
└── frontend/
    └── src/
        ├── components/     # Reusable UI (Navbar, BottomNavbar, Cards, Scanner)
        ├── pages/
        │   ├── customers/  # Dashboard, Add, Edit, Details, Transactions
        │   ├── wholesalers/# Same structure as customers
        │   ├── bills/      # Dashboard, Add, Edit, Details, Print
        │   ├── products/   # AddStock, StockPage
        │   ├── Reports.jsx
        │   ├── Settings.jsx       # Backup / Restore
        │   ├── StickerGenerator.jsx
        │   └── PurchaseCalculator.jsx
        └── utils/
            └── api.js      # Axios instance with base URL + auth header
```

---

## Running locally

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone the repo

```bash
git clone https://github.com/arbazansari7933/customer-ledger.git
cd customer-ledger
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/kgn-collection
JWT_SECRET=your_minimum_32_char_secret_here
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` folder:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## Key technical decisions

**Why balance is recalculated, not incremented**
Incrementing a balance on every add and decrementing on every delete sounds simpler, but it creates drift when edits happen — especially if an edit changes both the amount and the type. Recalculating from the full transaction array on every mutation makes the balance a pure derived value with no state to go wrong.

**Why bills auto-create customers by phone**
The billing screen is the fastest interaction in the shop — the owner is at the counter. Requiring a separate customer creation step before billing would slow things down. Matching by phone and auto-creating makes the ledger a side effect of billing, not a prerequisite.

**Why QR-based product lookup at POS**
Manual item entry at billing is slow and error-prone, especially for a textile shop with dozens of items. Scanning a QR code on the product sticker auto-fills name, price, GST, and discount. The sticker generator and QR system are designed to work as a pair.

**Why backup is a JSON download instead of cloud sync**
The app runs on a free-tier backend. A JSON export that can be downloaded anytime and restored in one click is more reliable for a small business than a cloud sync that depends on API limits and connectivity. The owner can keep a backup on their phone.

---

## Known limitations / what's next

- RBAC (role-based access for owner vs employee) is scaffolded in the code but commented out — needs to be enabled and tested
- Bill deletion does not currently reverse the customer's ledger balance
- CORS is fully open (`app.use(cors())`) — should be restricted to the frontend domain in production
- No pagination on long customer or bill lists
- Push notifications for overdue balances
- WhatsApp share for bills (using the bill print view)

---

## Author

**Arbaz Ansari**

B.Tech Computer Science Engineering

Built for KGN Collection, a real retail shop currently using the system for billing, inventory management, and customer credit tracking.

- GitHub: [arbazansari7933](https://github.com/arbazansari7933)
- LinkedIn: [Arbaz Ansari](https://linkedin.com/in/arbaz-ansari-48b634330/)
