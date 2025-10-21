'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import PasswordInput from '@/app/(auth)/components/form/input/PasswordInput';
import { Form } from '@/app/(auth)/components/form/Form';
import EmailInput from '@/app/(auth)/components/form/input/EmailInput';
import { useAppDispatch } from '@/common/redux/hooks';
import { login } from '@/common/redux/features/auth/slices/auth.slice';
import { useEffect, useState } from 'react';
import ErrorModal from '@/app/(auth)/components/modal/ErrorModal';

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
  } = methods;

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const res = await dispatch(login(data)).unwrap();
      if (res) router.push('/onboarding');
      else setError('Login failed. Please try again.');
    } catch {
      setError('Login failed. Please try again.');
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen px-5 sm:px-0">
      {error && (
        <ErrorModal
          message={error}
          textButton="OK"
          autoClose={5000}
          onClose={() => setError(null)}
          closeOnBackdropClick
        />
      )}

      <div className="relative w-full max-w-lg flex flex-col items-center lg:items-start justify-center gap-12">
        <div className="flex flex-col items-center lg:items-start justify-start gap-2 -mt-28">
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
          <EmailInput placeholder="Your email or username..." />

          <div className="flex flex-col gap-2">
            <PasswordInput label="Password" placeholder="Your password..." />
            <button
              type="button"
              className="self-end relative group cursor-pointer"
            >
              <span className="relative text-[13.5px] bg-clip-text font-special font-semibold">
                Forgot Password?
                <span
                  className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-white
                    transition-all duration-500 group-hover:w-full"
                />
              </span>
            </button>
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`
              w-full py-2.5 px-4 mt-2
              bg-theme-dodger-blue enabled:hover:bg-blue-600 
              rounded-xl text-white text-[10.5px] font-special font-semibold
              transition-colors duration-300
              ${
                !isValid || isSubmitting
                  ? 'cursor-not-allowed opacity-70'
                  : 'cursor-pointer'
              }
            `}
          >
            SIGN IN
          </button>

          <div className="w-full flex flex-col items-center justify-center gap-4 mt-2">
            <p className="text-sm text-gray-400">
              Don't have an account yet?{' '}
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
