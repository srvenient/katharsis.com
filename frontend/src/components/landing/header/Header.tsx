'use client'

import React, {useState} from "react";
import {Menu, PackageCheck, X} from "lucide-react";
import Link from "next/link";

const items: string[] = ["CARACTERÍSTICAS", "TESTIMONIOS", "PRECIOS", "CONTACTO"]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header
      className="fixed top-0 z-50 mx-auto flex w-full select-none items-center text-theme-midnight-black border-b bg-white"
    >
      <div className="flex justify-between px-6 py-4 md:w-full lg:max-w-(--breakpoint-xl) lg:mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-1 hover:scale-105 transition duration-200">
            <PackageCheck size={24} strokeWidth={1.25} className="text-theme-midnight-black"/>
            <span className="font-special font-bold text-xl">Katharsis </span>
          </Link>
        </div>
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex items-center gap-6">
          {items.map((item) => (
            <Link
              key={item}
              href="#"
              className="text-[12.5px] text-gray-600 font-bold hover:text-theme-midnight-black transition duration-200"
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2 font-special font-bold text-[13px]">
          <Link
            href="/auth/sign-in"
            className="text-theme-midnight-black border border-theme-midnight-black transition duration-300 hover:border-gray-400 hover:text-gray-400 px-2.5 py-2"
          >
            Identifícate
          </Link>
          <Link
            href="#"
            className="text-white border border-theme-midnight-black bg-theme-midnight-black transition duration-600 hover:opacity-75 px-2.5 py-2"
          >
            Prueba gratis
          </Link>
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
        </button>
      </div>
    </header>
  )
}