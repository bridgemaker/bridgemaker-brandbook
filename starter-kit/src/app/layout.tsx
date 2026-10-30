import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Material Symbols Outlined (wght 300), selbst gehostet — Kopie aus
// ../assets/fonts/. Klasse .material-symbols-outlined in globals.css.
const materialSymbols = localFont({
  src: "./fonts/MaterialSymbolsOutlined-300.woff2",
  variable: "--font-material-symbols",
  weight: "300",
  display: "block",
});

export const metadata: Metadata = {
  title: "Bridgemaker Starter-Kit",
  description: "Wir bauen Ventures, die wirken.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: Browser-Extensions (z. B. GA-Opt-out) stempeln
    // Attribute aufs <html>, bevor React hydriert — nur dieses Element betroffen.
    <html
      lang="de"
      className={`${inter.variable} ${jetbrainsMono.variable} ${materialSymbols.variable}`}
      suppressHydrationWarning
    >
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
