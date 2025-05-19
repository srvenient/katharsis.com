"use client";

import {FormProvider, useForm} from "react-hook-form";
import React from "react";
import Input from "@/app/(auth)/components/ui/input/Input";
import Link from "next/link";
import {fastApiHttpClient} from "@/common/http-client/fastapi.http-client";
import SelectInput from "@/app/(auth)/components/ui/input/SelectInput";
import EmailInput from "@/app/(auth)/components/ui/input/EmailInput";
import PasswordInput from "@/app/(auth)/components/ui/input/PasswordInput";
import ConfirmPasswordInput from "@/app/(auth)/components/ui/input/ConfirmPasswordInput";

type SignUpFormProps = {
  setErrorAction: (msg: string | null) => void;
  setSuccessAction: (state: boolean) => void;
  step: number;
  setStepAction: React.Dispatch<React.SetStateAction<number>>;
}

type Inputs = {
  document_type: string;
  id: string;
  email: string;
  username: string;
  phone_number: string;
  is_active: boolean;
  full_name: string;
  password: string;
  confirm_password: string;
  role_id: number;
}

export default function SignUpForm({setErrorAction, setSuccessAction, step, setStepAction}: SignUpFormProps) {
  const methods = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      document_type: "C.C",
      id: "",
      email: "",
      username: "",
      phone_number: "",
      is_active: true,
      full_name: "",
      password: "",
      confirm_password: "",
      role_id: 1
    }
  });
  const {handleSubmit, formState: {isValid}, watch, trigger, reset} = methods;

  const documentType = watch("document_type");

  const validateDocumentNumber = (value: string) => {
    switch (documentType) {
      case "C.C":
      case "C.E":
      case "T.I":
        return /^\d{6,10}$/.test(value) || "Debe tener entre 6 y 10 dígitos numéricos";
      case "Pasaporte":
        return /^[a-zA-Z0-9]{5,15}$/.test(value) || "Debe ser alfanumérico, 5-15 caracteres";
      case "NIT":
        return /^\d{9,15}$/.test(value) || "Debe tener entre 9 y 15 dígitos numéricos";
      default:
        return "Tipo de documento inválido";
    }
  };

  const onSubmit = handleSubmit(async (formData: Inputs) => {
    setErrorAction(null);
    setSuccessAction(false);
    try {
      const {confirm_password, ...data} = formData;
      if (data.password !== confirm_password) {
        return;
      }
      console.log(data);
      await fastApiHttpClient.register({...data, email: data.email.toLocaleLowerCase()});
      reset();
      setSuccessAction(true)
      setErrorAction(null);
      setStepAction(1);
    } catch (err: any) {
      setErrorAction(err.message);
      setSuccessAction(false);
    }
  });

  const fieldsByStep: Record<number, (keyof Inputs)[]> = {
    1: ["document_type", "id"],
    2: ["email", "full_name", "username", "phone_number"],
    3: ["password", "confirm_password"],
  };

  const handleNextStep = async () => {
    const fieldsToValidate = fieldsByStep[step] || [];
    const valid = await trigger(fieldsToValidate);
    if (valid) setStepAction(step + 1);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita el envío por defecto

      const fieldsToValidate = fieldsByStep[step] || [];
      const valid = await trigger(fieldsToValidate);

      if (valid) {
        if (step < 3) {
          setStepAction(step + 1);
        } else {
          await onSubmit();
        }
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        onKeyDown={handleKeyDown}
        className="space-y-3"
      >
        {step === 1 && (
          <>
            <SelectInput
              name="document_type"
              label="Tipo de documento"
              options={[
                {label: "Cédula de Ciudadanía", value: "C.C"},
                {label: "Cédula de Extranjería", value: "C.E"},
                {label: "Tarjeta de Identidad", value: "T.I"},
                {label: "Pasaporte", value: "Pasaporte"},
                {label: "NIT", value: "NIT"},
              ]}
              rules={{required: "El tipo de documento es obligatorio"}}
            />
            <Input
              name="id"
              type="text"
              placeholder="Número de identificación"
              inputMode="text"
              rules={{
                required: "El número de identificación es obligatorio",
                validate: validateDocumentNumber,
              }}
            />
          </>
        )}

        {step === 2 && (
          <>
            <EmailInput placeholder="Correo electrónico" requiredMessage={true}/>
            <Input
              name="full_name"
              type="text"
              placeholder="Nombre completo"
              inputMode="text"
              rules={{
                required: "Nombre completo obligatorio",
                minLength: {value: 3, message: "Debe tener al menos 3 caracteres"},
                maxLength: {value: 50, message: "No debe tener más de 50 caracteres"}
              }}
            />
            <Input
              name="username"
              type="text"
              placeholder="Nombre de usuario"
              inputMode="text"
              rules={{
                required: "Nombre de usuario obligatorio",
                minLength: {value: 3, message: "Debe tener al menos 3 caracteres"},
                maxLength: {value: 20, message: "No debe tener más de 20 caracteres"}
              }}
            />
            <Input
              name="phone_number"
              type="tel"
              inputMode="numeric"
              onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ''))}
              placeholder="Número de teléfono"
              maxLength={10}
              rules={{
                required: "Número de teléfono obligatorio",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "El número debe tener 10 dígitos"
                }
              }}
            />
          </>
        )}

        {step === 3 && (
          <>
            <PasswordInput/>
            <ConfirmPasswordInput/>
          </>
        )}

        <div className="flex justify-between mt-4">
          {step < 3 && (
            <button
              type="button"
              onClick={handleNextStep}
              className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800 transition-colors mt-2 ${!isValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              Continuar
            </button>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center">
              <label className="text-sm text-neutral-500">
                By registering, you agree to the {" "}
                <Link href="#" className="text-blue-600 hover:underline font-medium">
                  privacy policy
                </Link>{" "}
                and {" "}
                <Link href="#" className="text-blue-600 hover:underline font-medium">
                  terms of service.
                </Link>{" "}
              </label>
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800 transition-colors mt-2 ${!isValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                disabled={!isValid}
              >
                Regístrese
              </button>
            </div>
          )}
        </div>

      </form>
    </FormProvider>
  )
}