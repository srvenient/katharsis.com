import React, {HTMLInputTypeAttribute} from "react";
import {useFormContext} from "react-hook-form";
import {XIcon} from "lucide-react";

type InputProps = {
  name: string;
  type: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  rules?: object;
}

export default function Input({name, type, placeholder, inputMode, onInput, maxLength, rules}: InputProps) {
  const {register, formState: {errors}} = useFormContext();

  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder=" "
        inputMode={inputMode}
        onInput={onInput}
        maxLength={maxLength}
        {...register(name, rules)}
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
        {placeholder}
      </label>
      {errors[name]?.message && (
        <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start items-center -space-y-2 md:space-y-0 text-red-700 text-sm text-center max-w-[350px] min-h-[20px] -mb-0.5">
          <XIcon width={16}/>
          <span className="whitespace-normal break-words">
            {errors[name]?.message as string}
          </span>
        </div>
      )}
    </div>
  )
}