"use client";

import React, {useEffect, useRef} from "react";
import {useForm} from "react-hook-form";
import {XIcon} from "lucide-react";
import gsap from "gsap";
import {fastApiHttpClient} from "@/common/http-client/fastapi.http-client";

const name = "email";

type ForgotPasswordInput = {
  email: string;
};

export default function ForgotPasswordModal({onCloseAction}: { onCloseAction: () => void; }) {
  const modalRef = useRef<HTMLDivElement>(null);

  const methods = useForm<ForgotPasswordInput>({
    mode: "onChange",
    defaultValues: {
      email: "",
    }
  });
  const {register, handleSubmit, watch, formState: {isValid, errors}} = methods;

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const email = watch("email")

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        {opacity: 0, y: 40, scale: 0.95},
        {opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out"}
      );
    }
  }, []);

  const onSubmit = handleSubmit(async (data: ForgotPasswordInput) => {
    try {
      await fastApiHttpClient.passwordRecovery(data.email);
      setIsSubmitted(true);
    } catch (err: any) {
      console.log(err)
    }
  });

  const handleClose = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        y: -40,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onCloseAction
      });
    } else {
      onCloseAction();
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-500/70">
      <div ref={modalRef} className="bg-white p-6 shadow-md w-full max-w-md space-y-4">
        {isSubmitted ? (
          <>
            <h2 className="text-xl font-semibold">Revisa tu correo</h2>
            <hr className="my-2 border-t border-gray-300"/>
            <p className="text-sm text-balance text-neutral-700">
              Si una cuenta coincide con {email}, debería recibir en breve un correo electrónico con instrucciones para
              restablecer su contraseña.
            </p>
            <hr className="my-2 border-t border-gray-300"/>
            <div className="flex justify-start">
              <button
                onClick={handleClose}
                className="mt-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-800 transition-colors duration-300 cursor-pointer"
              >
                OK
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold">Recuperar contraseña</h2>
            <form
              onSubmit={onSubmit}
              className="space-y-6"
            >
              <p className="-mt-3 text-sm text-gray-700">
                Digite su correo electrónico para recibir instrucciones de recuperación.
              </p>
              <div className="relative w-full -mt-2">
                <input
                  id={name}
                  type="email"
                  placeholder=" "
                  inputMode="email"
                  {...register(name, {
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "El correo electrónico no es válido",
                    }
                  })}
                  className={`peer w-full border border-neutral-400 px-4 py-3 outline-none text-sm text-neutral-900 placeholder-transparent focus:border-blue-500 focus:caret-blue-500`}
                />
                <label
                  htmlFor={name}
                  className="absolute left-4 top-2 text-base text-neutral-500 bg-white px-1 transition-all
                    peer-placeholder-shown:top-2.5
                    peer-placeholder-shown:text-[15px]
                    peer-placeholder-shown:text-neutral-500
                    peer-focus:-top-2.5
                    peer-focus:text-sm
                    peer-focus:text-blue-500
                    peer-not-placeholder-shown:-top-2.5
                    peer-not-placeholder-shown:text-sm
                    pointer-events-none"
                >
                  Correo electrónico
                </label>
                {errors[name]?.message && (
                  <div
                    className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start items-center -space-y-2 md:space-y-0 text-red-700 text-sm text-center max-w-[350px] min-h-[20px] -mb-0.5">
                    <XIcon width={16}/>
                    <span className="whitespace-normal break-words">
                      {errors[name]?.message as string}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex w-full -mt-2 -mb-1 gap-1.5">
                <button
                  type="submit"
                  className={`w-1/2 px-4 py-2 bg-blue-600 text-white ${isValid ? "hover:bg-blue-800 transition-colors duration-300 cursor-pointer" : "opacity-75 cursor-not-allowed"}`}
                  disabled={!isValid}
                >
                  Enviar
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors duration-300 cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
