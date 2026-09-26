"use client";

import { motion } from "framer-motion";

type Props = {
  kicker?: string;
  title?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
};

export default function AdminFormCard({
  kicker,
  title,
  hint,
  children,
  className = "mx-auto max-w-[720px]",
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="overflow-hidden rounded-[16px] border border-white/10 bg-[#0c1220]/85 shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0e985d] to-transparent" />
          <div className="p-4 sm:p-6 md:p-8">
          {kicker || title || hint ? (
            <div className="mb-7">
              {kicker ? (
                <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#0e985d]">
                  {kicker}
                </p>
              ) : null}
              {title ? (
                <h2 className="mt-2 text-[22px] font-semibold tracking-tight text-white">
                  {title}
                </h2>
              ) : null}
              {hint ? (
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">
                  {hint}
                </p>
              ) : null}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export function FormSection({
  kicker,
  hint,
  children,
  className = "",
}: {
  kicker: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mb-7 border-b border-white/10 pb-7 last:mb-0 last:border-0 last:pb-0 ${className}`}>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
        {kicker}
      </p>
      {hint ? <p className="mb-4 text-sm text-slate-400">{hint}</p> : null}
      {children}
    </section>
  );
}
