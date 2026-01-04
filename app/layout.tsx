import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _inter = Inter({ subsets: ["latin"] });
const _playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BertAndre Consulting - Business Growth & Diversified Solutions",
  description: "Leading multi-sector consulting firm in Nigeria providing expert solutions in Business Strategy, Real Estate, Automotive Diagnostics, and Renewable Energy.",
  keywords: [
    "Primquisite Real Estate Nigeria", "Trusted real estate company in Nigeria", "Top real estate company in Nigeria",
    "Best real estate company in Lagos", "Professional real estate consultants Nigeria", "Real estate company in Lekki",
    "Trusted real estate company in Lekki", "Best real estate firm in Lekki Lagos", "Property consultants in Lekki",
    "Real estate company Lagos", "Real estate consulting Nigeria", "Property investment consultants Nigeria",
    "Safe real estate investment Lagos", "Property developer Nigeria", "Buy property in Lekki",
    "Property investment Nigeria", "Lagos real estate experts", "Real estate company near me", "Property consultant near me",
    "Bertandre Group", "Bertandre Nigeria", "Leading consulting group in Nigeria", "Business & real estate consulting Nigeria",
    "Tech-driven business solutions Nigeria", "Trusted business consulting firm Nigeria", "Multi-sector consulting firm Africa",
    "Top consulting firm in Nigeria", "Business growth experts Nigeria", "Business consulting firm Nigeria",
    "Tech consulting Nigeria", "Business strategy consultants Lagos", "SME consulting Nigeria", "Financial consulting Nigeria",
    "Digital transformation consultants Africa", "Business growth consultants Nigeria", "Strategy and operations consulting Africa",
    "Autodate Nigeria", "Automotive solutions Nigeria", "Vehicle diagnostics Nigeria", "Auto service company Nigeria",
    "Car maintenance solutions Lagos", "Reliable auto service Nigeria", "Professional automotive company Lagos",
    "Saair Energy", "Renewable energy company Nigeria", "Power solutions Nigeria", "Solar energy solutions Nigeria",
    "Energy consulting Nigeria", "Trusted energy company Nigeria", "Sustainable energy solutions Africa",
    "Management consulting Nigeria", "Operational excellence consultants", "Project management services Lagos",
    "Corporate strategy advisory Nigeria", "Market research consultants Africa", "Human resources consulting Nigeria",
    "Risk management consultants", "Business process optimization", "Supply chain consulting Nigeria",
    "Institutional strengthening consultants"
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
