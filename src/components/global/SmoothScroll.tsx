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
