import type { Metadata } from "next";
import { Manrope, Oswald } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", weight: "variable" });
const display = Oswald({ 
  subsets: ["latin"], 
  variable: "--font-display", 
  weight: "variable"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://createforbrands.com"),
  title: {
    template: "%s | CREATE",
    default: "Creative Production Studio for Commercials, Branded Content & Campaigns | CREATE",
  },
  description: "CREATE is a creative production studio focused on commercials, branded content, campaigns, and visual storytelling.",
  keywords: ["creative production studio", "commercial production company", "branded content studio", "campaign production agency", "visual storytelling studio", "creative production company"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-brand-bg text-brand-ink min-h-screen flex flex-col relative antialiased">
        <CustomCursor />
        <Navigation />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
