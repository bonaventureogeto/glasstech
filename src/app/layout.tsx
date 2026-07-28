import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Fraunces,
  Inter,
  Space_Mono,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: "italic",
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Glasstech & Interior Solutions | Automotive & Architectural Glass in Nairobi",
  description:
    "Precision-cut, professionally installed glass for Kenya\u2019s cars, homes and buildings. Windshields, shower cubicles, office partitions, facades and more \u2014 measured on site, fabricated to spec.",
  openGraph: {
    title: "Glasstech & Interior Solutions | Automotive & Architectural Glass",
    description:
      "Precision-cut, professionally installed glass for Kenya\u2019s cars, homes and buildings. Measured on site, fabricated to spec, fitted by professionals.",
    type: "website",
    locale: "en_KE",
    siteName: "Glasstech & Interior Solutions Limited",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${fraunces.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
