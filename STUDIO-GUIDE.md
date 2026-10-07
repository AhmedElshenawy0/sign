# Studio guide

Add work to the live site in **Sanity Studio** (`/studio`), not `/admin`.

Sign in → edit → **Publish** → open the public page and hard-refresh (Ctrl+Shift+R) if you still see the old version.

A live example already exists for every service: **Nour House**. Open that project in Studio, and open the same piece on `/projects`. Copy that pattern.

---

## Add a project

The steps are the same for every service. Only the extra photos change.

1. Open **`/studio`**.
2. Click **Project** → create new.
3. Set **Service** first (Brand Identity, Packaging, …).
4. Fill:

| Field | What to put |
|---|---|
| **Project name** | Name on the card and on the page |
| **Short description** | One or two lines under the name. Leave empty to keep the default |
| **Order on Projects page** | List position. `1` is first. This does **not** add photos |
| **Cover** | Opening photo. Use **Upload image**. For Videos, use **Upload video** |
| **Video thumbnail** | Videos only. Image before play |
| **Extra photos** | Extra chapters. **Add item**, then **This photo is for**, **Upload**, and optional **Small line / Headline / Paragraph** |
| **Page sentences** | Cover line and other labels for this service. Leave empty to keep the defaults |

5. For each extra photo: **Upload image**, set **This photo is for**, then optionally fill **Small line**, **Headline**, and **Paragraph** (English + Arabic). Empty text keeps the default.
6. **Publish**.
7. Check `/projects`.

**Rule:** Cover is always the first screen. An extra chapter appears only if you added that photo. No photo = that chapter is not on the page.

**Do:** one photo per chapter, in **Upload image**.  
**Don’t:** put a video in Cover unless Service is Videos.

---

## Live examples (Nour House)

On the site and in Studio, each Nour House project is a finished example with photos.

| Service | Live page |
|---|---|
| Brand Identity | `/projects/demo-nour-house-brand-identity` |
| Packaging | `/projects/demo-nour-house-packaging` |
| Prints | `/projects/demo-nour-house-prints` |
| Social Media | `/projects/demo-nour-house-social-media` |
| Outdoors | `/projects/demo-nour-house-outdoors` |
| Brand Strategy | `/projects/demo-nour-house-brand-strategy` |
| Marketing Strategy | `/projects/demo-nour-house-marketing-strategy` |
| Photos | `/projects/demo-nour-house-photos` |
| Videos | `/projects/demo-nour-house-videos` |
| NFC Card | `/projects/demo-nour-house-nfc-card` |
| NFC Ring | `/projects/demo-nour-house-nfc-ring` |
| NFC Medal | `/projects/demo-nour-house-nfc-medal` |

Open the matching Nour House document in Studio to see Cover, Extra photos, and Page sentences.

---

## Extra photos per service

Names below match **This photo is for**.

### Brand Identity

| Add | This photo is for | On the page |
|---|---|---|
| Opening photo | **Cover** | First screen |
| The mark | **Logo** | Logo chapter |
| Guidelines | **Brand book** | Brand book chapter |
| Pack shot | **Packaging** | Later chapter |
| Card | **Business card** | Later chapter |
| In the space | **Environmental** | Later chapter |

Empty-field order: Logo → Brand book → Packaging → Business card → Environmental.

### Packaging

| Add | This photo is for | On the page |
|---|---|---|
| Main pack | **Cover** | First screen |
| Close-up | **Detail** | Range chapter |
| Second pack | **Another SKU** | Grid |
| Held | **In hand** | Grid |
| On a shelf | **On shelf** | Grid |

Prefer picking the name. If you leave it empty, order is Another SKU → Detail → In hand → On shelf.

### Prints

| Add | This photo is for | On the page |
|---|---|---|
| Lead print | **Cover** | Fan at the top |
| Bag | **Bag** | Full chapter |
| Stationery | **Letterhead** | Full chapter |
| Poster | **Poster** | Full chapter |

### Social Media

| Add | This photo is for | On the page |
|---|---|---|
| Lead frame | **Cover** | Inside the phone |
| Story frame | **Story** | Inside the phone |
| Campaign frame | **Campaign** | Inside the phone |

### Outdoors

| Add | This photo is for | On the page |
|---|---|---|
| Billboard art | **Cover** | Billboard |
| City | **City** | Chapter below |
| Vehicle | **Vehicle** | Chapter below |

