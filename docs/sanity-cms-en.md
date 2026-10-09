# Sign Up CMS handbook (Sanity)

Use this document to add work, edit the homepage, and know what you can change in **Create** vs **Update**.  
Studio URL: `/studio` (local: `http://localhost:3000/studio`).

After every change, click **Publish**. An empty field keeps the site’s default English/Arabic sentence. It does not delete the section.

---

## 1. What Sanity controls (and what it does not)

| In Sanity | Not in Sanity |
|---|---|
| Work cases (**Projects**) on `/projects` | The shop catalog on `/store` (WhatsApp products, photos, filters) |
| NFC work grids on `/nfc` (projects typed as NFC Card / Ring / Medal) | Fixed NFC product stills (card, ring, medal, default stand photo) |
| Homepage copy, stats numbers, partner logos | Homepage contact block, results chart, service-section videos |
| Intro loop + showreel videos | Navbar, footer, colors, routes |
| About page copy | “Visit NFC” button (`https://nfc.signuptap.com`) |
| NFC page titles/body + optional stand photo | Journey **layout** (chapter design is code) |
| | New service categories (the type list is fixed) |

The shop (`/store`) is a fixed catalog. Adding a Project does **not** add a shop tile.

---

## 2. Studio sidebar

| Item | Kind | Create a second one? |
|---|---|---|
| **Intro & showreel** | One document | No — update only |
| **Homepage** | One document | No — update only |
| **About** | One document | No — update only |
| **NFC page** | One document | No — update only |
| **Projects** | Many documents | Yes — one document per case |

Open **Projects** to add or edit work. Open the four items above only to edit existing page copy/media.

---

## How to create a project

Do this when you have a new case to put on `/projects` (and on `/nfc` if it is NFC).

1. Open `/studio` and sign in.
2. In the left sidebar, click **Projects**.
3. Click **Create** (top right). A new empty project opens. Do not open **Homepage** for this.
4. Fill **Project name**.
5. Set **Service** to the category (Brand Identity, Packaging, NFC Card, …). See the category table in section 3. You cannot type a new service.
6. In **Cover**, click upload and add the opening photo. If **Service** is **Videos**, upload the film here instead (and add **Video thumbnail** if you have a still).
   - Or paste a URL in **Or paste a URL** if the file is already online.
7. Optional: **Short description** (one or two lines under the name). Leave empty to keep the default line.
8. Optional: **Order on Projects page**. Smaller number = higher in the list.
9. Optional: under **Extra photos**, click **Add item** for each extra chapter:
   1. Set **This photo is for** to the matching slot (Logo, In hand, …).
   2. Upload the photo (or paste a URL).
   3. Optional: photo label and EN/AR sentences for that chapter.
10. Optional: open **Sentences** and fill English + Arabic only where you want to replace the default text.
11. Click **Publish** (bottom left / document menu). Save without Publish stays a draft and does not show on the site.
12. Open the live site: `/projects`, pick the same filter as **Service**. Click the card and check the journey. If Service is NFC Card / Ring / Medal, also check `/nfc`.

**Minimum to publish:** name + service + cover.

---

## How to update a project

Do this when the case already exists and you need to change name, photos, order, or sentences.

1. Open `/studio` → **Projects**.
2. Click the project in the list (search by name if the list is long).
3. Edit only the fields you need:
   - **Project name** — changes the title on `/projects` and on the journey.
   - **Service** — moves it to another filter. After this, re-check every Extra photo **This photo is for** (slots change with the service).
   - **Cover** — replace the opening image/video.
   - **Order on Projects page** — reorder the list.
   - **Short description** — change or clear it (clear = default line comes back).
   - **Extra photos** — **Add item** for a new chapter; open an item to replace the file or slot; remove an item to drop that chapter from the page.
   - **Sentences** — change EN/AR, or clear a field to restore the default sentence.
4. Click **Publish**. The live page updates after publish, not after typing.
5. Check the same URLs as create: `/projects` + journey, and `/nfc` if it is NFC.

**To delete a project:** open it → document menu (⋯) → **Delete** → confirm → the case leaves `/projects` (and `/nfc` if it was NFC).

You cannot add a new service type, change journey layout, or send the case to `/store` from Update.

---

## How to update the homepage

The homepage is **not** created. There is one Homepage and one Intro document. You only update them.

### A. Videos (intro loop + showreel)

1. Open `/studio` → **Intro & showreel**.
2. **Homepage intro loop** — upload a video or paste a URL. This plays behind the hero.
3. **Intro poster** — still shown before the intro loads.
4. **Showreel video** — the film in the hero player.
5. **Showreel eyebrow / title** — English and Arabic text on the showreel.
6. Click **Publish**.
7. Open `/` and check the hero background and the showreel.

Empty video fields fall back to `/videos/intro.mp4`.

### B. Text, numbers, partners, services

1. Open `/studio` → **Homepage**. Do **not** click Create.
2. Use the groups at the top of the form: **Hero**, **Stats**, **About / Vision**, **Process**, **Services**.
3. **Hero**
   - Edit studio pill, title, description (EN + AR).
   - In the description, keep the brand name as `<1>Sign Up</1>` so it stays green.
   - **Partner logos:** **Add item** for each partner (name + logo upload or URL). If you add any logo, the built-in ticker is replaced. Leave the list empty to keep the current default logos.
