'use client';

import { Form } from '@/app/components/form/Form';
import ConfirmPasswordInput from '@/app/components/form/input/ConfirmPasswordInput';
import PasswordInput from '@/app/components/form/input/PasswordInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { motion } from 'framer-motion';

type FormValues = {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
};

export default function ChangePasswordForm() {
  const [success, setSuccess] = useState(false);

  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_new_password: '',
    },
  });

  const {
    formState: { isValid, isSubmitting, errors },
    reset,
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    // Handle form submission
  };

  return (
    <section
      className="
        relative flex flex-col
        bg-[linear-gradient(127.09deg,rgba(6,11,40,0.94)_19.41%,rgba(10,14,35,0.49)_76.65%)]
        rounded-2xl px-10 py-8 text-white
        shadow-lg
      "
    >
      <h2 className="text-lg font-special font-semibold mb-6 tracking-wider">
        Change Password
      </h2>

      <Form<FormValues>
        methods={methods}
        onSubmit={onSubmit}
        className="flex flex-col gap-6"
      >
        <PasswordInput name="current_password" label="Current Password" placeholder='Current Password' />
        <PasswordInput name="new_password" label="New Password" placeholder='New Password' />
        <ConfirmPasswordInput
          name="confirm_new_password"
          label="Confirm New Password"
          placeholder="Confirm your new password..."
        />

        {success && (
          <p className="text-green-400 text-sm animate-fadeIn">
            ✅ Password successfully changed!
          </p>
        )}

        <div className="flex justify-between">
          <div className="mt-6 text-white">
            <h3 className="text-lg font-semibold mb-2">
              Password requirements
            </h3>
            <p className="text-sm text-white/60 mb-3">
              Please follow this guide for a strong password:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-white/60 ml-1.5">
              <li>One special character</li>
              <li>Min 6 characters</li>
              <li>At least one number</li>
              <li>Change it often</li>
            </ul>
          </div>

          <motion.button
            type="submit"
            disabled={!isValid || isSubmitting}
            whileTap={{ scale: 0.98 }}
            className={`
              w-fit self-end py-3 px-7 mt-2 flex items-center justify-center gap-2 
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
              'UPDATE PASSWORD'
            )}
          </motion.button>
        </div>
      </Form>
    </section>
  );
}
