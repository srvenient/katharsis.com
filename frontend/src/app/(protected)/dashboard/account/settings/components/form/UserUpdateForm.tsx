'use client';

import { Form } from '@/app/components/form/Form';
import EmailInput from '@/app/components/form/input/EmailInput';
import Input from '@/app/components/form/input/Input';
import SelectInput from '@/app/components/form/input/SelectInput';
import { SubmitHandler, useForm } from 'react-hook-form';

const days = Array.from({ length: 31 }, (_, i) => ({
  label: (i + 1).toString(),
  value: (i + 1).toString(),
}));
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const months = monthNames.map((name, i) => ({
  label: name,
  value: (i + 1).toString(),
}));
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => ({
  label: (1900 + i).toString(),
  value: (1900 + i).toString(),
})).reverse();

type FormValues = {
  first_name: string;
  last_name: string;
  gender: 'male' | 'female';
  day_of_birth: string;
  month_of_birth: string;
  year_of_birth: string;
  email: string;
  confirm_email: string;
  location: string;
  phone_number: string;
  language: string;
};

export default function UserUpdateForm() {
  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
      gender: 'male',
      month_of_birth: '1',
      day_of_birth: '1',
      year_of_birth: '2025',
      email: '',
      confirm_email: '',
      location: '',
      phone_number: '',
      language: '',
    },
  });

  const {
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    // Handle form submission
  };

  return (
    <div
      className="
        relative flex flex-col rounded-2xl px-10 py-8 text-white
        bg-[linear-gradient(127.09deg,rgba(6,11,40,0.94)_19.41%,rgba(10,14,35,0.49)_76.65%)]
      "
    >
      <h2 className="text-lg font-special font-semibold mb-10 tracking-wider">
        Basic Info
      </h2>

      <Form<FormValues>
        methods={methods}
        onSubmit={onSubmit}
        className="w-full flex flex-col gap-6"
      >
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1">
            <Input
              name="first_name"
              label="First Name"
              placeholder="Mike"
              rules={{ required: 'First name is required' }}
            />
          </div>
          <div className="flex-1">
            <Input
              name="last_name"
              label="Last Name"
              placeholder="Johnson"
              rules={{ required: 'Last name is required' }}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1">
            <SelectInput
              name="gender"
              label="I'm"
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
            />
          </div>
          <div className="flex-1">
            <SelectInput
              name="month_of_birth"
              label="Birth Date"
              options={months}
            />
          </div>
          <div className="flex-1 mt-8">
            <SelectInput name="day_of_birth" label="" options={days} />
          </div>
          <div className="flex-1 mt-8">
            <SelectInput name="year_of_birth" label="" options={years} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1">
            <EmailInput
              name="email"
              label="Email"
              placeholder="email@example.com"
            />
          </div>
          <div className="flex-1">
            <EmailInput
              name="confirm_email"
              label="Confirm Email"
              placeholder="email@example.com"
              rules={{
                validate: (value: string, formValues: FormValues) =>
                  value === formValues.email || 'Emails do not match',
              }}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1">
            <Input
              name="location"
              label="Your Location"
              placeholder="Sydney, Australia"
              rules={{ required: 'Location is required' }}
            />
          </div>
          <div className="flex-1">
            <Input
              name="phone_number"
              label="Phone Number"
              placeholder="+57 300 123 4567"
              rules={{ required: 'Phone number is required' }}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}
