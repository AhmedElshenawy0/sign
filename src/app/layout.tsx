import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import SiteShell from "@/components/global/SiteShell";

export const metadata: Metadata = {
  title: "Sign Up — Creative Marketing Studio",
  icons: {
    icon: "/apple-touch-icon-0e985d.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
