# Sanity overlay (public site)

The Express API, Prisma/Neon database, and `/admin` dashboard are unchanged. This overlay only changes how the **public** site reads content.

## Switch

In `.env.local`:

- `CONTENT_SOURCE=sanity` — public pages read Sanity first, then the existing API, then `dummyData`
- `CONTENT_SOURCE=api` (or omit) — public pages use Express exactly as before

`/admin` always writes to Express. During the Sanity test, edit content in Studio to see it on the live site.

## Env

Copy from `.env.example`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET=production`
- `SANITY_API_READ_TOKEN` (optional, private datasets)
- `SANITY_API_WRITE_TOKEN` (only for `npm run sanity:seed`)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (Studio helper; never put the API secret in Next)

Create a project at https://www.sanity.io/manage and paste the project ID.

## Run

1. `npm run dev` (Next)
2. Open http://localhost:3000/studio and sign in with Sanity
3. Optional sample docs: `npm run sanity:seed`
4. Keep `npm run dev:api` if you still want `/admin`

## Cloudinary

Videos, galleries, intro, and showreel are **URL + public ID** fields (`cloudinaryAsset`). Do not upload large videos into Sanity. The existing Express Cloudinary upload on `/admin` is untouched.

## Switch back

Set `CONTENT_SOURCE=api`, restart Next. Database and admin are still there.
