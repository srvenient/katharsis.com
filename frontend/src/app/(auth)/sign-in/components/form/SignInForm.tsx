'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import PasswordInput from '@/app/(auth)/components/form/input/PasswordInput';
import { Form } from '@/app/(auth)/components/form/Form';
import EmailInput from '@/app/(auth)/components/form/input/EmailInput';
import { useAppDispatch } from '@/common/redux/hooks';
import { login } from '@/common/redux/features/auth/slices/auth.slice';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

type FormValues = {
  username: string;
  password: string;
};

export default function SignInForm() {
  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { username: '', password: '' },
  });

  const {
    formState: { isValid, isSubmitting },
    reset,
  } = methods;

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const res = await dispatch(login(data)).unwrap();
      if (res) {
        reset();
        router.push('/onboarding');
      } else setError('Invalid email or password. Please try again.');
    } catch {
      setError('Unable to sign in. Please check your credentials.');
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen px-5 sm:px-0">
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            layout
            className="
              w-full flex items-center justify-center gap-2 p-2 
              rounded-md bg-red-500/10 border border-red-500/40 
            text-red-400 text-sm font-medium mb-4
            "
            role="alert"
          >
            <ExclamationTriangleIcon className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative w-full max-w-lg flex flex-col items-center lg:items-start justify-center gap-10">
        <div className="flex flex-col items-center lg:items-start justify-start gap-2">
          <h2 className="text-white text-4xl font-special font-bold">
            Nice to see you!
          </h2>
          <p className="text-gray-400 text-[15px] font-special font-semibold">
            Enter your email and password to sign in
          </p>
        </div>

        <Form<FormValues>
          methods={methods}
          onSubmit={onSubmit}
          className="w-full flex flex-col gap-5"
        >
          <EmailInput placeholder="Your email..." />

          <div className="flex flex-col gap-2">
            <PasswordInput label="Password" placeholder="Your password..." />
            <button
              type="button"
              className="self-end relative group cursor-pointer"
            >
              <span className="relative text-[13.5px] bg-clip-text font-special font-semibold">
                Forgot Password?
                <span
                  className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-white
                    transition-all duration-500 group-hover:w-full"
                />
              </span>
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={!isValid || isSubmitting}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full py-2.5 px-4 mt-2 flex items-center justify-center gap-2 
              rounded-xl text-white text-[11px] font-special font-semibold
              transition-all duration-300
              ${
                isSubmitting
                  ? 'bg-blue-400 cursor-wait'
                  : isValid
                  ? 'bg-theme-dodger-blue hover:bg-blue-600 cursor-pointer'
                  : 'bg-gray-600 opacity-70 cursor-not-allowed'
              }
            `}
          >
            {isSubmitting ? (
              <>
                <span className="loader" />
              </>
            ) : (
              'SIGN IN'
            )}
          </motion.button>

          <div className="w-full flex flex-col items-center justify-center gap-4 mt-2">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/sign-up')}
                className="relative group cursor-pointer"
              >
                <span
                  className="
                    relative text-[13.5px] text-blue-400 bg-clip-text 
                    font-special font-semibold transition-colors duration-300 hover:text-white
                  "
                >
                  Sign Up
                </span>
              </button>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
