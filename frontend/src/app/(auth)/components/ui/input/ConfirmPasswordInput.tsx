"use client";

import {EyeIcon, EyeOffIcon, XIcon} from "lucide-react";
import React, {useState} from "react";
import {useFormContext} from "react-hook-form";

const name = "confirm_password";

export default function ConfirmPasswordInput() {
  const {register, formState: {errors}, watch} = useFormContext();
  const [, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");
  const confirmPassword = watch(name);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <div
        className="relative w-full"
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);

          if (showPassword) setShowPassword(false);
        }}
      >
        <input
          type={showPassword ? "text" : "password"}
          placeholder=" "
          className={`peer w-full border border-neutral-400 px-4 py-3 outline-none text-sm text-neutral-900 placeholder-transparent focus:border-blue-500 focus:caret-blue-500`}
          {...register(name, {
            required: "Confirmar contraseña es requerida.",
            validate: (value) => value === password || "Las contraseñas no coinciden."
          })}
        />
        <label
          htmlFor={"password"}
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
          Confirmar contraseña
        </label>

        {confirmPassword?.length > 0 && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <EyeIcon className="text-neutral-600 hover:text-blue-700 cursor-pointer"/>
            ) : (
              <EyeOffIcon className="text-neutral-600 hover:text-blue-700 cursor-pointer"/>
            )}
          </button>
        )}
      </div>

      {errors[name]?.message && (
        <div className="flex flex-row flex-wrap justify-start items-center text-red-700 text-sm text-center max-w-[350px] min-h-[20px] -mb-0.5">
          <XIcon width={16}/>
          <span className="whitespace-normal break-words">
            {errors[name]?.message as string}
          </span>
        </div>
      )}
    </div>
  );
}