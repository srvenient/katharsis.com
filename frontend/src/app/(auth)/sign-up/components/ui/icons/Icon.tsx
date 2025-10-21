interface IconProps {
  icon: React.ReactNode;
}

export default function Icon({ icon }: IconProps) {
  return (
    <div className="p-[2px] rounded-2xl bg-linear-to-b from-gray-500 via-white/60 to-gray-500 group">
      <button className="relative flex items-center justify-center px-6 py-6 text-sm font-semibold text-white bg-theme-midnight-blue rounded-2xl w-full cursor-pointer overflow-hidden focus:outline-none">
        {/* Ícono */}
        <span className="relative z-10 flex items-center justify-center">
          {icon}
        </span>

        {/* Brillo más visible */}
        <span
          className="
            absolute inset-0 
            bg-[radial-gradient(circle,var(--tw-gradient-stops))]
          from-white/70 via-blue-300/40 to-transparent 
            opacity-0 scale-0 
            rounded-2xl 
            transition-all duration-700 ease-out
            group-hover:opacity-100 group-hover:scale-[2.5]
            group-focus:opacity-100 group-focus:scale-[2.5]
            blur-xl
          "
        />

        <span
          className="
            absolute inset-0 
            bg-white/40 
            opacity-0 
            transition-all duration-700 ease-out
            group-hover:opacity-100 group-focus:opacity-100
            blur-3xl
          "
        />
      </button>
    </div>
  );
}
