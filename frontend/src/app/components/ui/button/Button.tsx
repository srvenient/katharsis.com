"use client";

import React from "react";
import {ArrowRight} from "lucide-react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({children, className, type = "button", ...props}: ButtonProps) {
  return (
    <button
      type={type}
      className={`
        group flex items-center justify-center
        bg-neutral-50 text-theme-charcoal
        py-2 px-3 rounded-xl gap-2 cursor-pointer
        ${className}
      `}
      {...props}
    >
      {children}

      <div
        className="relative w-8 h-8 overflow-hidden rounded-sm group bg-theme-charcoal transition-colors duration-500"
      >
        <div className="
          absolute inset-0 z-0
          before:content-['']
          before:absolute before:top-1/2 before:left-1/2
          before:w-0 before:h-0
          before:rounded-full
          before:bg-[#007aff]
          before:transform before:-translate-x-1/2 before:-translate-y-1/2
          group-hover:before:w-[200%] group-hover:before:h-[200%]
          before:transition-all before:duration-500
        ">
          <div className="absolute inset-0 w-full noise-overlay pointer-events-none opacity-20"/>
        </div>

        <ArrowRight
          width={20}
          strokeWidth={1.5}
          className="
            absolute inset-0 m-auto
            transition-all duration-500 ease-out
            group-hover:translate-x-4 group-hover:opacity-0
            text-white
          "
        />

        <ArrowRight
          width={20}
          strokeWidth={1.5}
          className="
            absolute inset-0 m-auto
            -translate-x-4 opacity-0
            transition-all duration-500 ease-out
            group-hover:translate-x-0 group-hover:opacity-100
           text-white
          "
        />
      </div>
    </button>
  )
}