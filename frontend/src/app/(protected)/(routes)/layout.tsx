"use client";

import React from "react";
import Sidebar from "@/app/(protected)/components/sidebar";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
  return (
    <div
      className={`flex min-h-screen`}
    >
      <div
        className="absolute inset-0 w-full h-full bg-[url('/body-background.png')] bg-position-[100%_0] bg-no-repeat z-0 blur-xl"
      />

      <Sidebar/>
      <main className="flex-1 relative">
        <div className="relative z-10 w-full max-w-[82vw]">
          {children}
        </div>
      </main>
    </div>
  )
}