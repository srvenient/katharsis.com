'use client';

import {
  clearTempToken,
  verify2FACode,
} from '@/common/redux/features/auth/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '@/common/redux/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TwoFAVerify() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { tempToken, isLoading } = useAppSelector((state) => state.auth);

  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const otp = code.join('');
      if (otp.length !== 6 || !tempToken) {
        setError('Please enter the full 6-digit code.');
        return;
      }

      const result = await dispatch(
        verify2FACode({ tempToken, code: otp })
      ).unwrap();
      if (result) {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError('Invalid or expired 2FA code.');
    }
  };

  const handleBack = () => {
    dispatch(clearTempToken());
    router.push('/sign-in');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden text-white">
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div
          className="
            absolute w-[700px] h-[700px]
            bg-[radial-gradient(circle_at_center,rgba(0,140,255,0.35),rgba(0,80,200,10),transparent_70%)]
            blur-[160px] rounded-full
            animate-[pulseCloud_10s_ease-in-out_infinite]
          "
        ></div>
      </div>

      <div
        className="
          relative rounded-2xl shadow-2xl p-10 w-full max-w-xl text-center z-10 overflow-hidden
          border border-[rgba(0,0,0,0.125)] backdrop-blur-md bg-[rgba(255,255,255,0.05)]
        "
      >
        <div className="absolute inset-0 bg-[url('/images/webp/billing-background-card.webp')] bg-cover bg-no-repeat bg-center" />

        <div className="relative z-10">
          <h1 className="text-2xl font-special font-semibold mb-2 text-white">
            Two-Factor Authentication
          </h1>
          <p className="font-special text-white/70 mb-6 text-[16px] max-w-sm mx-auto">
            In order to keep your account secure, please enter the 6-digit code
            from your authenticator app.
          </p>

          <form onSubmit={handleSubmit}>
            {error && <p className="text-xs text-red-400 mb-4">{error}</p>}
            <div className="flex justify-center gap-3 mb-6">
              {code.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  maxLength={1}
                  className="
                    w-13 h-13
                    text-center text-xl font-semibold 
                    border border-white/40 rounded-md 
                    bg-transparent focus:outline-none 
                    focus:ring-2 focus:ring-white/70 
                    transition-all duration-200 shadow-inner
                  "
                />
              ))}
            </div>

            {/* Botones principales */}
            <div className="flex gap-4 max-w-sm mx-auto">
              <button
                type="button"
                onClick={handleBack}
                className="
                  flex-1 py-3 rounded-lg border border-gray-700
                  text-[13px] text-white/80 font-special font-bold cursor-pointer
                  bg-linear-to-r from-[#141727] to-[#3a416f] hover:from-[#3a416f] hover:to-[#141727]
                  transition-colors duration-500
                "
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="
                  flex-1 py-3 
                  rounded-lg 
                  bg-linear-to-r from-theme-dodger-blue to-blue-600 hover:from-blue-600 hover:to-theme-dodger-blue
                  text-[13px] text-white font-special font-bold
                  transition-colors duration-500 
                  shadow-lg shadow-blue-700/30
                  cursor-pointer disable:cursor-not-allowed
                "
              >
                {isLoading ? 'VERIFYING...' : 'VERIFY'}
              </button>
            </div>

            {/* Nota de seguridad */}
            <div className="mt-6 flex justify-center items-center text-xs text-white">
              <p className="hover:underline cursor-pointer">
                Need help? Contact Support
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
