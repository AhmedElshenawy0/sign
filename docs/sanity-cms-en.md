# Sign Up CMS — Team guide

How to add a project, how to edit one, and what every field is for.

**Open Studio:** `/studio` on the website (on a computer: `http://localhost:3000/studio`).

After every change, click **Publish**. If you only type and leave, the live site does not update.

---

## 1. Remember these four things

1. An empty field keeps the site’s current default text or photo. Empty does **not** delete a section.
2. When you change a sentence, fill **English and Arabic**.
3. You can add, edit, and delete **Projects**. There are many of them.
4. **Homepage, About, NFC page, Store page, Intro & showreel** are one document each. Edit them. Do not try to create a second Homepage.

---

## 2. What you see on the left

| Sidebar item | What it is | Can you add another? |
|---|---|---|
| **Intro & showreel** | Home intro video + showreel film | No — edit only |
| **Homepage** | Home titles, numbers, partners, services text | No — edit only |
| **About** | About page text, founder, milestones | No — edit only |
| **NFC page** | NFC page text, product photos, which 1–2 cases show | No — edit only |
| **Store page** | Store titles, filter names, the 12 product tiles | No — edit only |
| **Projects** | Every work case on `/projects` | **Yes** — one document per case |

---

## 3. How to add a project

Use this when you have a new case for `/projects` (and for `/nfc` if it is NFC Card, Ring, or Medal). The form is short on purpose: name, service, cover first. Sentences and list order start closed.

1. Open Studio and sign in.
2. Click **Projects** on the left.
3. Click **+** or **Create** (top of the list). A new empty project opens. Do not open Homepage for this.
4. Type **Project name**.
5. Pick **Service** from the list (Brand Identity, Packaging, Videos, NFC Card, …). You cannot type a new service.
6. In **Cover**, upload the opening photo (image only). If Service is **Videos**, upload the film here instead, and add a **Video thumbnail** if you have a still.
7. Optional: **Extra photos** — click **Add item** for each extra chapter. Each item is a photo + which chapter it is.
8. Optional: **Short description** — one or two lines under the name. Leave empty to keep the default line.
9. Optional: open **Sentences (optional)** only if you want to change the default English/Arabic lines.
10. Optional: open **List order (optional)** to change **Order on Projects page** (smaller number = higher in the list).
11. Click **Publish**.
12. Check the live site: `/projects`, the same filter as Service, then open the case. If it is NFC, also check `/nfc`.

**Minimum to publish:** Project name + Service + Cover.

---

## 4. What each project field is for

| Field in Studio | What it does | If you leave it empty |
|---|---|---|
| **Project name** | Title on `/projects` and on the journey page. Required. | You cannot publish without it. |
| **Service** | Which filter the case sits under. Required. Pick from the list only. | You cannot publish without it. |
| **Cover** | Opening photo (image upload). If Service is Videos, film upload instead. Required. You may paste a URL. | You cannot publish without it. |
| **Video thumbnail** | Still image before the film plays. Only appears when Service is Videos. | Site default still, or none. |
| **Extra photos** | Each item is one extra chapter. Photo + chapter name. Hidden when Service is Videos. | Only the cover chapter shows. |
| **Short description** | One or two lines under the name on the site. | The default line for that service stays. |
| **Sentences (optional)** | Starts closed. Cover line and chapter sentences (English + Arabic). | Built-in default sentences stay. |
| **List order (optional)** | Starts closed. **Order on Projects page** — smaller number = higher up. Does not add photos. | Treated as 0. |

### Inside Cover (and any photo/video field)

Studio only shows the upload that matches the field. You do not see image and video together unless both are needed.

| Field | Use it when |
|---|---|
| **Upload image** | Cover (non-Videos), Extra photos, video thumbnail, intro poster. |
| **Upload video** | Cover when Service is Videos, homepage intro loop, showreel. |
| **Or paste a URL** | The file is already online. Leave empty if you uploaded above. |

### Inside each Extra photo

| Field | What it does |
|---|---|
| **Photo** | The image (or a URL). Required for that extra item. |
| **This photo is for** | Which chapter (Logo, In hand, Poster, …). If empty, Studio uses the next empty chapter for this service. |
| **Photo label** | Small caption on the photo. Not the chapter headline. |
| **Replace sentences on this photo** | Starts closed. Optional English + Arabic for this chapter only. Leave closed to keep Sentences (or the site default). |

Writing sentences without uploading that Extra photo will not show the chapter. **Photo first, then text.**

---

## 5. Service list (you pick one)

| Group on /projects | Service in Studio |
|---|---|
| Branding | Brand Identity · Packaging · Prints |
| Marketing | Social Media · Outdoors · Brand Strategy · Marketing Strategy |
| Photography & Videography | Photos · Videos |
| NFC (also on /nfc) | NFC Card · Ring · Medal |

---

## 6. Extra photo chapters by service

Use the matching chapter name. Videos have no extra photos — cover film only.

| Service | Extra chapters (in order) |
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

---

## 7. How to edit a project

1. Studio → **Projects**.
2. Click the project (use search if the list is long).
3. Change only what you need — name, service, cover, order, description, extra photos, or sentences.
4. Click **Publish**.
5. Check `/projects` and the journey. If it is NFC, check `/nfc` too.

