'use client';

import { Form } from '@/app/components/form/Form';
import EmailInput from '@/app/components/form/input/EmailInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FacebookIcon } from '../ui/icons/types/FacebookIcon';
import { GoogleIcon } from '../ui/icons/types/GoogleIcon';
import { AppleIcon } from '../ui/icons/types/AppleIcon';
import Icon from '../ui/icons/Icon';
import { useRouter } from 'next/navigation';
import SelectInput from '@/app/components/form/input/SelectInput';
import Input from '@/app/components/form/input/Input';
import ConfirmPasswordInput from '@/app/components/form/input/ConfirmPasswordInput';
import PasswordInput from '@/app/components/form/input/PasswordInput';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/common/redux/hooks';
import { register } from '@/common/redux/features/auth/slices/auth.slice';
import { AnimatePresence, motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

enum DOCUMENT_TYPE {
  ID_CARD = 'ID_Card',
  FOREIGN_ID = 'Foreign_ID',
  PASSPORT = 'Passport',
  CITIZEN_CARD = 'Citizen_Card',
  TAX_ID = 'Tax_ID',
}

type FormValues = {
  doc_type: DOCUMENT_TYPE;
  doc_number: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export default function SignUpForm() {
  const methods = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldUnregister: false,
    defaultValues: {
      doc_type: DOCUMENT_TYPE.ID_CARD,
      doc_number: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  const {
    formState: { isValid, isSubmitting },
  } = methods;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNextStep = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault(); // 🔒 evita que el click propague al botón "submit"
    e?.stopPropagation();

    const stepFields: Record<number, (keyof FormValues)[]> = {
      0: ['doc_type', 'doc_number'],
      1: ['first_name', 'last_name', 'email'],
      2: ['password', 'confirm_password'],
    };

    const isValidStep = await methods.trigger(stepFields[step]);
    if (isValidStep) setStep((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (step < 2) return;

    try {
      const full_name = `${data.first_name.trim()} ${data.last_name.trim()}`;
      const res = await dispatch(register({ ...data, full_name })).unwrap();

      if (res) {
        setError(null);
        setSuccess(true);
        setStep(0);
        methods.reset();
      }
    } catch (error: any) {
      setSuccess(false);
      setError(
        error || 'Registration failed. Please check your data and try again.'
      );
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-5 sm:px-0 pt-28 pb-10 mt-10">
      <div className="w-full max-w-lg flex flex-col items-center lg:items-start gap-12 relative">
        {/* HEADER */}
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-white text-5xl font-special font-bold">
            Welcome!
          </h2>
          <p className="text-gray-300 text-[15px] font-special font-semibold">
            Create your account to get started with Katharsis, the ultimate
            platform for managing your projects and tasks efficiently.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full p-0.5 rounded-3xl bg-linear-to-b from-gray-500 via-white to-gray-500"
        >
          <div className="flex flex-col w-full rounded-3xl bg-theme-midnight-blue p-10 gap-6 transition-all duration-500">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-col items-center justify-center gap-6 -mt-4"
            >
              <h3 className="text-white text-xl font-special font-bold mb-2">
                Register with
              </h3>
              <div className="flex items-center justify-center gap-5">
                {[FacebookIcon, AppleIcon, GoogleIcon].map((IconComp, i) => (
                  <Icon
                    key={i}
                    icon={<IconComp className="w-6 h-6 text-white" />}
                  />
                ))}
              </div>
              <p className="text-gray-400 text-center font-special font-bold text-lg">
                or
              </p>
            </motion.div>

            <div className="w-full z-50">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="
                      w-full flex items-center justify-center gap-2 p-3 
                      rounded-lg bg-green-500/15 border border-green-500/30 
                      text-green-300 text-sm font-medium text-center
                      backdrop-blur-sm
                    "
                    role="status"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 shrink-0 text-green-400"
                    >
                      {' '}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />{' '}
                    </svg>
                    <span>Account created successfully!</span>
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="
                      w-full flex items-center justify-center gap-2 p-3 
                      rounded-lg bg-red-500/15 border border-red-500/30 
                      text-red-300 text-sm font-medium text-center
                      backdrop-blur-sm
                    "
                    role="alert"
                  >
                    <ExclamationTriangleIcon className="w-5 h-5 shrink-0 text-red-400" />
                    <span>{error}</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {/* FORM */}
            <Form<FormValues>
              methods={methods}
              onSubmit={onSubmit}
              className={`w-full flex flex-col gap-5 ${
                error || success ? '' : '-mt-4'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-5"
                >
                  {step === 0 && (
                    <>
                      <SelectInput
                        name="doc_type"
                        label="Document Type"
                        options={Object.values(DOCUMENT_TYPE).map((type) => ({
                          value: type,
                          label: type.replace(/_/g, ' '),
                        }))}
                        rules={{ required: 'Document type is required' }}
                      />
                      <Input
                        name="doc_number"
                        label="Document Number"
                        placeholder="Your document number..."
                        rules={{ required: 'Document number is required' }}
                      />
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <div className="flex gap-3">
                        <Input
                          name="first_name"
                          label="First Name"
                          placeholder="Your first name..."
                          rules={{ required: 'First name is required' }}
                        />
                        <Input
                          name="last_name"
                          label="Last Name"
                          placeholder="Your last name..."
                          rules={{ required: 'Last name is required' }}
                        />
                      </div>
                      <EmailInput
                        name="email"
                        label="Email"
                        placeholder="Your email address..."
                      />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <PasswordInput
                        label="Password"
                        placeholder="Your password..."
                      />
                      <ConfirmPasswordInput label="Confirm Password" />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div
                className={`flex mt-2 gap-4 ${
                  step === 0 || step === 2
                    ? 'justify-center'
                    : 'justify-between'
                }`}
              >
                {step > 0 && (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setStep(step - 1)}
                    className="w-1/2 py-2.5 px-2 bg-white hover:bg-gray-200 rounded-xl text-gray-800 text-[10.5px] font-special font-bold transition-colors duration-300 cursor-pointer"
                  >
                    BACK
                  </motion.button>
                )}

                {step < 2 ? (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={(e) => handleNextStep(e)}
                    className={`${
                      step === 0 ? 'w-full' : 'w-1/2'
                    } py-2.5 px-2 rounded-xl text-white text-[10.5px] font-special font-bold transition-colors duration-300 bg-theme-dodger-blue hover:bg-blue-600 cursor-pointer`}
                  >
                    NEXT
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    whileTap={{ scale: 0.97 }}
                    className="w-1/2 py-2.5 px-2 bg-theme-dodger-blue enabled:hover:bg-blue-600 rounded-xl text-white text-[10.5px] font-special font-semibold transition-colors duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="loader-small" />
                    ) : (
                      'SIGN UP'
                    )}
                  </motion.button>
                )}
              </div>
            </Form>

            <div className="w-full flex flex-col items-center justify-center gap-4 mt-4">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/sign-in')}
                  className="relative group cursor-pointer"
                >
                  <span className="relative text-[13.5px] text-white font-special font-semibold">
                    Sign In
                    <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-white transition-all duration-500 group-hover:w-full" />
                  </span>
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