4. **Stats** — change the four numbers only (years, clients, campaigns, satisfaction). Labels and icons stay as they are.
5. **About / Vision** — edit titles and body for Who we are, What makes us different, Vision, Mission (EN + AR).
6. **Process** — edit the main title/description, then Discover / Strategy / Execute / Optimize title + text. Do not try to add a fifth step.
7. **Services** — edit eyebrow, title, then **Service 1** through **Service 6** (title, description, tag, stat). Do not add a seventh service.
8. Click **Publish**.
9. Open `/` in English and Arabic and scroll the whole page.

**Homepage — you cannot:** add/remove sections, change Contact or the results chart, change service videos/posters, change navbar/footer, or create a second Homepage.

---

## 3. Categories (Service field)

### 3.1 Categories (Service field)

You cannot invent a new service. Pick one of these:

**Branding** (filter on `/projects`)

| Service in Studio | Appears as |
|---|---|
| Brand Identity | Brand Identity |
| Packaging | Packaging |
| Prints | Prints |

**Marketing**

| Service in Studio | Appears as |
|---|---|
| Social Media | Social Media |
| Outdoors | Outdoors |
| Brand Strategy | Brand Strategy |
| Marketing Strategy | Marketing Strategy |

**Photography & Videography**

| Service in Studio | Appears as |
|---|---|
| Photos | Photos |
| Videos | Videos |

**NFC** (also listed under the matching block on `/nfc`)

| Service in Studio | Appears as |
|---|---|
| NFC Card | NFC Card |
| Ring | Ring |
| Medal | Medal |

---

## 4. Create vs Update — Projects

### 4.1 Create — required

| Field | Rule |
|---|---|
| **Project name** | Required |
| **Service** | Required. This is the category. |
| **Cover** | Required. Upload an image, or a video if Service is **Videos**. You may paste a URL instead of uploading. |

Without these three, do not publish.

### 4.2 Create — optional

| Field | What it does | If left empty |
|---|---|---|
| **Short description** | One or two lines under the name on the live page | Default line for that service |
| **Order on Projects page** | Smaller number appears first in the list | `0`. This does not add photos or chapters |
| **Video thumbnail** | Still shown before a film plays | Only for **Videos**. Hidden for other types |
| **Extra photos** | Each photo is one extra chapter on the journey | That chapter does not appear |
| **Sentences** | Cover line, chapter headlines, labels (English + Arabic) | Default sentences |

**Extra photo fields**

| Field | What it does |
|---|---|
| **This photo is for** | Pick the chapter slot for this service (Logo, In hand, …). If empty, the next empty slot for this service is used |
| **Photo label** | Small label on the photo. Not the chapter headline |
| **Upload** | Image (or URL). Required for that extra item |
| **Small line / Headline / Paragraph** | Optional EN+AR override for that chapter |

Rule: **no extra photo = that chapter stays off the page**, even if you wrote sentences for it.

### 4.3 Create — what you cannot do

- Add a service that is not in the list
- Change how many chapters a service is allowed to have
- Change the journey layout (scrolling design, frames, motion)
- Put the case into `/store`
- Change WhatsApp, navbar, or routes

### 4.4 Update — what you can change

You can change every field from Create:

- Name, service, cover, order, short description
- Extra photos (add, replace, remove, change slot)
- Sentences (EN and AR)
- Video thumbnail (Videos only)

Then **Publish**.

If you change **Service** after photos already exist, re-check **This photo is for**. Slots belong to the new service (Identity slots are not the same as Packaging or NFC).

### 4.5 Update — what you cannot change

Same limits as Create: no new categories, no layout change, no shop tile, no new homepage sections.

Deleting a project in Studio removes it from `/projects` (and from `/nfc` work grids if it was NFC). Publish is still required.

---

## 5. Extra photo slots by service

Use the matching slot. Extra photos without a slot are assigned to the next empty slot automatically.

| Service | Slots (in order) |
|---|---|
| Brand Identity | Logo, Brand book, Packaging, Business card, Environmental |
| Packaging | Another SKU, Detail, In hand, On shelf |
| Prints | Bag, Letterhead, Poster |
| Social Media | Story, Campaign |
| Outdoors | City, Vehicle |
| Brand Strategy | Now, Horizon, Path |
| Marketing Strategy | Budget, Time, Mix |
| Photos | Portrait, Detail, Wide |
| Videos | None — cover video (+ thumbnail) only |
| NFC Card | Back, In hand |
| Ring | On hand, Detail |
| Medal | Worn, Detail |

### Sentences that appear only for some services

| Service | Extra sentence fields |
|---|---|
| Brand Identity | Cover line, Logo chapter, Brand book chapter, labels for Packaging / Business card / Environmental (in that order) |
| Packaging | Detail chapter, grid label (Another SKU / In hand / On shelf) |
| Brand Strategy / Marketing Strategy | Up to three steps, same order as the extra photos |
| NFC Card / Ring / Medal | Wear line (small line above the cover) |
| Other types | Cover line (and per-photo lines if you fill them) |

