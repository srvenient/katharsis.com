"use client";

import {useRouter, useSearchParams} from "next/navigation";
import React, {useEffect} from "react";
import ResetPasswordForm from "@/app/(auth)/(routes)/reset-password/components/form/ResetPasswordForm";

export default function ResetPassword() {
  const params = useSearchParams();
  const token = params.get("token");

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/sign-in");
    }
  }, [router, token]);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div
        className="absolute top-0 left-0 w-full h-full bg-[url('/hero-globe.svg')] bg-no-repeat bg-top bg-[length:100%] rotate-180 opacity-30 z-0 pointer-events-none"
      />
      <div
        className="absolute top-0 left-0 inset-0 w-full h-full bg-[url('/Orb-Footer.svg')] bg-no-repeat bg-[position:100%_0] bg-[length:100%] z-0 pointer-events-none"
      />
      <div className="absolute inset-0 w-full noise-overlay pointer-events-none opacity-20 "/>
      <div className="flex flex-col items-center justify-center md:flex-row w-full max-w-3xl overflow-hidden">
        <div className="text-neutral-50 w-full md:w-130 p-10 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-8 text-center z-20">
            Elija una nueva contraseña
          </h2>
          <ResetPasswordForm token={token}/>
          <button
            onClick={() => router.replace("/sign-in")}
            className="text-base text-neutral-700 text-center mt-4 cursor-pointer z-20 "
          >
              <span className="text-blue-600 underline font-medium hover:text-blue-500 transition-colors duration-200">
                Volver a iniciar sesión
              </span>
          </button>
        </div>
      </div>
    </div>
  )
}
