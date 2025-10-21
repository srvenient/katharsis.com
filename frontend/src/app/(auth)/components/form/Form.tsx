'use client';

import {
  useForm,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  FormProvider,
} from 'react-hook-form';
import { ReactNode } from 'react';

type FormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  className?: string;
  methods?: UseFormReturn<T>;
};

export function Form<T extends FieldValues>({
  onSubmit,
  children,
  className = '',
  methods: propMethods,
}: FormProps<T>) {
  const defaultMethods = useForm<T>();
  const methods = propMethods || defaultMethods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}
