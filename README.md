# Sana Trends — E-commerce Website

A full-stack online store for **Sana Trends** (Men's & Kids' clothing, size 5 years to full adult sizes).

- **Frontend:** React + Vite + Tailwind (CDN)
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Payment:** Cash on Delivery (COD) only — no payment gateway needed
- **Admin panel:** Add/edit/delete products, view orders, update order status

---

## 1. What's included

```
sana-trends/
├── backend/          # Express API
│   ├── models/       # Product, Order, Admin (Mongoose schemas)
│   ├── routes/       # /api/products, /api/orders, /api/auth
│   ├── middleware/   # adminAuth (JWT protection)
│   ├── seed.js       # creates admin account + 4 sample products
│   └── server.js
└── frontend/         # React storefront + admin dashboard
    └── src/
        ├── pages/         # Home, Shop, ProductDetail, Cart, Checkout, TrackOrder...
        └── pages/admin/   # AdminLogin, Dashboard, Products, Orders
```

### Customer features
- Browse by category (Men / Kids), search, filter by price
- Product detail page with size & quantity selection
- Cart (persisted in browser)
- Checkout with Cash on Delivery (no card/UPI needed)
- Order confirmation with an order number
- Track order status by order number (`/track-order`)

### Admin features (`/admin/login`)
- Secure login (JWT)
- Add / edit / delete products (name, price, discount price, category, sizes, images, stock, featured)
- View all orders, expand to see items, update status (pending → confirmed → shipped → delivered)
- Dashboard with quick stats

---

## 2. Run it locally

### Prerequisites
- Node.js 18+ installed
- A free MongoDB Atlas account (or local MongoDB)

### Backend
```bash
cd backend
cp .env.example .env
# edit .env: set MONGO_URI, JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD
npm install
npm run seed     # creates your admin login + 4 sample products
npm run dev      # starts on http://localhost:5000
```

### Frontend
```bash
cd frontend
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api  (already the default)
npm install
npm run dev      # starts on http://localhost:5173
```

Open `http://localhost:5173` for the store, and `http://localhost:5173/admin/login` for the admin panel (use the `ADMIN_USERNAME` / `ADMIN_PASSWORD` you set in `backend/.env`).

---

## 3. Deploy for free (MongoDB Atlas + Render + Vercel)

### Step 1 — Database: MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account.
2. Create a **free M0 cluster**.
3. Under **Database Access**, create a user with a password.
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) so Render can connect.
5. Click **Connect > Drivers**, copy the connection string. It looks like:
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   Add your database name before the `?`, e.g. `.../sanatrends?retryWrites=true...`

### Step 2 — Backend: Render
1. Push this project to a GitHub repository.
2. Go to https://render.com, sign up/login, click **New + → Web Service**.
3. Connect your GitHub repo, set **Root Directory** to `backend`.
4. Build Command: `npm install` — Start Command: `npm start`.
5. Add Environment Variables (from `backend/.env.example`):
   - `MONGO_URI` — your Atlas connection string
   - `JWT_SECRET` — any long random string
   - `ADMIN_USERNAME`, `ADMIN_PASSWORD` — your admin login
   - `CLIENT_URL` — leave blank for now, you'll fill it after deploying the frontend
6. Deploy. Once live, copy your backend URL, e.g. `https://sana-trends-backend.onrender.com`.
7. Open Render's **Shell** tab for your service and run `npm run seed` once, to create your admin account and sample products.

> Note: Render's free tier "sleeps" after inactivity — the first request after idle time can take ~30–60 seconds to wake up. This is normal on the free plan.

### Step 3 — Frontend: Vercel
1. Go to https://vercel.com, sign up/login, click **Add New → Project**.
2. Import the same GitHub repo, set **Root Directory** to `frontend`.
3. Framework Preset: Vite (auto-detected).
4. Add Environment Variable:
   - `VITE_API_URL` = `https://sana-trends-backend.onrender.com/api` (your Render URL + `/api`)
5. Deploy. You'll get a URL like `https://sana-trends.vercel.app`.

### Step 4 — Connect them
1. Go back to Render → your backend service → Environment → set `CLIENT_URL` to your Vercel URL (e.g. `https://sana-trends.vercel.app`) so CORS allows requests from your live site.
2. Redeploy the backend (Render redeploys automatically when you change env vars).

Your store is now live! Visit your Vercel URL to shop, and `<your-vercel-url>/admin/login` to manage products and orders.

---

## 4. Adding your real products

Go to `/admin/login`, log in, then **Products → Add Product**:
- **Sizes** — for kids use age ranges like `5-6Y, 7-8Y, 9-10Y`; for men use `S, M, L, XL, XXL` or waist sizes like `30, 32, 34`.
- **Images** — paste direct image URLs (comma-separated for multiple photos). Easiest options:
  - Upload photos to [Cloudinary](https://cloudinary.com) (free tier) or [ImgBB](https://imgbb.com) and paste the direct image link.
  - Or use your own hosting/CDN.

---

## 5. Good next upgrades (not included, to keep this simple)
- Online payments (Razorpay/UPI) if you want card/UPI in addition to COD
- Customer accounts & order history login
- Direct image upload from the admin panel (currently uses image URLs)
- SMS/WhatsApp order notifications
- Product reviews & ratings

Let me know if you'd like any of these added.
