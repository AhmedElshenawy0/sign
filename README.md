# Sign Up

Next.js site + admin, with an Express + Prisma API.

- Public site: Next.js (`/` intro, `/home`, `/projects`, …)
- Admin: `/admin/login` (antd)
- API: `server/` — JWT cookie auth, PostgreSQL, Cloudinary for images, local disk for videos

## Local run

1. Start Postgres (`docker compose up -d postgres` from this folder).
2. Copy `server/.env.example` → `server/.env` and fill Cloudinary + `JWT_SECRET`.
3. Copy `.env.example` → `.env.local` and use the **same** `JWT_SECRET`.
4. In `server/`: `npm install`, `npx prisma migrate deploy`, `npx prisma db seed`.
5. Two terminals: `npm run dev:api` (Express `:4000`) and `npm run dev` (Next `:3000`).

Admin login is `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `server/.env`.

Full VPS / Nginx / PM2 steps: [server/README.md](server/README.md).
