import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://glasstechandinteriors.com"),
  title:
    "Glasstech & Interior Solutions | Automotive & Architectural Glass in Nairobi",
  description:
    "Precision-cut, professionally installed glass for Kenya\u2019s cars, homes and buildings. Windshields, shower cubicles, office partitions, facades and more \u2014 measured on site, fabricated to spec.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Glasstech & Interior Solutions | Automotive & Architectural Glass",
    description:
      "Precision-cut, professionally installed glass for Kenya\u2019s cars, homes and buildings. Measured on site, fabricated to spec, fitted by professionals.",
    type: "website",
    locale: "en_KE",
    siteName: "Glasstech & Interior Solutions Limited",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Glasstech & Interior Solutions \u2014 Automotive & architectural glass, Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glasstech & Interior Solutions | Automotive & Architectural Glass",
    description:
      "Precision-cut, professionally installed glass for Kenya\u2019s cars, homes and buildings.",
    images: ["/og.jpg"],
  },
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
