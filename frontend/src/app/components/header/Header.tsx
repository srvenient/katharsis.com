import React from "react";
import {PackageOpen} from "lucide-react";

type Item = {
  name: string;
  href: string;
}

const items: Item[] = [
  {
    name: "Características",
    href: "#"
  },
  {
    name: "Precios",
    href: "#"
  },
  {
    name: "Contacto",
    href: "#"
  }
];

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 flex items-center justify-center h-24 w-full
       isolate bg-white/0 backdrop-blur-xs z-50 mask-gradient"
    >
      <nav className="flex flex-row items-center justify-center w-full h-13">
        <div className="bg-neutral-50 flex flex-row items-center justify-center rounded-full w-auto h-full">
          <ul className="flex flex-row items-center justify-center text-neutral-950 divide-x divide-neutral-300 px-2">
            <li className="flex items-center justify-center h-13 gap-x-0.5 hover:text-blue-500 cursor-pointer px-5">
              <PackageOpen width={25} strokeWidth={1.4}/>
            </li>

            {items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center justify-center h-13 hover:text-blue-500 cursor-pointer px-5"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}