import { Router } from "express";

const ITEM_KEYS = new Set([
  "nfc_card",
  "nfc_stand",
  "nfc_ring",
  "nfc_medal",
  "nfc_keytag",
  "nfc_sticker",
  "nfc_band",
  "nfc_badge",
]);

const INTENTS = new Set(["quote", "order"]);

function clip(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

function clipInt(value: unknown, min: number, max: number, fallback: number) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

export const storeRouter = Router();

storeRouter.post("/request", async (req, res) => {
  const item = clip(req.body?.item, 40);
  const intent = clip(req.body?.intent, 16).toLowerCase();
  const name = clip(req.body?.name, 80);
  const phone = clip(req.body?.phone, 40);
  const email = clip(req.body?.email, 120);
  const company = clip(req.body?.company, 80);
  const note = clip(req.body?.note, 500);
  const itemTitle = clip(req.body?.itemTitle, 80) || item;
  const language = clip(req.body?.language, 8) || "en";
  const qty = clipInt(req.body?.qty, 1, 50, 1);
  const unitPrice = clipInt(req.body?.unitPrice, 0, 1_000_000, 0);
  const totalPrice = clipInt(req.body?.totalPrice, 0, 1_000_000, 0);
  const offer = clip(req.body?.offer, 80);

  if (!ITEM_KEYS.has(item) || !INTENTS.has(intent) || !name || phone.length < 8) {
    res.status(400).json({ error: "Name, phone, item, and intent are required." });
    return;
  }

  const webhook = process.env.STORE_SHEET_WEBHOOK_URL?.trim();
  if (!webhook) {
    res.status(503).json({ error: "Store requests are not configured." });
    return;
  }

  const timestamp = new Date().toISOString();
  const payload = {
    timestamp,
    intent,
    item,
    itemTitle,
    name,
    phone,
    email,
    company,
    note,
    language,
    qty,
    offer,
    unitPrice,
    totalPrice,
    notifyEmail: process.env.STORE_NOTIFY_EMAIL?.trim() || "",
  };

  try {
    const sheetResponse = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    if (!sheetResponse.ok) {
      res.status(502).json({ error: "Could not save the request." });
      return;
    }
  } catch (error) {
    console.error("[store-request]", error);
    res.status(502).json({ error: "Could not save the request." });
    return;
  }

  res.json({ ok: true });
});
