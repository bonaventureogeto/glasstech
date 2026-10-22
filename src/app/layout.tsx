import type { Metadata, Viewport } from "next";
import { Figtree, Inter } from "next/font/google";
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

const description =
  "Precision-cut, professionally installed glass for Kenya\u2019s cars, homes and buildings. Windshields, shower cubicles, office partitions and facades, measured on site and fabricated at our Sunrise Centre workshop on the Northern Bypass, Nairobi.";

const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Glasstech and Interior Solutions logo beside a black-framed glass conservatory the team installed",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.glasstech.co.ke"),
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
    description:
      "Precision-cut, professionally installed glass for Kenya\u2019s cars, homes and buildings, from one Nairobi workshop.",
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
    <html lang="en" className={`${figtree.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
