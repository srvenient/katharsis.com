'use client';

import { Form } from '@/app/(auth)/components/form/Form';
import EmailInput from '@/app/(auth)/components/form/input/EmailInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FacebookIcon } from '../ui/icons/types/FacebookIcon';
import { GoogleIcon } from '../ui/icons/types/GoogleIcon';
import { AppleIcon } from '../ui/icons/types/AppleIcon';
import Icon from '../ui/icons/Icon';
import { useRouter } from 'next/navigation';
import SelectInput from '@/app/(auth)/components/form/input/SelectInput';
import Input from '@/app/(auth)/components/form/input/Input';
import ConfirmPasswordInput from '@/app/(auth)/components/form/input/ConfirmPasswordInput';
import PasswordInput from '@/app/(auth)/components/form/input/PasswordInput';
import { useState } from 'react';
import { useAppDispatch } from '@/common/redux/hooks';
import { register } from '@/common/redux/features/auth/slices/auth.slice';
import SuccessModal from '../modal/SuccessModal';
import ErrorModal from '../modal/ErrorModal';

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
  email: string;
  full_name: string;
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
      email: '',
      full_name: '',
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

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];

    if (step === 0) fieldsToValidate = ['doc_type', 'doc_number'];
    if (step === 1) fieldsToValidate = ['email', 'full_name'];
    if (step === 2) fieldsToValidate = ['password', 'confirm_password'];

    const isValidStep = await methods.trigger(fieldsToValidate);

    if (isValidStep) {
      setStep((prev) => prev + 1);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await dispatch(register(data)).unwrap();
      if (res) {
        setSuccess(true);
      }
    } catch (error: any) {
      setError(
        error || 'Registration failed. Please check your data and try again.'
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-5 sm:px-0 pt-28 pb-10">
      {success && (
        <SuccessModal show={success} onClose={() => setSuccess(false)} />
      )}
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}

      <div className="w-full max-w-lg flex flex-col items-center lg:items-start gap-12 relative">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-white text-5xl font-special font-bold">
            Welcome!
          </h2>
          <p className="text-gray-300 text-[15px] font-special font-semibold text-center">
            Create your account to get started with Katharsis, the ultimate
            platform for managing your projects and tasks efficiently.
          </p>
        </div>

        <div className="relative w-full p-[2px] rounded-3xl bg-linear-to-b from-gray-500 via-white to-gray-500">
          <div className="flex flex-col w-full rounded-3xl bg-theme-midnight-blue p-14 gap-6 transition-all duration-500">
            <div className="flex flex-col items-center justify-center gap-6 -mt-4">
              <h3 className="text-white text-xl font-special font-bold mb-2">
                Register with
              </h3>
              <div className="flex flex-row items-center justify-center gap-5">
                {[
                  <FacebookIcon className="w-6 h-6 text-white" />,
                  <AppleIcon className="w-6 h-6 text-white" />,
                  <GoogleIcon className="w-6 h-6 text-white" />,
                ].map((icon, index) => (
                  <Icon key={index} icon={icon} />
                ))}
              </div>
            </div>

            <p className="text-gray-400 text-center font-special font-bold text-lg">
              or
            </p>

            {/* Form */}
            <Form<FormValues>
              methods={methods}
              onSubmit={onSubmit}
              className="w-full flex flex-col gap-5"
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
                  <EmailInput
                    name="email"
                    label="Email"
                    placeholder="Your email address..."
                  />
                  <Input
                    name="full_name"
                    label="Full Name"
                    placeholder="Your full name..."
                    rules={{ required: 'Full name is required' }}
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

              {/* Botones */}
              <div
                className={`flex mt-2 gap-4 ${
                  step === 0 || step === 2
                    ? 'justify-center'
                    : 'justify-between'
                }`}
              >
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="w-1/2 py-2.5 px-2 bg-gray-300 hover:bg-gray-200 rounded-xl text-gray-800 text-[10.5px] font-special font-bold transition-colors duration-300 cursor-pointer"
                  >
                    BACK
                  </button>
                )}

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={`${
                      step === 0 ? 'w-full' : 'w-1/2'
                    } py-2.5 px-2 rounded-xl text-white text-[10.5px] font-special font-bold transition-colors duration-300 bg-theme-dodger-blue hover:bg-blue-600 cursor-pointer`}
                  >
                    NEXT
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`w-1/2 py-2.5 px-2 bg-theme-dodger-blue enabled:hover:bg-blue-600 rounded-xl text-white text-[10.5px] font-special font-semibold transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed`}
                  >
                    SIGN UP
                  </button>
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
                    <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full" />
                  </span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
