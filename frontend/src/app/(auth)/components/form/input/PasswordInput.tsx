import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Input from './Input';

type PasswordInputProps = {
  placeholder?: string;
  label: string;
};

export default function PasswordInput({
  placeholder,
  label = 'Password',
}: PasswordInputProps) {
  const { watch } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const password = watch('password');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget)) {
      setShowPassword(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative" onBlur={handleBlur}>
      <Input
        name="password"
        type={showPassword ? 'text' : 'password'}
        label={label}
        placeholder={placeholder}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
        }}
      />
      {password && password.length > 0 && (
        <button
          type="button"
          className="absolute right-3 transform top-4/6 -translate-y-2/6"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeIcon className="w-5 h-5 text-neutral-400 hover:text-blue-700 cursor-pointer" />
          ) : (
            <EyeSlashIcon className="w-5 h-5 text-neutral-400 hover:text-blue-700 cursor-pointer" />
          )}
        </button>
      )}
    </div>
  );
}
