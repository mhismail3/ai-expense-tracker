import './globals.css';
import { ReactNode } from 'react';
import MobileNav from '@/components/MobileNav';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
