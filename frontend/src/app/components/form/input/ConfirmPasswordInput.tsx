'use client';

import { EyeIcon, EyeOffIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Input from './Input';
import {
  ExclamationCircleIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

type ConfirmPasswordInputProps = {
  name?: string;
  placeholder?: string;
  label?: string;
};

export default function ConfirmPasswordInput({
  name = 'confirm_password',
  placeholder,
  label,
}: ConfirmPasswordInputProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const [, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const password = watch('password');
  const confirmPassword = watch(name);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <div
        className="relative w-full"
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);

          if (showPassword) setShowPassword(false);
        }}
      >
        <Input
          name={name}
          type={showPassword ? 'text' : 'password'}
          label={label || 'Confirm Password'}
          placeholder={placeholder || 'Confirm your password...'}
          rules={{
            required: 'Confirm Password is required.',
            validate: (value: string) =>
              value === password || 'Passwords do not match.',
          }}
        />

        {confirmPassword && confirmPassword?.length > 0 && (
          <button
            type="button"
            className="absolute right-3 transform top-4/6 -translate-y-2/6"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <EyeIcon className="w-5 h-5 text-neutral-400 hover:text-blue-700 cursor-pointer" />
            ) : (
              <EyeSlashIcon className="w-5 h-5 text-neutral-400 hover:text-blue-700 cursor-pointer" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
