"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiCheck, FiMinus, FiPlus } from "react-icons/fi";
import { useStoreCopy } from "@/components/cms/PageCopy";
import NoisyBg from "@/components/global/NoisyBg";
import { cn } from "@/lib/utils";
import {
  formatStorePrice,
  localeOf,
  storeItemCopy,
  storeItemImage,
  storeItemOffers,
  storeItemPrice,
  storeOfferLabel,
  STORE_PRODUCT_COPY,
  type StoreIntent,
  type StoreItemKey,
} from "@/lib/store-catalog";

const QTY_MIN = 1;
const QTY_MAX = 50;

export default function StoreRequest({ itemKey }: { itemKey: StoreItemKey }) {
  const { t, i18n } = useTranslation();
  const cms = useStoreCopy();
  const isArabic = i18n.language.startsWith("ar");
  const copy = STORE_PRODUCT_COPY[localeOf(i18n.language)];
  const kicker = storeItemCopy(cms, i18n.language, itemKey, "kicker");
  const title = storeItemCopy(cms, i18n.language, itemKey, "title");
  const line = storeItemCopy(cms, i18n.language, itemKey, "line");
  const image = storeItemImage(cms, itemKey);
  const price = storeItemPrice(cms, itemKey);
  const offers = storeItemOffers(cms, i18n.language, itemKey);
  const packs = [{ qty: 1, price, badge: undefined as string | undefined }, ...offers];
  const [intent, setIntent] = useState<StoreIntent>("quote");
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">(
    "idle",
  );
  const [error, setError] = useState("");
  const matched = packs.find((pack) => pack.qty === qty);
  const totalPrice = matched ? matched.price : price * qty;
  const offerLabel = matched
    ? storeOfferLabel(matched.qty, i18n.language)
    : `${t("store.form.custom")} · ${storeOfferLabel(qty, i18n.language)}`;

  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1);
    setIntent("quote");
    document.documentElement.classList.add("store-page");
    return () => document.documentElement.classList.remove("store-page");
  }, [itemKey]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (!name || phone.length < 8) {
      setStatus("error");
      setError(t("store.form.required"));
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/store/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: itemKey,
          itemTitle: title,
          intent,
          name,
          phone,
          email: String(data.get("email") ?? "").trim(),
          company: String(data.get("company") ?? "").trim(),
          note: String(data.get("note") ?? "").trim(),
          language: i18n.language,
          qty,
          offer: offerLabel,
          unitPrice: price,
          totalPrice,
        }),
      });
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!response.ok || !payload?.ok) {
        setStatus("error");
        setError(t("store.form.error"));
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError(t("store.form.error"));
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-[#e7e2d8] bg-white px-3.5 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-main-green disabled:opacity-50";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-x-clip bg-white text-neutral-950"
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden>
        <NoisyBg />
      </div>
      <section className="relative z-10 mx-auto max-w-[1100px] px-5 pb-24 pt-24 md:px-8 md:pt-28">
        <Link
          href={`/store/${itemKey}`}
          className="inline-flex items-center gap-2 text-[12px] font-semibold text-neutral-500 transition hover:text-neutral-950"
        >
          {isArabic ? <FaArrowRight size={11} /> : <FaArrowLeft size={11} />}
          {t("store.form.back")}
        </Link>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <aside className="overflow-hidden rounded-[1.6rem] bg-white ring-1 ring-[#e7e2d8]">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f3efe8]">
              <img src={image} alt={title} className="h-full w-full object-cover" />
            </div>
            <div className="p-5 md:p-6">
              <span className="inline-flex rounded-full bg-main-green/10 px-2.5 py-0.5 text-[11px] font-medium text-main-green">
                {kicker}
              </span>
              <h1 className="mt-3 text-[26px] font-bold tracking-tight text-neutral-950 md:text-[32px]">
                {title}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {line}
              </p>
              <p className="mt-4 text-[22px] font-semibold tracking-tight text-neutral-950">
                {formatStorePrice(totalPrice, i18n.language)}
              </p>
              <p className="mt-1 text-[12px] text-neutral-400">
                {offerLabel}
                {qty === 1 ? ` · ${copy.perPiece}` : ""}
              </p>
            </div>
          </aside>

          <div className="rounded-[1.6rem] bg-white p-5 ring-1 ring-[#e7e2d8] md:p-8">
            {status === "success" ? (
              <div className="flex min-h-[28rem] flex-col items-center justify-center gap-4 px-4 py-10 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-main-green/10 text-main-green">
                  <FiCheck size={26} />
                </span>
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-neutral-950">
                    {t("store.form.successTitle")}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                    {t("store.form.successLine")}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href={`/store/${itemKey}`}
                    className="inline-flex items-center justify-center rounded-full bg-main-green px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-white transition hover:bg-main-dark-green"
                  >
                    {t("store.form.back")}
                  </Link>
                  <Link
                    href="/store"
                    className="inline-flex items-center justify-center rounded-full border border-[#e7e2d8] px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-neutral-600 transition hover:border-neutral-400 hover:text-neutral-950"
                  >
                    {t("store.form.done")}
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-main-green">
                    {t("store.form.title")}
                  </p>
                  <h2 className="mt-1 text-2xl font-black tracking-tight text-neutral-950">
                    {title}
                  </h2>
                </div>

                <fieldset className="space-y-2">
                  <legend className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
                    {t("store.form.intent")}
                  </legend>
                  <div className="grid grid-cols-2 gap-2">
                    {(["quote", "order"] as const).map((value) => (
                      <label
                        key={value}
                        className={`cursor-pointer rounded-full border px-3 py-2.5 text-center text-[10px] font-bold uppercase tracking-widest transition ${
                          intent === value
                            ? "border-main-green bg-main-green text-white"
                            : "border-[#e7e2d8] text-neutral-500 hover:border-neutral-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="intent"
                          value={value}
                          checked={intent === value}
                          onChange={() => setIntent(value)}
                          className="sr-only"
                        />
                        {t(`store.form.${value}`)}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
                      {t("store.form.qty")}
                    </p>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#e7e2d8] bg-white px-1 py-1">
                      <button
                        type="button"
                        disabled={status === "submitting" || qty <= QTY_MIN}
                        onClick={() => setQty((n) => Math.max(QTY_MIN, n - 1))}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-40"
                        aria-label="-"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold tabular-nums">
                        {qty}
                      </span>
                      <button
                        type="button"
                        disabled={status === "submitting" || qty >= QTY_MAX}
                        onClick={() => setQty((n) => Math.min(QTY_MAX, n + 1))}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-40"
                        aria-label="+"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>
                  </div>

                  {packs.length > 1 ? (
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
                        {t("store.form.packs")}
                      </p>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {packs.map((pack) => {
                          const selected = pack.qty === qty;
                          return (
                            <button
                              key={pack.qty}
                              type="button"
                              disabled={status === "submitting"}
                              onClick={() => setQty(pack.qty)}
                              className={cn(
                                "relative rounded-2xl px-3 py-3 text-start ring-1 transition disabled:opacity-50",
                                selected
                                  ? "bg-main-green/5 ring-main-green/40"
                                  : "bg-white ring-[#e7e2d8] hover:ring-neutral-300",
                              )}
                            >
                              {pack.badge ? (
                                <span className="absolute -top-2 right-2 rounded-full bg-main-green px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white rtl:left-2 rtl:right-auto">
                                  {pack.badge}
                                </span>
                              ) : null}
                              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                                {storeOfferLabel(pack.qty, i18n.language)}
                              </p>
                              <p className="mt-1 text-[16px] font-semibold tracking-tight text-neutral-950">
                                {formatStorePrice(pack.price, i18n.language)}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  <p className="text-sm text-neutral-500">
                    <span className="font-semibold text-neutral-950">
                      {t("store.form.total")}: {formatStorePrice(totalPrice, i18n.language)}
                    </span>
                    {!matched ? (
                      <span className="ms-2 text-[11px] uppercase tracking-widest text-neutral-400">
                        {t("store.form.custom")}
                      </span>
                    ) : null}
                  </p>
                </div>

                <label className="space-y-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
                  {t("store.form.name")}
                  <input
                    name="name"
                    required
                    disabled={status === "submitting"}
                    placeholder={t("store.form.namePlaceholder")}
                    className={fieldClass}
                  />
                </label>
                <label className="space-y-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
                  {t("store.form.phone")}
                  <input
                    name="phone"
                    required
                    type="tel"
                    disabled={status === "submitting"}
                    placeholder={t("store.form.phonePlaceholder")}
                    className={fieldClass}
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
                    {t("store.form.email")}
                    <input
                      name="email"
                      type="email"
                      disabled={status === "submitting"}
                      placeholder={t("store.form.emailPlaceholder")}
                      className={fieldClass}
                    />
                  </label>
                  <label className="space-y-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
                    {t("store.form.company")}
                    <input
                      name="company"
                      disabled={status === "submitting"}
                      placeholder={t("store.form.companyPlaceholder")}
                      className={fieldClass}
                    />
                  </label>
                </div>
                <label className="space-y-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
                  {t("store.form.note")}
                  <textarea
                    name="note"
                    rows={4}
                    disabled={status === "submitting"}
                    placeholder={t("store.form.notePlaceholder")}
                    className={`${fieldClass} resize-none`}
                  />
                </label>

                {error ? (
                  <p className="text-xs font-medium text-main-red">{error}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-main-green px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-[0_14px_32px_rgba(14,152,93,0.25)] transition hover:bg-main-dark-green disabled:opacity-50"
                >
                  {status === "submitting"
                    ? t("store.form.submitting")
                    : t("store.form.submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
