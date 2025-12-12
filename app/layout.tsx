import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

import { SmoothScroll } from "@/components/smooth-scroll";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontDisplay = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://automotive-demo-site.vercel.app"),
  title: "Pro Auto Services",
  description: "Dealer precision. Local heart.",
  openGraph: {
    title: "Pro Auto Services",
    description: "Dealer precision. Local heart. High-end automotive care for tires, mechanics, and roadside response.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro Auto Services",
    description: "Dealer precision. Local heart.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontBody.variable} ${fontDisplay.variable}`}>
      <body className="min-h-screen font-body antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
