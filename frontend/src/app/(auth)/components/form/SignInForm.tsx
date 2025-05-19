  "use client";

  import {FormProvider, useForm} from "react-hook-form";
  import PasswordInput from "@/app/(auth)/components/ui/input/PasswordInput";
  import EmailInput from "@/app/(auth)/components/ui/input/EmailInput";
  import React, {useState} from "react";
  import {fastApiHttpClient} from "@/common/http-client/fastapi.http-client";
  import {useRouter} from "next/navigation";
  import ForgotPasswordModal from "@/app/(auth)/components/modal/ForgotPasswordModal";

  type Inputs = {
    username: string;
    password: string;
  }

  export default function SignInForm({setErrorAction}: { setErrorAction: (msg: string | null) => void; }) {
    const methods = useForm<Inputs>({
      mode: "onChange",
      defaultValues: {
        username: "",
        password: "",
      }
    });

    const {handleSubmit, formState: {isValid}} = methods;
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    const onSubmit = handleSubmit(async (data: Inputs) => {
      setErrorAction(null);
      try {
        const ok = await fastApiHttpClient.login({
          username: data.username,
          password: data.password
        });
        if (ok) {
          router.push("/dashboard");
        }
      } catch (err: any) {
        setErrorAction(err.message);
      }
    });

    return (
      <>
        <FormProvider {...methods}>
          <form
            onSubmit={onSubmit}
            className="space-y-4"
          >
            <EmailInput name="username"/>
            <PasswordInput/>
            <div className="-mt-4">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="text-sm text-blue-600 hover:underline cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800 transition-colors mt-2 ${!isValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              disabled={!isValid}
            >
              Iniciar sesión
            </button>
          </form>
        </FormProvider>

        {showModal && (
          <ForgotPasswordModal onCloseAction={() => setShowModal(false)} />
        )}
      </>
    )
  }