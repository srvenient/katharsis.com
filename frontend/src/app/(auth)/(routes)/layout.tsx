"use client";

import React from "react";
import Footer from "@/components/footer/Footer";
import {usePathname, useRouter} from "next/navigation";
import {Navbar} from "@/app/(auth)/components/navbar";
import {CornerDownLeftIcon} from "lucide-react";

export default function AuthLayout({children}: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      {["/sign-in", "/sign-up"].includes(pathname) && (
        <Navbar
          title={pathname === "/sign-in" ? "Acceso a Katharsis" : "Registro en Katharsis"}
          showButton={true}
          buttonAction={() => router.push(pathname === "/sign-in" ? "/" : "/sign-in")}
          buttonIcon={pathname === "/sign-in" ? undefined : CornerDownLeftIcon}
        />
      )}
      <main
        className={`flex flex-col items-center justify-center px-4 h-screen ${pathname !== "/reset-password" ? "bg-white" : ""}`}
      >
        {children}
      </main>
      {pathname !== "/reset-password" && (
        <Footer/>
      )}
    </div>
  )
}