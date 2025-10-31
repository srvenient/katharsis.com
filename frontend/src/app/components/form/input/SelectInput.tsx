'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { ChevronDown } from 'lucide-react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

type Option = { label: string; value: string };
type SelectProps = {
  name: string;
  label: string;
  options: Option[];
  rules?: object;
};

export default function SelectInput({
  name,
  label,
  options,
  rules,
}: SelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-3" ref={dropdownRef}>
      {label && (
        <div className="flex items-center gap-1">
          <label
            htmlFor={name}
            className="block text-sm text-white font-special font-semibold"
          >
            {label}
          </label>

          {errors[name] && (
            <div className="relative group">
              <ExclamationCircleIcon className="w-4 h-4 text-red-500 cursor-pointer" />

              <span className="absolute left-full ml-2 hidden group-hover:block bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                {errors[name]?.message?.toString()}
              </span>
            </div>
          )}
        </div>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div
            className="relative rounded-2xl p-0.5 transition-colors duration-150"
            style={{
              background:
                'radial-gradient(94.43% 69.43%, rgb(255,255,255) 0%, rgba(255,255,255,0) 100%)',
            }}
          >
            <button
              type="button"
              onClick={() => setIsOpen((o) => !o)}
              className={`
                w-full flex items-center justify-between rounded-2xl
                bg-theme-midnight-blue text-white/60 font-special px-4 py-3 text-sm
                border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer
              `}
            >
              <span className="truncate">
                {options.find((o) => o.value === field.value)?.label ||
                  'Selecciona una opción'}
              </span>
              <ChevronDown
                className={`ml-2 w-5 h-5 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
            {isOpen && (
              <div
                className="
                  absolute z-20 top-full left-0 w-full mt-2 
                  rounded-xl 
                  border border-white/10
                  shadow-[inset_0_0_8px_rgba(0,0,0,0.3),0_0_12px_rgba(0,0,0,0.4)]
                  max-h-56 
                  bg-[linear-gradient(160deg,#0a1035_0%,#102057_100%)]
                  backdrop-blur-2xl
                "
              >
                <div
                  className="
                    overflow-y-auto overflow-x-hidden 
                    max-h-56 
                    py-3.5 pl-3
                  "
                >
                  <div className="py-1">
                    {options.map((opt) => {
                      const isSelected = field.value === opt.value;

                      return (
                        <div
                          key={opt.value}
                          tabIndex={0}
                          onClick={() => {
                            field.onChange(opt.value);
                            setIsOpen(false);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              field.onChange(opt.value);
                              setIsOpen(false);
                            }
                          }}
                          className={`
                            relative px-3 py-2 text-sm text-white 
                            rounded-md select-none
                            transition-all duration-150 ease-in-out
                            group
                            ${
                              isSelected
                                ? 'shadow-inner cursor-default font-medium'
                                : 'cursor-pointer'
                            }
                          `}
                        >
                          <span className="relative z-10">{opt.label}</span>

                          {!isSelected && (
                            <span
                              className="
                                absolute right-3 top-1/2 -translate-y-1/2
                                text-[11.5px] text-white/50 font-special font-bold tracking-wide
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-200 ease-in-out
                                select-none
                              "
                            >
                              Press to select
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}
