'use client';

import { useEffect, useState } from 'react';

type ErrorModalProps = {
  message: string;
  textButton?: string;
  autoClose?: number;
  onClose?: () => void;
  closeOnBackdropClick?: boolean;
};

export default function ErrorModal({
  message,
  textButton = 'Cerrar',
  autoClose = 3000,
  onClose,
  closeOnBackdropClick = false,
}: ErrorModalProps) {
  const [visible, setVisible] = useState(!!message);

  // Manejo de visibilidad y autocierre
  useEffect(() => {
    if (message) {
      setVisible(true);

      if (autoClose) {
        const timer = setTimeout(() => handleClose(), autoClose);
        return () => clearTimeout(timer);
      }
    }
  }, [message]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  if (!message && !visible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        transition-opacity duration-300
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      onClick={closeOnBackdropClick ? handleClose : undefined}
    >
      <div
        className={`
          relative w-[90%] max-w-sm
          bg-linear-to-b from-[#0a0f1a]/95 to-[#0e1625]/90
          border border-red-500/40 rounded-2xl
          px-6 py-6 shadow-[0_0_35px_rgba(255,0,0,0.35)]
          text-red-200 font-special text-[15px]
          transform transition-all duration-300
          ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ícono + mensaje */}
        <div className="flex flex-col items-center justify-center text-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 border border-red-400/50 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-red-400"
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

          <h3 className="text-lg font-semibold text-red-300">Error</h3>
          <p className="text-sm text-red-100/80 max-w-xs">{message}</p>
        </div>

        {/* Botón */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleClose}
            className="
              px-6 py-2 rounded-lg
              bg-linear-to-r from-red-500/90 to-red-600/90
              hover:from-red-400 hover:to-red-500
              text-white text-[14px] font-semibold
              transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.45)]
              hover:shadow-[0_0_25px_rgba(255,0,0,0.6)]
              cursor-pointer
            "
          >
            {textButton}
          </button>
        </div>

        <div className="absolute inset-0 rounded-2xl ring-1 ring-red-500/20 blur-sm pointer-events-none" />
      </div>
    </div>
  );
}
