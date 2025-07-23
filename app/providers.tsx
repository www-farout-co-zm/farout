'use client';

import { CartProvider } from '@/contexts/CartContext';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <CartProvider>
        {children}
      </CartProvider>
    </ThemeProvider>
  );
}
