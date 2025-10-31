import Input from './Input';

type EmailInputProps = {
  name?: string;
  placeholder?: string;
  label?: string;
  rules?: object;
};

export default function EmailInput({
  name,
  placeholder = 'Email / Username',
  label,
  rules,
}: EmailInputProps) {
  return (
    <Input
      name={name || 'username'}
      type="text"
      label={label || 'Email or Username'}
      placeholder={placeholder}
      rules={{
        required: 'Email is required',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Invalid email address',
        },
        ...rules,
      }}
    />
  );
}
