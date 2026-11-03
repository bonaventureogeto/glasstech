import type { Metadata, Viewport } from "next";
import { Figtree, Inter } from "next/font/google";
import { SITE_URL } from "@/content/company";
import { HOME_TITLE, SITE_NAME } from "@/lib/metadata";
import "./globals.css";

// Variable fonts: one file each covers Figtree 600-800 and Inter 400-700.
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Shared by every page. Each page sets its own title, description, canonical
// URL, Open Graph and Twitter cards with pageMetadata() (src/lib/metadata.ts).
// Pages without their own (the 404) fall back to the homepage title.
const gscToken = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { template: `%s | ${SITE_NAME}`, default: HOME_TITLE },
  applicationName: SITE_NAME,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  // Google Search Console's HTML tag: paste the token into NEXT_PUBLIC_GSC_VERIFICATION
  ...(gscToken && { verification: { google: gscToken } }),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${figtree.variable} ${inter.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
