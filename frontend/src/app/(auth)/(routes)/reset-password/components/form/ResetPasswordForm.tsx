"use client";

import {FormProvider, useForm} from "react-hook-form";
import React, {useState} from "react";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import Button from "@/components/ui/button/Button";
import {Roboto_Mono} from "next/font/google"
import {fastApiHttpClient} from "@/common/http-client/fastapi.http-client";
import {useRouter} from "next/navigation";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

type ResetPasswordFormProps = {
  token: string | null
}

type Inputs = {
  password: string
  confirm_password: string
}

export default function ResetPasswordForm({token}: ResetPasswordFormProps) {
  const methods = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirm_password: ""
    }
  });
  const {handleSubmit, register, watch, formState: {isValid}} = methods

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");
  const confirmPassword = watch("confirm_password");

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = handleSubmit(async (data: Inputs) => {
    try {
      if (!token) {
        console.log(data);
        return;
      }
      await fastApiHttpClient.resetPassword(token, data.password);
      router.replace("/sign-in");
      alert("Password reset successfully!");
    } catch (err: any) {
      console.log(err)
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center gap-y-8 w-full"
      >
        <div className="relative flex flex-col items-start justify-center gap-4 w-full">
          <label
            htmlFor={"password"}
            className={`${robotoMono.className} text-sm`}
          >
            CONTRASEÑA
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className={`bg-neutral-300/20 peer w-full rounded-full px-6 py-4 outline-none text-base text-neutral-50 placeholder-transparent focus:border focus:border-blue-500 focus:caret-blue-500`}
              {...register("password", {
                required: "Contraseña es requerida.",
                minLength: {
                  value: 10,
                  message: "Tu contraseña es demasiado corta (mínimo 10 caracteres)."
                }
              })}
            />
            <div className="absolute inset-0 w-full h-full noise-overlay opacity-20 pointer-events-none rounded-full"/>
          </div>
          {password && password.length > 0 && (
            <button
              type="button"
              className="absolute right-5 top-7/12 transform"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <EyeIcon className="text-neutral-300 hover:text-blue-700 cursor-pointer"/>
              ) : (
                <EyeOffIcon className="text-neutral-300 hover:text-blue-700 cursor-pointer"/>
              )}
            </button>
          )}
        </div>
        <div className="relative flex flex-col items-start justify-center gap-4 w-full">
          <label
            htmlFor={"confirm_password"}
            className={`${robotoMono.className} text-sm`}
          >
            CONFIRMAR CONTRASEÑA
          </label>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`bg-neutral-300/20 peer w-full rounded-full px-6 py-4 outline-none text-base text-neutral-50 placeholder-transparent focus:border focus:border-blue-500 focus:caret-blue-500`}
              {...register("confirm_password", {
                required: "Contraseña es requerida.",
                validate: (value) => value === password || "Las contraseñas no coinciden."
              })}
            />
            <div className="absolute inset-0 w-full h-full noise-overlay opacity-20 pointer-events-none rounded-full"/>
          </div>
          {confirmPassword && confirmPassword.length > 0 && (
            <button
              type="button"
              className="absolute right-5 top-7/12 transform"
              onClick={toggleShowConfirmPassword}
            >
              {showConfirmPassword ? (
                <EyeIcon className="text-neutral-300 hover:text-blue-700 cursor-pointer"/>
              ) : (
                <EyeOffIcon className="text-neutral-300 hover:text-blue-700 cursor-pointer"/>
              )}
            </button>
          )}
        </div>
        <Button
          type={"submit"}
          className={"z-20"}
          disabled={!isValid}
        >
          Actualizar contraseña
        </Button>
      </form>
    </FormProvider>
  )
}