### Brand Strategy

Cover is still required to publish. The page opens with the name and short description.

| Add | This photo is for | On the page |
|---|---|---|
| Cover image | **Cover** | Required to publish |
| Current state | **Now** | Timeline |
| Direction | **Horizon** | Timeline |
| How you get there | **Path** | Timeline |

### Marketing Strategy

Same layout. Cover is required to publish.

| Add | This photo is for | On the page |
|---|---|---|
| Spend | **Budget** | Timeline |
| Timing | **Time** | Timeline |
| Channels | **Mix** | Timeline |

### Photos

| Add | This photo is for | On the page |
|---|---|---|
| Lead | **Cover** | First thumbnail |
| Portrait | **Portrait** | Strip |
| Detail | **Detail** | Strip |
| Wide | **Wide** | Strip |

### Videos

| Add | Field | On the page |
|---|---|---|
| Film | **Cover** → **Upload video** | Player |
| Still | **Video thumbnail** | Before play |

No Extra photos for Videos.

### NFC Card

| Add | This photo is for | On the page |
|---|---|---|
| Front | **Cover** | First screen |
| Reverse | **Back** | Chapter below |
| In use | **In hand** | Chapter below |

### NFC Ring

| Add | This photo is for | On the page |
|---|---|---|
| Product | **Cover** | First screen |
| Worn | **On hand** | Chapter below |
| Close-up | **Detail** | Chapter below |

### NFC Medal

| Add | This photo is for | On the page |
|---|---|---|
| Product | **Cover** | First screen |
| Worn | **Worn** | Chapter below |
| Close-up | **Detail** | Chapter below |

---

## How to change the sentences on the page

Every visible line (except the site Back button) can be changed. Empty = the default sentence stays.

**On the Extra photo** (best for a chapter that has a picture): Small line, Headline, Paragraph.

**In Page sentences:** Cover line and labels that are not tied to one photo.

Order the site uses: Extra photo text → Page sentences → default.

### Packaging (full example)

| On the live page | Where to edit |
|---|---|
| Small line above the cover pack | **Page sentences → Cover line** |
| Project name | **Project name** |
| Line under the name | **Short description** |
| Range chapter (text + Detail photo) | Extra photo **Detail**: Small line, Headline, Paragraph — or **Page sentences → Detail** |
| Label above the pack grid | **Page sentences → Grid label** |
| Labels on grid photos | Extra photo **Another SKU / In hand / On shelf**: Photo label or Paragraph |

### Brand Identity

| On the live page | Where to edit |
|---|---|
| Line above the cover | **Page sentences → Cover line** |
| Logo chapter | Extra photo **Logo**, or **Page sentences → Logo** |
| Brand book chapter | Extra photo **Brand book**, or **Page sentences → Brand book** |
| Pack / card / environmental | Extra photo **Packaging / Business card / Environmental** (Small line, Headline, Paragraph) |
| Those three photo labels | **Page sentences → Photo labels** |

### Prints, Outdoors, NFC

Cover + Extra photos. Each extra chapter: Small line, Headline, Paragraph on that photo. Outdoors Cover line is in **Page sentences**. NFC cover line is **Wear line**.

### Social, Photos, Videos

**Page sentences → Cover line**. Photo labels on Extra photos. Short description under the title.

### Brand / Marketing strategy

**Page sentences → Cover line** and **Strategy steps**, or Small line / Headline / Paragraph on **Now / Horizon / Path** (or Budget / Time / Mix).

Leave a field empty to keep the default. **Publish**, then hard-refresh.

A chapter still needs its Extra photo. Text without a photo does not appear.

---

## Site pages (not a project)

| In Studio | Live page |
|---|---|
| **Homepage** | `/` |
| **About** | `/about` |
| **NFC page** | `/nfc` |
| **Site media** | Intro / showreel |

Fill English and Arabic when the site switches language.

---

## Before you leave Studio

- [ ] Service is correct
- [ ] Project name and short description
- [ ] Cover uploaded
- [ ] One Extra photo per extra chapter, with the right **This photo is for**
- [ ] Sentences only if you need different words (Extra photo or Page sentences)
- [ ] **Publish**
- [ ] Live page checked after a hard-refresh

If a chapter is missing, that photo was not added or not published.
