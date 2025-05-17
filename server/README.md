# Server (Backend)

This folder contains the backend API built with **Express** and **TypeScript**. It uses **Prisma** as the ORM to manage the database.

---

## Requirements

- Node.js (>=14)
- npm or yarn
- A database supported by Prisma (e.g., PostgreSQL, MySQL, SQLite)

---

## Setup

1. **Install dependencies**

```bash
npm install
# or
yarn install
```

2. **Create ENV**

```bash
Create a .env file in the root of the server folder with at least:
DATABASE_URL="your-database-connection-string"
JWT_SECRET="your-secret-key"
JWT_ALGORITHM = "jwt algorithm"
```

2. **Create ENV**

```bash
Create a .env file in the root of the server folder with at least:
DATABASE_URL="your-database-connection-string"
JWT_SECRET="your-secret-key"
JWT_ALGORITHM = "jwt algorithm"
JWT_EXPIRES_IN ="token expiry time"
```

2. **Run migrations**

```bash
Run migrations
npx prisma migrate dev --name create_user_asset_warranty_tables
Generate prisma
npx prisma generate
Run seed
npm run seed
```
