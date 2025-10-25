import SignInForm from '@/app/(auth)/sign-in/components/form/SignInForm';

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full lg:w-1/2 relative h-screen flex items-center justify-center xl:justify-end px-0 xl:px-45">
        <div
          className="
            absolute inset-0
            bg-[url('/images/body-background.webp'),linear-gradient(310deg,rgb(15,18,59)14.25%,rgb(9,13,46)56.45%,rgb(2,5,21)86.14%)]
            bg-cover
            bg-center
            bg-blend-multiply
          "
        />
        <div className="w-full max-w-xs z-10 -mt-28">
          <SignInForm />
        </div>
      </div>
      <div
        className="hidden lg:block w-1/2 h-screen relative"
        style={{
          background:
            'linear-gradient(310deg, rgb(0, 117, 255), rgb(33, 212, 253))',
        }}
      >
        <img
          src="/images/illustration-image.webp"
          alt="Illustration"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full object-contain object-center"
        />
      </div>
    </div>
  );
}
