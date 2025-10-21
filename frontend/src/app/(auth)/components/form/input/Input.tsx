import { useFormContext } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

type InputProps = {
  name: string;
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  label?: string;
  rules?: object;
};

export default function Input({
  name,
  type,
  placeholder = '',
  label,
  rules,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <div className="flex items-center gap-1">
          <label
            htmlFor={name}
            className="block text-[13px] text-white font-special font-semibold"
          >
            {label}
          </label>

          {errors[name] && (
            <div className="relative group">
              <ExclamationCircleIcon className="w-4 h-4 text-red-500 cursor-pointer" />

              {/* Tooltip */}
              <span className="absolute left-full ml-2 hidden group-hover:block bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                {errors[name]?.message?.toString()}
              </span>
            </div>
          )}
        </div>
      )}
      <div
        className={`
          relative rounded-2xl p-px transition-colors duration-150
        `}
        style={{
          background:
            'radial-gradient(94.43% 69.43%, rgb(255,255,255) 0%, rgba(255,255,255,0) 100%)',
        }}
      >
        <input
          type={type}
          placeholder={placeholder}
          className={`
            w-full py-2.5 px-4
            bg-theme-midnight-blue
            rounded-2xl
            border-[0.5px] border-[rgb(74,85,104)]
            text-sm  
            placeholder:text-[rgb(200,200,210)] placeholder:text-[12px] placeholder:font-light placeholder:opacity-15
            outline-none
            focus:ring-1 focus:ring-blue-500 focus:caret-blue-500
            ${errors[name] ? 'ring-1 ring-red-500' : ''}
            peer
            transition-all duration-150
          `}
          {...register(name, rules)}
        />
      </div>
    </div>
  );
}
