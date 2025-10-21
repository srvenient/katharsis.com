'use client';

import { useAuthSync } from '../hooks/useAuthSync';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuthSync();

  return (
    <div className={`flex min-h-screen`}>
      <div className="absolute inset-0 w-full h-full bg-[url('/body-background.png')] bg-position-[100%_0] bg-no-repeat z-0 blur-xl" />

      <main className="relative flex-1">
        <div className="mx-auto w-full max-w-[82vw]">{children}</div>
      </main>
    </div>
  );
}
