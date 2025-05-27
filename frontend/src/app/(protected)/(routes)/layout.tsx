"use client";

import React from "react";
import Sidebar from "@/app/(protected)/(routes)/dashboard/components/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-jakarta",
});

export default function DashboardLayout({children}: { children: React.ReactNode }) {
  return (
    <div
      className={`flex min-h-screen ${jakarta.className}`}
    >
      <Sidebar/>
      <main
        className={`flex items-center justify-center h-screen`}
      >
        <div
          className="absolute inset-0 w-full h-full bg-[url('/body-background.png')] bg-position-[150%_0] bg-no-repeat z-0 blur-3xl"
        />
        {children}
      </main>
    </div>
  )
}