"use client";

import { createContext, useContext, type ReactNode } from "react";
import type {
  SanityAboutPage,
  SanityHomePage,
  SanityNfcPage,
} from "@/lib/sanity.queries";

const HomeCopy = createContext<SanityHomePage | null>(null);
const AboutCopy = createContext<SanityAboutPage | null>(null);
const NfcCopy = createContext<SanityNfcPage | null>(null);

export function HomeCopyProvider({
  value,
  children,
}: {
  value: SanityHomePage | null;
  children: ReactNode;
}) {
  return <HomeCopy.Provider value={value}>{children}</HomeCopy.Provider>;
}

export function AboutCopyProvider({
  value,
  children,
}: {
  value: SanityAboutPage | null;
  children: ReactNode;
}) {
  return <AboutCopy.Provider value={value}>{children}</AboutCopy.Provider>;
}

export function NfcCopyProvider({
  value,
  children,
}: {
  value: SanityNfcPage | null;
  children: ReactNode;
}) {
  return <NfcCopy.Provider value={value}>{children}</NfcCopy.Provider>;
}

export function useHomeCopy() {
  return useContext(HomeCopy);
}

export function useAboutCopy() {
  return useContext(AboutCopy);
}

export function useNfcCopy() {
  return useContext(NfcCopy);
}
