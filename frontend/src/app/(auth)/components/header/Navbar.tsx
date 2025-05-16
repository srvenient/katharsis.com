"use client";

import {PackageOpen, X} from "lucide-react";
import React from "react";

type NavbarProps = {
  title: string;
  showButton?: boolean;
  buttonAction?: () => void;
}

export default function Navbar({ title, showButton=false, buttonAction }: NavbarProps) {
  return (
    <nav className="relative bg-gradient-to-bl from-neutral-400 via-5% to-neutral-50 text-white py-2">
      <div className="flex items-center gap-8 px-5 md:px-0 md:justify-between max-w-2xl xl:max-w-5xl mx-auto">
        <div className="flex flex-row items-center justify-center cursor-pointer">
          <PackageOpen
            className="w-9 h-9 text-blue-700"
            strokeWidth={1.5}
          />
          <span className="text-3xl text-blue-700 font-semibold tracking-wide ml-1">Katharsis</span>
        </div>
        <h1
          className="text-sm md:text-base font-special font-semibold text-neutral-800"
        >
          {title}
        </h1>
      </div>
      {showButton && (
        <button
          onClick={buttonAction}
          className="absolute top-0 right-0 bg-blue-600 h-full px-5 hover:opacity-75 transition-all duration-300 ease-in-out text-white cursor-pointer"
        >
          <X
            width={24}
            height={24}
          />
        </button>
      )}
    </nav>
  )
}