'use client';

import React from 'react';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export function ErrorModal({ message, onClose }: ErrorModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="
          relative w-[90%] max-w-sm
          bg-linear-to-b from-[#0b111d]/95 to-[#131c2e]/90
          border border-red-500/40 rounded-2xl
          px-7 py-6 shadow-[0_0_45px_rgba(255,0,0,0.25)]
          text-red-200 font-special text-[15px] leading-relaxed
          animate-in fade-in zoom-in-95 duration-300
        "
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500/20 border border-red-400/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-red-300">Error</h2>
        </div>

        <p className="text-[15px] text-red-200/90">{message}</p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="
              px-5 py-1.5 rounded-lg
              bg-linear-to-r from-red-500/90 to-red-600/90
              hover:brightness-110 active:scale-95
              text-white text-[14px] font-semibold
              transition-all duration-300 shadow-[0_0_10px_rgba(255,0,0,0.3)]
              cursor-pointer
            "
          >
            OK
          </button>
        </div>

        <div className="absolute inset-0 rounded-2xl ring-1 ring-red-500/20 blur-sm pointer-events-none" />
      </div>
    </div>
  );
}

export default ErrorModal;
