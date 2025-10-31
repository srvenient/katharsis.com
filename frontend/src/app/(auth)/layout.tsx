'use client';

import React from 'react';
import { Navbar, NavbarProps } from './components/navbar/Navbar';
import { usePathname } from 'next/navigation';

export const NAVBAR_CONFIG: Record<string, NavbarProps> = {
  '/sign-up': {
    showBackground: false,
    buttonStyle: 'white',
  },
  default: {
    showBackground: true,
    buttonStyle: 'blue',
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const config = NAVBAR_CONFIG[pathname] || NAVBAR_CONFIG.default;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
    </div>
  );
}
