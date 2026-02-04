import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EuroGames - Daily Puzzles",
  description: "European puzzle hub featuring Wurdle, MiniX crosswords, and EuroGrid. Daily word games and brain teasers.",
  keywords: ["wordle", "puzzle", "word game", "crossword", "daily puzzle", "european"],
  authors: [{ name: "EuroGames" }],
  openGraph: {
    title: "EuroGames - Daily Puzzles",
    description: "European puzzle hub featuring daily word games and brain teasers.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EuroGames - Daily Puzzles",
    description: "European puzzle hub featuring daily word games and brain teasers.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