If you change **Service** after photos are already there, open every Extra photo and re-check **This photo is for**. Chapters for Identity are not the same as Packaging or NFC.

---

## 8. How to delete a project

1. Open the project.
2. Click the **⋯** at the **top right** of the document (next to the X).
3. Click **Delete**, then confirm.

The case leaves `/projects`. If it was NFC, it also leaves the NFC examples grid. Keyboard shortcut: **Ctrl+Alt+D**.

You cannot delete Homepage, About, NFC page, Store page, or Intro & showreel. Those pages must stay.

---

## 9. Homepage

The home page is two documents. You only edit them — you never create a new one.

### Intro & showreel

| Field | What it is | If empty |
|---|---|---|
| Homepage intro loop | Video behind the home hero | Default intro video |
| Intro poster | Still image before the intro loads | Default still |
| Showreel video | Film in the hero player | Default intro video |
| Showreel eyebrow / title (EN + AR) | Text on the showreel | Default words |

### Homepage document — groups at the top of the form

| Group | What you can change | What you cannot |
|---|---|---|
| **Hero** | Studio pill, hero title, hero description (EN+AR). In the description keep the brand as `<1>Sign Up</1>` so it stays green. Partner logos: name + logo upload or URL. | If you add any partner logo, the old logo strip is replaced. Leave the list empty to keep the current logos. |
| **Stats** | The four numbers: years, clients, campaigns, satisfaction. | Labels, icons, + / % signs. |
| **About / Vision** | Titles and body for Who we are, What makes us different, Vision, Mission (EN+AR). | Button destination and panel layout. |
| **Process** | Main title/description, then Discover / Strategy / Execute / Optimize title + text. | A fifth step. Deliverable lists under each step. |
| **Services** | Eyebrow, title, then Service 1 through Service 6 (title, description, tag, stat). | A seventh service, videos, posters, or layout. |

Contact block, results chart, navbar, and footer are not in Studio.

---

## 10. About page

| Field | What it is |
|---|---|
| Hero eyebrow / title / description | Top of the About page (EN+AR) |
| Hero years / clients / campaigns numbers | The three numbers in the hero |
| What is Signup — eyebrow / title / body | The “what is Sign Up” block |
| Founder eyebrow / name / role / bio / photo | Founder section. Photo upload or URL |
| Milestones | Value + label (EN+AR) for each milestone |

You cannot change the About page layout from Studio.

---

## 11. NFC page

| Field | What it is |
|---|---|
| Eyebrow / Title / Description | Top of `/nfc` (EN+AR) |
| Store button label | Words on the green button. The button always opens `/store` |
| Store button hint | Small line under that button |
| Stand kicker / title / body / photo | Stand block text and photo (upload or URL) |
| Card / Ring / Medal kicker, title, body, photo | The three product blocks |
| Card / Ring / Medal examples | Up to 2 projects under each shape. Picker only shows matching Projects |

If an examples list is empty, the site shows the first two projects of that type by Order.

All NFC work still appears on `/projects`. Choosing examples here does not hide a case from Projects.

---

## 12. Store page

The shop has a **fixed set of 12 tiles**. Adding a Project does **not** add a shop tile.

| Field | What it is |
|---|---|
| Eyebrow / Title | Top of `/store` |
| Quote button label | Label on the WhatsApp button |
| Filter: All / Identity / Strategy / Campaign / Capture / NFC | Names of the filter chips |
| Catalog tiles | Each of the 12 products: Title, Line (EN+AR), Photo or URL |

Clear a tile field to restore the built-in photo or sentence. You cannot add a 13th tile, remove a tile, change the lookbook layout, or change the WhatsApp number.

---

## 13. English and Arabic

Most text fields have English and Arabic. Fill both when you replace a default.

If only one language is filled, the site may copy the other language, then fall back to the built-in default. Do not publish an English-only change and expect Arabic to keep the old default for that same field.

---

## 14. Before you Publish

**New project**

- Name + Service + Cover
- Extra photos only for chapters you want live
- **This photo is for** matches the service
- English + Arabic if you are not using defaults
- Publish, then check `/projects` (and `/nfc` if NFC)

**If something does not show on the site**

- Did you click **Publish**? Drafts stay invisible.
- Does that chapter have an Extra photo?
- Are you looking at the same Service filter as the project?
- Empty text fields use defaults on purpose — that is normal.

---

## 15. Can I…?

| Task | In Studio? |
|---|---|
| Add a Brand Identity / Packaging / NFC case | Yes — Create a Project |
| Change photos or sentences later | Yes — open the Project and Publish |
| Reorder cases on /projects | Yes — Order on Projects page |
| Delete a case | Yes — ⋯ → Delete |
| Add a new service type (for example Events) | No |
| Change journey layout or animation | No |
| Add a seventh home service | No |
| Change home intro / showreel video | Yes — Intro & showreel |
| Change hero title and partner logos | Yes — Homepage |
| Change NFC headings or product photos | Yes — NFC page |
| Choose which 1–2 cases sit under each NFC shape | Yes — NFC page examples |
| Point the NFC store button somewhere else | No — always /store |
| Change /store tile photos or titles | Yes — Store page |
| Add or remove a shop tile | No — 12 tiles are fixed |
| Change the WhatsApp number | No |
| Change navbar, footer, or colors | No |
