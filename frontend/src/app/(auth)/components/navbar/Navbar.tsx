'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Menu } from 'lucide-react';

export type NavbarProps = {
  showBackground?: boolean;
  buttonStyle?: 'blue' | 'white';
};

const LOGO_TEXT = 'KATHARSIS';
const BUY_BUTTON_TEXT = 'BUY NOW';
const PRICES_ROUTE = '/prices';

export function Navbar({ showBackground, buttonStyle }: NavbarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = useCallback(() => {
    router.push(PRICES_ROUTE);
    setIsOpen(false);
  }, [router]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full flex justify-center px-4 sm:px-6 lg:px-8 mt-4">
      <div className="relative flex h-18 w-full max-w-5xl items-center justify-between px-8">
        {showBackground && (
          <div
            className="absolute inset-0 -z-10 rounded-3xl border border-white/30 bg-white/5 backdrop-blur-md shadow-lg"
            aria-hidden="true"
          />
        )}

        {/* Logo */}
        <div className="flex items-center">
          <span
            className="
              text-[15px] font-special font-semibold tracking-widest pointer-events-none 
              bg-linear-to-r from-white to-white/30 text-transparent bg-clip-text
            "
          >
            {LOGO_TEXT}
          </span>
        </div>

        {/* Botón visible en pantallas grandes */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => router.push('/prices')}
            className={`
              w-full py-2.5 px-7
              text-[10.5px] font-special font-bold
              ${
                buttonStyle === 'blue'
                  ? 'text-white bg-theme-dodger-blue'
                  : 'text-black bg-white'
              }
              hover:scale-105 rounded-3xl
              transition duration-500 
              cursor-pointer
              disabled:cursor-not-allowed
            `}
          >
            {BUY_BUTTON_TEXT}
          </button>
        </div>

        {/* Icono hamburguesa visible solo en pantallas pequeñas */}
        <button
          className="sm:hidden flex items-center justify-center text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={toggleMenu}
        >
          <Menu size={22} />
        </button>

        {/* Menú desplegable móvil */}
        {isOpen && (
          <div className="absolute right-4 top-20 flex flex-col bg-white/10 backdrop-blur-md border border-white/30 rounded-xl p-4 sm:hidden">
            <button
              onClick={handleNavigation}
              className={`
                w-full py-2 px-4 rounded-lg ${
                  buttonStyle === 'blue'
                    ? 'bg-theme-dodger-blue'
                    : 'bg-white/10'
                }
                text-white text-[12px] font-special font-semibold
                transition hover:bg-blue-600
              `}
            >
              {BUY_BUTTON_TEXT}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
