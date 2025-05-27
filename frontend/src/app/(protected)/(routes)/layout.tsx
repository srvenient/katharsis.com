"use client";

import React from "react";
import Sidebar from "@/app/(protected)/(routes)/dashboard/components/navigation";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
  return (
    <div
      className={`flex min-h-screen`}
    >
      <Sidebar/>
      <main className="flex-1 relative overflow-y-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-[url('/body-background.png')] bg-position-[100%_0] bg-no-repeat z-0 blur-3xl bg-fixed"
        />
        <div className="relative z-10 w-full max-w-[82vw]">
          {children}
        </div>
      </main>
    </div>
  )
}