---

## 6. Homepage

There are **two** Studio documents for the home page. Both are update-only.

### 6.1 Intro & showreel

| Field | Live place | If empty |
|---|---|---|
| Homepage intro loop | Video behind the hero | `/videos/intro.mp4` |
| Intro poster | Still before the intro loads | Site default still |
| Showreel video | Hero showreel player | `/videos/intro.mp4` |
| Showreel eyebrow / title (EN + AR) | Text on the showreel | Built-in defaults |

### 6.2 Homepage document

Groups in the form: **Hero**, **Stats**, **About / Vision**, **Process**, **Services**.

#### Hero — you can change

- Studio pill
- Hero title (EN + AR)
- Hero description (EN + AR). Wrap the brand name as `<1>Sign Up</1>` so it stays green
- Partner logos (name + image or URL)

If **Partner logos** has at least one logo with an image/URL, it **replaces** the built-in partner ticker. If the list is empty, the built-in logos stay.

#### Stats — you can change

Numbers only:

- Years of experience
- Clients
- Campaigns
- Satisfaction

You cannot change labels, icons, “+” / “%” suffixes, or the highlight row under the numbers.

#### About / Vision — you can change

Titles and body copy for:

- Who we are
- What makes us different
- Vision
- Mission

You cannot change the CTA button target or the panel structure.

#### Process — you can change

- Process title and description
- Title + text for Discover, Strategy, Execute, Optimize

You cannot add a fifth step. Deliverable lists under each step stay on the default translations.

#### Services (home) — you can change

- Services eyebrow and title
- **Service 1 … Service 6** only: title, description, tag, stat

You cannot add Service 7 or remove a slot. Layout (left/right, video, poster `sign3.jpg`, video file) is not in Sanity. The CTA always goes to `/projects`.

### 6.3 Homepage — what you cannot change

- Contact section
- Results chart
- Number of process steps (always 4)
- Number of service blocks (always 6)
- Navbar / footer
- Page order of sections

---

## 7. Create vs Update — page documents (Homepage, About, NFC, Intro)

| Action | Projects | Homepage / About / NFC page / Intro & showreel |
|---|---|---|
| Create a new document | Yes | No |
| Update the existing document | Yes | Yes |
| Leave a field empty | Default copy/media | Default copy/media |
| Add a new site section or category | No | No |
| Duplicate the homepage | — | No |

There is only one Homepage, one About, one NFC page, one Intro document. Edit that document; do not try to create another.

---

## 8. Other pages in Studio

### About

You can update: hero eyebrow/title/description, hero numbers (years / clients / campaigns), “What is Signup” copy, founder name/role/bio/photo, milestones (value + label, EN + AR).

You cannot change the page layout from Studio.

### NFC page

You can update: hero eyebrow/title/description; stand kicker/title/body; **Stand photo** (upload or URL); card / ring / medal kicker, title, body.

If a stand photo (or URL) is set, it replaces the default stand image. If empty, the site default stand is used.

Work thumbnails under each NFC shape come from **Projects** whose Service is NFC Card, Ring, or Medal — not from this document.

You cannot change the “Visit NFC” link.

---

## 9. English and Arabic

Most copy fields are **English** + **Arabic**. Fill both when you override a default.

If only one language is filled, the site may fall back to the other language, then to the built-in default.

Do not leave a published override in one language and expect the other language to stay on the old default for that same field — fill both.

---

## 10. Publish checklist

**New project**

- [ ] Name + Service + Cover
- [ ] Extra photos only for chapters you want live
- [ ] Slot (`This photo is for`) matches the service
- [ ] EN + AR sentences if you are not using defaults
- [ ] **Publish**
- [ ] Check `/projects` and the correct filter
- [ ] If NFC: check `/nfc` work grid under that shape

**Homepage**

- [ ] Edit **Homepage** and/or **Intro & showreel**
- [ ] Partner logos: either a full new list, or leave empty to keep defaults
- [ ] Services: still exactly six blocks
- [ ] **Publish**
- [ ] Check `/` in English and Arabic

**If something does not show**

- Confirm **Publish** (not only Save/draft)
- Confirm the extra photo exists for that chapter
- Confirm Service type matches the filter you are looking at
- Empty text fields intentionally use defaults — that is expected

---

## 11. Quick “can I?” list

| Task | In Studio? |
|---|---|
| Add a Brand Identity / Packaging / NFC case | Yes — Create Project |
| Change a case’s photos or sentences later | Yes — Update Project |
| Reorder cases on `/projects` | Yes — Order on Projects page |
| Delete a case | Yes — delete the Project document |
| Add a seventh home service | No |
| Add a new service type (e.g. “Events”) | No |
| Add a shop product on `/store` | No |
| Change WhatsApp number | No |
| Change intro / showreel video | Yes — Intro & showreel |
| Change hero title and partner logos | Yes — Homepage |
| Change NFC page headings | Yes — NFC page |
| Change NFC product stills (card/ring/medal photos) | No |
| Change journey animation/layout | No |
