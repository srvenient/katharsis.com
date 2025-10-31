'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { ApiError } from '@/common/errors/api-error';
import { useAppDispatch, useAppSelector } from '@/common/redux/hooks';
import { fetchMe } from '@/common/redux/features/user/slices/user.slice';
import {
  start2faSetup,
  cancel2FASetup,
  confirm2FASetup,
  disable2FA,
} from '@/common/redux/features/auth/slices/auth.slice';
import { Form } from '@/app/components/form/Form';

type FormValues = { two_factor_auth: boolean };

export default function TwoFactorSettingsForm() {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);

  const [qrData, setQrData] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState<null | (() => void)>(null);
  const [confirmMessage, setConfirmMessage] = useState('');

  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { two_factor_auth: true },
  });

  const refreshUser = async () => dispatch(fetchMe());

  const handleError = (err: unknown) => {
    if (err instanceof ApiError) setErrorMessage(err.message);
    else setErrorMessage('Unexpected error occurred');
  };

  const handleSetup2FA = async () => {
    try {
      setErrorMessage(null);
      const data = await dispatch(start2faSetup()).unwrap();
      setQrData(data.qr_code);
      setSecretKey(data.secret_key);
    } catch (err) {
      handleError(err);
    }
  };

  const handleCancelSetup = async () => {
    setConfirmMessage('Are you sure you want to cancel the 2FA setup?');
    setConfirmAction(() => async () => {
      try {
        setIsConfirmLoading(true);
        await dispatch(cancel2FASetup()).unwrap();
        resetSetupState();
      } catch (err) {
        handleError(err);
      } finally {
        setIsConfirmLoading(false);
        setConfirmAction(null);
      }
    });
  };

  const handleVerifyCode = async () => {
    try {
      setIsVerifying(true);
      setVerificationError(null);

      const ok = await dispatch(confirm2FASetup(verificationCode)).unwrap();

      if (ok) {
        await refreshUser();
        resetSetupState();
      }
    } catch (err: any) {
      if (err?.status === 401 || err?.message === 'Invalid 2FA code') {
        setVerificationError('Invalid 2FA code. Please try again.');
      } else {
        setErrorMessage(err?.message || 'Unexpected error occurred');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDisable2FA = async () => {
    setConfirmMessage(
      'Are you sure you want to disable Two-Factor Authentication? Your account will become less secure.'
    );
    setConfirmAction(() => async () => {
      try {
        setIsConfirmLoading(true);
        const ok = await dispatch(disable2FA()).unwrap();
        if (ok) await refreshUser();
      } catch (err) {
        handleError(err);
      } finally {
        setIsConfirmLoading(false);
        setConfirmAction(null);
      }
    });
  };

  const resetSetupState = () => {
    setQrData(null);
    setSecretKey(null);
    setVerificationCode('');
    setVerificationError(null);
  };

  return (
    <div
      className="
        relative flex flex-col
        bg-[linear-gradient(127.09deg,rgba(6,11,40,0.94)_19.41%,rgba(10,14,35,0.49)_76.65%)]
        rounded-2xl px-10 py-8 text-white
      "
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-special font-semibold tracking-wider">
            Two-Factor Authentication
          </h2>
          <StatusBadge enabled={!!userInfo?.is_2fa_enabled} />
        </div>

        {errorMessage && (
          <p className="text-sm text-red-400 font-medium">{errorMessage}</p>
        )}

        <Form<FormValues>
          methods={methods}
          onSubmit={() => {}}
          className="w-full flex flex-col"
        >
          <SecurityRow
            label="Authenticator app"
            value={userInfo?.is_2fa_enabled ? 'Configured' : 'Not Configured'}
            actionLabel={userInfo?.is_2fa_enabled ? 'DISABLE' : 'SET UP'}
            onClick={
              userInfo?.is_2fa_enabled ? handleDisable2FA : handleSetup2FA
            }
            loading={isVerifying || isConfirmLoading}
          />
        </Form>
      </div>

      <AnimatePresence>
        {qrData && (
          <QrModal
            qrData={qrData}
            secretKey={secretKey}
            verificationCode={verificationCode}
            setVerificationCode={(v) => {
              setVerificationCode(v);
              if (verificationError) setVerificationError(null);
            }}
            onVerify={handleVerifyCode}
            onCancel={handleCancelSetup}
            isVerifying={isVerifying}
            verificationError={verificationError}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmAction && (
          <ConfirmModal
            message={confirmMessage}
            onConfirm={confirmAction}
            onCancel={() => setConfirmAction(null)}
            isLoading={isConfirmLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusBadge({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={`${
        enabled
          ? 'bg-emerald-400/90 text-emerald-900'
          : 'bg-red-400/90 text-red-900'
      } text-xs font-special font-semibold rounded-2xl px-4 py-1.5`}
    >
      {enabled ? 'ENABLED' : 'DISABLED'}
    </span>
  );
}

function SecurityRow({
  label,
  value,
  actionLabel,
  onClick,
  loading,
}: {
  label: string;
  value: string;
  actionLabel: string;
  onClick?: () => void;
  loading?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent my-4" />
      <div className="flex items-center justify-between w-full">
        <p className="text-sm font-medium">{label}</p>
        <div className="flex items-center gap-4">
          <span className="text-gray-300 text-sm">{value}</span>
          <button
            type="button"
            onClick={onClick}
            disabled={loading}
            className="
              bg-theme-dodger-blue hover:bg-blue-600 active:scale-[0.98]
              transition-transform text-white text-xs font-special font-semibold 
              py-2 px-6 rounded-lg disabled:opacity-50 cursor-pointer
            "
          >
            {loading ? 'Loading...' : actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({
  message,
  onConfirm,
  onCancel,
  isLoading,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-9998"
    >
      <div className="bg-[linear-gradient(127.09deg,rgba(6,11,40)_19.41%,rgba(10,14,35)_76.65%)] text-white p-6 rounded-xl shadow-xl w-88">
        <h3 className="text-lg font-semibold mb-3">Confirm Action</h3>
        <p className="text-sm text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="
              px-6 py-3 rounded-md
              bg-gray-500 hover:bg-gray-600 
              text-xs text-white font-special font-semibold
              transition-colors duration-500
              cursor-pointer
            "
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="
                px-6 py-3 rounded-md
              bg-red-600 hover:bg-red-700
                text-xs text-white font-special font-semibold
                transition-colors duration-500
                cursor-pointer
              "
          >
            {isLoading ? 'PROCESSING...' : 'CONFIRM'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function QrModal({
  qrData,
  secretKey,
  verificationCode,
  setVerificationCode,
  onVerify,
  onCancel,
  isVerifying,
  verificationError,
}: {
  qrData: string;
  secretKey: string | null;
  verificationCode: string;
  setVerificationCode: (v: string) => void;
  onVerify: () => void;
  onCancel: () => void;
  isVerifying: boolean;
  verificationError: string | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
    >
      <div
        className="
            relative p-8 rounded-2xl text-center font-special text-white w-88 overflow-hidden
            shadow-lg shadow-black/40 bg-linear-to-b from-[#0b1120] to-[#111735]
          "
      >
        <div className="absolute inset-0 bg-[url('/images/png/reports-card-background.5fb96bf3.png')] bg-cover bg-center" />

        <div className="relative z-10">
          <h3 className="text-lg font-semibold mb-4">Scan this QR Code</h3>

          <Image
            src={`data:image/png;base64,${qrData}`}
            alt="QR Code"
            width={180}
            height={180}
            className="mx-auto rounded-lg shadow-md"
          />

          <p className="text-sm text-slate-400 mt-4">
            Or enter this key manually:
          </p>
          <p className="font-mono text-sm mb-4 text-theme-dodger-blue">
            {secretKey}
          </p>

          {verificationError && (
            <p className="text-xs text-red-400 mb-1">{verificationError}</p>
          )}

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Enter 6-digit code"
            value={verificationCode}
            minLength={6}
            maxLength={6}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, '');
              if (onlyNumbers.length <= 6) {
                setVerificationCode(onlyNumbers);
              }
            }}
            className="
              w-full py-2.5 px-4
              bg-transparent
              rounded-2xl
              border-[0.5px] border-[rgb(74,85,104)]
              text-sm text-center
              placeholder:text-white/55 placeholder:text-[12px] placeholder:font-light placeholder:text-center
              outline-none
              focus:ring-1 focus:ring-blue-500 focus:caret-blue-500
              transition-all duration-150
              mb-5
            "
          />

          <div className="flex justify-center w-full gap-3">
            <button
              onClick={onCancel}
              className="
                w-1/2
                bg-white/40 hover:bg-white/60 
                text-xs font-special font-semibold 
                px-6 py-2.5 rounded-md 
                transition-colors duration-500 
                cursor-pointer
              "
            >
              CANCEL
            </button>
            <button
              onClick={onVerify}
              disabled={isVerifying || verificationCode.length !== 6}
              className="
                w-1/2
                bg-theme-dodger-blue
                text-xs text-white font-special font-semibold
                px-6 py-2.5 rounded-md
                transition-colors duration-500
                cursor-pointer disabled:cursor-not-allowed
                disabled:hover:bg-theme-dodger-blue
              "
            >
              {isVerifying ? 'VERIFING...' : 'VERIFY'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
