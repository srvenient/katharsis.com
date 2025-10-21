import SignUpForm from './components/form/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      <div
        className="
            absolute inset-0
            bg-[url('/images/body-background.webp'),linear-gradient(310deg,rgb(15,18,59)14.25%,rgb(9,13,46)56.45%,rgb(2,5,21)86.14%)]
            bg-cover
            bg-buttom
            z-0
          "
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full p-4 z-10">
        <div
          className="
              w-full
              bg-[url('/images/background-basic-auth.64e8d8ef.png')]
              bg-top
              bg-no-repeat
              bg-cover
              rounded-3xl
              h-140
          "
        />
      </div>
      <div className="z-30 w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
}
