import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

import LoadingScreen from "@/components/ui/LoadingScreen";
import { Header } from "@/components/Header";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: {
    default: 'FAR OUT - Premium Skate Shop',
    template: '%s | FAR OUT',
  },
  description: "Discover the latest in skateboarding gear and apparel. Shop decks, trucks, wheels, apparel and more from top brands.",
  keywords: ['skateboard', 'skate shop', 'skateboarding', 'decks', 'hardware', 'apparel', 'skate shoes'],
  openGraph: {
    title: 'FAR OUT - Premium Skate Shop',
    description: 'Discover the latest in skateboarding gear and apparel',
    url: 'https://faroutskateshop.com',
    siteName: 'FAR OUT',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'FAR OUT',
    card: 'summary_large_image',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

function RootLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 transition-colors">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:dark:bg-zinc-900 focus:text-black focus:dark:text-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
          >
            Skip to content
          </a>
          <LoadingScreen />
          <Header />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutContent>{children}</RootLayoutContent>;
}
