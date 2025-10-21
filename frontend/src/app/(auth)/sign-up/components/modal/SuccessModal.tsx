'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(show);
  const router = useRouter();

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          onClose();
          router.push('/sign-in');
        }, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, router]);

  if (!show && !visible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        transition-opacity duration-300
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div
        className={`
          relative w-[90%] max-w-sm
          bg-linear-to-b from-emerald-800/90 to-emerald-900/80
          border border-emerald-500/50 rounded-2xl
          px-6 py-6 shadow-[0_0_35px_rgba(16,185,129,0.35)]
          text-emerald-100 font-special text-[15px]
          transform transition-all duration-300
          ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        {/* Ícono + mensaje */}
        <div className="flex flex-col items-center justify-center text-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/50 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-emerald-300">
            Registration Successful!
          </h3>
          <p className="text-sm text-emerald-100/80 max-w-xs">
            Your account has been created successfully. Redirecting to sign
            in...
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              setVisible(false);
              setTimeout(() => {
                onClose();
                router.push('/sign-in');
              }, 300);
            }}
            className="
              px-6 py-2 rounded-lg
              bg-linear-to-r from-emerald-500/90 to-green-500/90
              hover:from-emerald-400 hover:to-green-400
              text-white text-[14px] font-semibold
              transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.45)]
              hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]
              cursor-pointer
            "
          >
            Go to Sign In
          </button>
        </div>

        <div className="absolute inset-0 rounded-2xl ring-1 ring-emerald-500/20 blur-sm pointer-events-none" />
      </div>
    </div>
  );
}
