import React from "react";
import {useFormContext} from "react-hook-form";
import {XIcon} from "lucide-react";

type SelectProps = {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  rules?: object;
};

export default function SelectInput({name, label, options, rules}: SelectProps) {
  const {register, formState: {errors}} = useFormContext();

  return (
    <div className="relative w-full">
      <select
        {...register(name, rules)}
        className={`
          appearance-none
          peer w-full border border-neutral-400 px-4 py-3
          outline-none text-[15px] text-neutral-500 bg-white
          placeholder-transparent focus:border-blue-500 focus:caret-blue-500 accent-blue-500
        `}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-700">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <label
        htmlFor={name}
        className="absolute left-4 top-2 text-base text-neutral-500 bg-white px-1 transition-all
          peer-focus:-top-2.5
          peer-focus:text-sm
          peer-focus:text-blue-500
          peer-not-placeholder-shown:-top-2.5
          peer-not-placeholder-shown:text-sm
          pointer-events-none"
      >
        {label}
      </label>
      {errors[name]?.message && (
        <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start items-center -space-y-2 md:space-y-0 text-red-700 text-sm text-center max-w-[350px] min-h-[20px] -mb-0.5">
          <XIcon width={16} />
          <span className="whitespace-normal break-words">
            {errors[name]?.message as string}
          </span>
        </div>
      )}
    </div>
  );
}
