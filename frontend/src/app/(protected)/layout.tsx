'use client';

import { useAuthSync } from './hooks/useAuthSync';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuthSync();

  return <>{children}</>;
}
