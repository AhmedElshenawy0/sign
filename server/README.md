# Express API (Prisma + PostgreSQL)

Images (logos, designs, prints, posters) go to Cloudinary. Videos are stored on this server under `uploads/videos`.

## Local run

1. Start PostgreSQL (Docker is easiest from the repo root):

```bash
docker compose up -d postgres
```

2. Copy env files:

```bash
cp server/.env.example server/.env
cp .env.example .env.local
```

Use the **same** `JWT_SECRET` in both. Fill Cloudinary keys in `server/.env` (free account is enough for images).

Required API values: `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

3. Install, migrate, seed:

```bash
cd server
npm install
npx prisma migrate deploy
npx prisma db seed
```

4. Run API on `:4000`, then Next.js on `:3000` from the repo root:

```bash
npm run dev
```

From the repo root: `npm run dev` (Next) and `npm run dev --prefix server` (API). Next rewrites `/api` and `/uploads` to the API.

Admin login uses `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `server/.env`. Change the password later at `/admin/password`.

## Hostinger VPS

1. Install Node 20, Nginx, PostgreSQL, PM2.
2. Clone the repo, create `server/.env` and root `.env.local` with `JWT_SECRET` matching the API (Next middleware verifies the cookie).
3. `npx prisma migrate deploy` and `npx prisma db seed` inside `server/`.
4. PM2: Next on 3000, Express on 4000.
5. Nginx: site → Next; `/api` → Express; `/uploads` → `server/uploads` as static files.
6. Keep Next `public/` for the original seed images/videos. New videos land in `server/uploads/videos`.

Example Nginx:

```nginx
server {
  listen 80;
  server_name yoursite.com;

  location /api/ {
    proxy_pass http://127.0.0.1:4000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header Cookie $http_cookie;
    client_max_body_size 220m;
  }

  location /uploads/ {
    alias /var/www/sign/server/uploads/;
  }

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```
