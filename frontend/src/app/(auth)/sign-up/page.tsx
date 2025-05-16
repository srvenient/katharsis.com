"use client";

import React, {useState} from "react";
import Link from "next/link";
import SignUpForm from "@/app/(auth)/components/form/SignUpForm";
import Navbar from "@/app/(auth)/components/header/Navbar";
import {useRouter} from "next/navigation";

function Stepper({ currentStep }: { currentStep: number }) {
  const steps = [1, 2, 3];
  return (
    <div className="flex justify-center mb-1 space-x-2">
      {steps.map((step) => (
        <div
          key={step}
          className={`w-2.5 h-2.5 rounded-full flex items-center justify-center text-white font-semibold
            ${currentStep === step ? "bg-green-700 shadow-[0_0_0_4px_rgba(187,247,208,0.4)] scale-110" : "border border-neutral-400 scale-95"}
            ${currentStep > step ? "bg-green-700 scale-95" : ""}
          `}
        >
        </div>
      ))}
    </div>
  );
}

export default function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [step, setStep] = useState(1);

  const router = useRouter();

  return (
    <>
      <Navbar title={"Crear cuenta"} showButton={true} buttonAction={() => router.push("/sign-in")} />
      <main className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="-mt-32">
          {error && (
            <div className="w-full max-w-3xl mt-52 -mb-6 md:-mt-4 md:mb-4">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            </div>
          )}
          {success && (
            <div className="w-full max-w-3xl mt-52 -mb-6 md:-mt-4 md:mb-4">
              <div className="bg-green-100 border border-green-400 text-green-700 text-center px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">Has sido registrado correctamente. Revisa tu correo para activar tu cuenta.</span>
              </div>
            </div>
          )}
          <div className="flex flex-col items-center justify-center w-full max-w-4xl">
            <div className="flex flex-col items-center justify-center w-full md:w-110 text-theme-charcoal">
              <Stepper currentStep={step} />
              <h2 className="text-4xl font-bold mb-8 text-center md:text-left">
                Bienvenido.
              </h2>
            </div>
            <div className="text-theme-charcoal w-full md:w-110 px-10">
              <SignUpForm setErrorAction={setError} setSuccessAction={setSuccess} step={step} setStepAction={setStep} />

              <hr className="my-6 border-neutral-300"/>

              <p className="text-sm text-neutral-700 text-center">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/sign-in" className="text-blue-600 hover:underline font-medium">
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}