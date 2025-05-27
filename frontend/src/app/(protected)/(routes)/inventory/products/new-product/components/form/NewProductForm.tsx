"use client";

import {FormProvider, useForm} from "react-hook-form";
import React from "react";
import {
  getFieldsByStep,
  Inputs,
  Step
} from "@/app/(protected)/(routes)/inventory/products/new-product/components/form/NewProductForm.data";

interface NewProductFormProps {
  step: number;
  setStepAction: React.Dispatch<React.SetStateAction<number>>;
}

export default function NewProductForm({step, setStepAction}: NewProductFormProps) {
  const methods = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      name: "",
      weight: 0,
      description: "",
      category: "",
      size: "",
      image: "asset/image/product-placeholder.png",
      price: 0,
      currency: "USD",
      sku: "",
      project_tags: []
    }
  });
  const {register, handleSubmit, formState: {isValid}, watch, trigger, reset} = methods;

  const onSubmit = handleSubmit(async (data: Inputs) => {
    console.log(data)
  });

  const handleNextStep = async () => {
    const fieldsToValidate = getFieldsByStep(step);
    const valid = await trigger(fieldsToValidate);

    if (valid && step < Step.Pricing) {
      setStepAction(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > Step.Information) {
      setStepAction(step - 1);
    }
  }
  const handleKeyDown = async (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const fieldsToValidate = getFieldsByStep(step);
      const valid = await trigger(fieldsToValidate);

      if (valid) {
        if (step < Step.Pricing) {
          setStepAction(step + 1);
        } else {
          await onSubmit();
        }
      }
    }
  };

  return (
    <FormProvider{...methods}>
      <form
        onSubmit={onSubmit}
        onKeyDown={handleKeyDown}
        className="space-y-3 w-full max-w-5xl"
      >
        <div className="relative flex flex-col max-w-5xl
           bg-[linear-gradient(to_right,rgba(6,11,40,0.94)_19.41%,rgba(10,14,35,0.49)_76.65%)]
           rounded-4xl px-10 py-8 text-white"
        >
          {step === 1 && (
            <div className="flex flex-col gap-8 w-full h-[380px]">
              <h1 className="text-xl font-bold tracking-wide">
                Información del producto
              </h1>
              <div className="flex flex-row items-center gap-8">
                <div className="w-1/2">
                  <label className="block text-xs font-bold mb-2">Nombre</label>
                  <input
                    type="text"
                    className="w-full bg-[#0f1535] border border-white/30 rounded-2xl p-2.5 text-xs outline-none focus:border-blue-500"
                    {...register("name", {required: true})}
                  />
                </div>
                <div className="w-1/2">
                  <div>
                    <label className="block text-xs font-bold mb-2">Peso</label>
                    <input
                      type="number"
                      className="w-full bg-[#0f1535] border border-white/30 rounded-2xl p-2.5 text-xs outline-none focus:border-blue-500"
                      {...register("weight", {required: true, valueAsNumber: true})}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-8">
                <div className="w-1/2 h-full flex flex-col">
                  <label className="block text-xs font-bold mb-2">
                    Descripción <span className="text-neutral-400">(optional)</span>
                  </label>
                  <textarea
                    className="flex-1 bg-[#0f1535] border border-white/30 rounded-2xl px-2.5 py-2 text-sm resize-none outline-none focus:border-blue-500 "
                    placeholder="Escribe una breve descripción del producto..."
                  />
                </div>
                <div className="w-1/2 h-full flex flex-col justify-between gap-7">
                  <div>
                    <label className="block text-xs font-bold mb-2">Categoría</label>
                    <select
                      className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-2.5 py-2 text-sm text-neutral-400 outline-none focus:border-blue-500">
                      <option>Ropa</option>
                      <option>Accesorios</option>
                      <option>Muebles</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2">Color</label>
                    <select
                      className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-2.5 py-2 text-sm text-neutral-400 outline-none focus:border-blue-500">
                      <option>Negro</option>
                      <option>Blanco</option>
                      <option>Gris</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-row-reverse items-center w-full -mt-2">
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!isValid}
                  className={`bg-blue-600 text-xs font-bold px-6 py-3 rounded-2xl cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed`}
                >
                  SIGUIENTE
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-8 w-full">
              <h1 className="text-xl font-bold tracking-wide">
                Precio
              </h1>
              <div className="flex flex-row items-center gap-8">
                <div className="w-full">
                  <div>
                    <label className="block text-xs font-bold mb-2">Imagen del producto</label>
                    <input
                      type="text"
                      readOnly
                      defaultValue="asset/image/product-placeholder.png"
                      placeholder="Suelte los archivos aquí para cargarlos"
                      className="w-full h-48 bg-[#0f1535] border-1 border-dashed border-white/30 rounded-2xl p-2.5 text-xs
                       outline-none hover:border-blue-500
                       placeholder:text-[15px] placeholder:text-center placeholder:text-white
                       text-transparent caret-transparent cursor-pointer"
                      {...register("image", {required: true})}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-8">
              </div>
              <div className="flex flex-row-reverse items-center justify-between w-full -mt-8">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className={`bg-blue-600 text-xs font-bold px-6 py-3 rounded-2xl cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed`}
                >
                  SIGUIENTE
                </button>
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className={`bg-white text-black text-xs font-bold px-6 py-3 rounded-2xl cursor-pointer`}
                >
                  VOLVER
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-8 w-full">
              <h1 className="text-xl font-bold tracking-wide">
                Precio
              </h1>
              <div className="flex flex-row items-center gap-8">
                <div className="w-1/2">
                  <div>
                    <label className="block text-xs font-bold mb-2">Precio</label>
                    <input
                      type="number"
                      placeholder="99.00"
                      defaultValue={1}
                      className="w-full bg-[#0f1535] border border-white/30 rounded-2xl p-2.5 text-xs outline-none focus:border-blue-500"
                      min={0}
                      {...register("price", {required: true, valueAsNumber: true, min: 0})}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div>
                    <label className="block text-xs font-bold mb-2">Moneda</label>
                    <select
                      className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-2.5 py-2 text-sm text-neutral-400 outline-none focus:border-blue-500"
                    >
                      <option>COP</option>
                      <option>USD</option>
                      <option>EUR</option>
                      <option>MXN</option>
                      <option>ARS</option>
                      <option>BRL</option>
                      <option>CLP</option>
                      <option>UYU</option>
                    </select>
                  </div>
                </div>
                <div className="w-1/2">
                  <div>
                    <label className="block text-xs font-bold mb-2">SKU</label>
                    <input
                      type="text"
                      placeholder="71283476591"
                      className="w-full bg-[#0f1535] border border-white/30 rounded-2xl p-2.5 text-xs outline-none focus:border-blue-500"
                      {...register("sku", {required: true})}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-8">
              </div>
              <div className="flex flex-row-reverse items-center justify-between w-full -mt-8">
                <button
                  type="submit"
                  className={`bg-blue-600 text-xs font-bold px-6 py-3 rounded-2xl cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed`}
                >
                  CREAR
                </button>
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className={`bg-white text-black text-xs font-bold px-6 py-3 rounded-2xl cursor-pointer`}
                >
                  VOLVER
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  )
}