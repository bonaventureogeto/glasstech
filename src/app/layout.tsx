import type { Metadata, Viewport } from "next";
import { Figtree, Inter } from "next/font/google";
import { experience, localBusinessSchema, SITE_URL } from "@/content/company";
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

// The experience figure comes from company.ts, so it follows the stat label.
const description = `Automotive and architectural glass in Nairobi: windshields, shower cubicles, partitions and facades from a team with ${experience}.`;

const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Glasstech and Interior Solutions logo beside a black-framed glass conservatory the team installed",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Glasstech & Interior Solutions | Automotive & Architectural Glass in Nairobi",
  description,
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Glasstech & Interior Solutions | Automotive & Architectural Glass",
    description,
    url: "/",
    type: "website",
    locale: "en_KE",
    siteName: "Glasstech & Interior Solutions Limited",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glasstech & Interior Solutions | Automotive & Architectural Glass",
    description,
    images: [ogImage],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
