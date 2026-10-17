"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

function LenisPageSync() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  useEffect(() => {
    if (!lenis) return;

    const sync = () => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    return () => observer.disconnect();
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const nativeScroll =
    pathname === "/store" || pathname.startsWith("/store/");

  useEffect(() => {
    const html = document.documentElement;
    if (!nativeScroll) {
      html.classList.remove("store-page");
      return;
    }

    html.classList.add("store-page");
    html.classList.remove("lenis", "lenis-smooth", "lenis-stopped");
    html.style.removeProperty("height");
    html.style.removeProperty("overflow");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("height");
    document.body.style.removeProperty("position");
    return () => html.classList.remove("store-page");
  }, [nativeScroll]);

  if (nativeScroll) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.09,
        smoothWheel: true,
        anchors: true,
        autoToggle: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
        prevent: (node) => Boolean(node.closest("[data-lenis-prevent]")),
      }}
    >
      <LenisPageSync />
      {children}
    </ReactLenis>
  );
}
