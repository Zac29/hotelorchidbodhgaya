
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotel Orchid Bodhgaya | Luxury Stay Near Mahabodhi Temple",
  description:
    "Hotel Orchid Bodhgaya offers peaceful, modern hospitality near the sacred Mahabodhi Temple, with elegant rooms, dining and warm guest support.",

  icons: {
    icon: [
      {
        url: "/orchid-mark.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/orchid-mark.svg",
  },

  openGraph: {
    title: "Hotel Orchid Bodhgaya",
    description: "A peaceful stay near Mahabodhi Temple.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
