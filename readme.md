# E-Commerce Full-Stack Website

A full-stack e-commerce application with a Node.js/Express backend and a client frontend.  
The project includes authentication, product management, ordering logic, and clean code structure (MVC, middlewares, utils).


![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)


---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Database & Seeding](#database--seeding)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview
This repository contains a complete e-commerce solution designed with separation of concerns:
- Backend controls business logic, routes, controllers, models.
- Frontend consumes the API and provides the shopping UI.

---

## Features
- User authentication (register/login via JWT)
- Product listing and details
- Shopping cart & order placement
- Admin CRUD for products
- Structured MVC backend
- `.env`-driven secure configuration

---

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (likely used — configure via `.env`)
- **Frontend:** Client folder (React or similar)
- **Auth:** JWT-based authentication
- **Other:** Environment config, reusable helpers/middlewares

---

## Folder Structure
```

.
├─ client/           # Frontend application
├─ config/           # DB connection & config
├─ controllers/      # Route controller logic
├─ helpers/          # Utility helpers
├─ initDB/           # Database init / seeding scripts
├─ middlewares/      # Express middlewares
├─ models/           # Mongoose or ORM models
├─ routes/           # API route definitions
├─ utils/            # General utilities
├─ .env.example      # Example environment file
├─ server.js         # Server entry point
└─ package.json

````

---

## Prerequisites
- Node.js & npm (LTS preferred)
- MongoDB instance (local or Atlas)
- Optional: Stripe/PayPal keys, Cloud storage keys if added

---

## Installation & Setup

```bash
# 1) Clone project
git clone https://github.com/mehtabali05/E-commerce_Full_Stack_Website.git
cd E-commerce_Full_Stack_Website

# 2) Install backend deps
npm install

# 3) Configure environment
cp .env.example .env
# then open .env and fill your credentials

# 4) Run backend (dev)
npm run dev
````

### Run Client

```bash
cd client
npm install
npm start
```

---

## Environment Variables

Edit `.env` based on `.env.example`. Common keys:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
```

Add payment or cloud creds if used.

---

## Scripts

Backend (from root):

```bash
npm start       # production
npm run dev     # development (nodemon)
```

Frontend (inside /client):

```bash
npm start
npm run build
```

---

## API Endpoints

Typical endpoints (edit to match implementation):

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/products
GET    /api/products/:id
POST   /api/products        (admin)
PUT    /api/products/:id    (admin)
DELETE /api/products/:id    (admin)
POST   /api/orders
GET    /api/orders/:id
```

---

## Database & Seeding

If `initDB` contains seeding scripts, run with:

```bash
node initDB/seed.js
```

---

## Deployment

1. Build client for production

```bash
cd client && npm run build
```

2. Set environment on server (Mongo, JWT, etc.)
3. Run with `npm start` using production NODE_ENV
4. Deploy on Render / Railway / VPS / etc.

---

## Contributing

1. Fork the repo
2. Create branch `feat/feature-name`
3. Commit & push
4. Open Pull Request

---

## Contact

**Author:** Mehtab Ali
GitHub: [https://github.com/mehtabali05/E-commerce_Full_Stack_Website](https://github.com/mehtabali05/E-commerce_Full_Stack_Website)

---

```

Tell me what you want next: **Badges / Screenshots / Live link / Route auto-mapping**?
```
