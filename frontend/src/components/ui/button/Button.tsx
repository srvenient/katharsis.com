"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function Button({children, className, type = "button", disabled, ...props}: ButtonProps) {
  const isDisabled = disabled;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={clsx(
        `group flex items-center justify-center
        py-3 px-4 rounded-xl gap-2
        transition-all duration-300 ease-in-out`,
        {
          "bg-neutral-50 text-theme-charcoal cursor-pointer": !isDisabled,
          "bg-neutral-50 text-neutral-600 cursor-not-allowed opacity-60": isDisabled,
        },
        className
      )}
      {...props}
    >
      {children}

      <div
        className={clsx(
          `relative w-8 h-8 overflow-hidden rounded-sm transition-colors duration-500`,
          {
            "bg-theme-charcoal group": !isDisabled,
            "bg-neutral-500": isDisabled,
          }
        )}
      >
        <div
          className={clsx(
            `absolute inset-0 z-0 before:content-['']
            before:absolute before:top-1/2 before:left-1/2
            before:w-0 before:h-0 before:rounded-full
            before:bg-[#007aff]
            before:transform before:-translate-x-1/2 before:-translate-y-1/2
            before:transition-all before:duration-500`,
            {
              "group-hover:before:w-[200%] group-hover:before:h-[200%]": !isDisabled,
            }
          )}
        >
          <div className="absolute inset-0 w-full noise-overlay pointer-events-none opacity-20" />
        </div>

        <ArrowRight
          width={20}
          strokeWidth={1.5}
          className={clsx(
            `absolute inset-0 m-auto transition-all duration-500 ease-out text-white`,
            {
              "group-hover:translate-x-4 group-hover:opacity-0": !isDisabled,
            }
          )}
        />
        <ArrowRight
          width={20}
          strokeWidth={1.5}
          className={clsx(
            `absolute inset-0 m-auto transition-all duration-500 ease-out text-white`,
            {
              "-translate-x-4 opacity-0": !isDisabled,
              "group-hover:translate-x-0 group-hover:opacity-100": !isDisabled,
            }
          )}
        />
      </div>
    </button>
  );
}
