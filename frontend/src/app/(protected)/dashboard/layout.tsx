'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';
import Sidebar from './components/navigation/sidebar/Sidebar';
import Navbar from './components/navigation/navbar/Navbar';
import { usePathname } from 'next/navigation';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-jakarta',
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className={`flex min-h-screen relative ${jakarta.className}`}>
      <div
          className="
            absolute inset-0
            w-full h-full
            bg-[url('/images/body-background.webp'),linear-gradient(310deg,rgb(15,18,59)14.25%,rgb(9,13,46)56.45%,rgb(2,5,21)86.14%)]
            bg-cover
            bg-no-repeat
            bg-left
            blur-3xl
            z-0
          "
        />

      <aside className="relative z-10 py-4 px-5">
        <Sidebar />
      </aside>

      <div className="relative z-10 flex-1 flex flex-col">
        <header className="sticky top-0 z-2">
          <Navbar />
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[82vw]">{children}</div>
        </main>
      </div>
    </div>
  );
}
