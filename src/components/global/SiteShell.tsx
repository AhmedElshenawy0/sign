"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isStudio = pathname.startsWith("/studio");
  const isProjectJourney = /^\/projects\/[^/]+$/.test(pathname);
  const hideChrome = isAdmin || isProjectJourney || isStudio;

  const frame = (
    <div
      className={
        isAdmin
          ? "min-h-screen bg-slate-950"
          : isStudio
            ? "min-h-screen"
            : "overflow-x-clip"
      }
    >
      {!hideChrome && <Navbar />}
      {children}
      {!hideChrome && <Footer />}
    </div>
  );

  if (isAdmin || isStudio) return frame;
  return <SmoothScroll>{frame}</SmoothScroll>;
}
