"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioApp({ configured }: { configured: boolean }) {
  if (!configured) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05070c] px-6 text-center text-white">
        <div className="max-w-md space-y-3">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#0e985d]">
            Sanity
          </p>
          <h1 className="text-2xl font-semibold">Studio is not configured</h1>
          <p className="text-sm leading-relaxed text-slate-400">
            Create a project at sanity.io, then set{" "}
            <code className="text-white">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
            <code className="text-white">NEXT_PUBLIC_SANITY_DATASET</code> in{" "}
            <code className="text-white">.env.local</code>. Restart Next and open{" "}
            <code className="text-white">/studio</code> again.
          </p>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
