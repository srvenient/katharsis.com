"use client";

import {Controller, FormProvider, useForm, useWatch} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {
  getFieldsByStep,
  Inputs,
  Step
} from "@/app/(protected)/(routes)/inventory/products/new-product/components/form/NewProductForm.data";
import {Category} from "@/common/types/category";
import {fastApiHttpClient} from "@/common/http-client/fastapi.http-client";
import {Props} from "@/app/(protected)/(routes)/inventory/products/new-product/components/form/NewProductForm.types";
import CurrencyInput from "@/app/(protected)/components/input/CurrencyInput";

export default function NewProductForm({step, setStepAction, setSuccessAction}: Props) {
  const methods = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      category_id: 1,
      currency: "COP",
    }
  });
  const {register, handleSubmit, formState: {isValid}, trigger, reset, control} = methods;

  const onSubmit = handleSubmit(async (data: Inputs) => {
    console.log(data)

    try {
      await fastApiHttpClient.createProduct(data);

      reset();
      setSuccessAction(true);
      setStepAction(Step.Information);

      alert("Producto creado exitosamente!");
    } catch (error) {
      console.error("Error creating product:", error);
    }
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

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fastApiHttpClient.getCategories({skip: 0, limit: 100})
      .then((fetchedCategories) => {
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const selectedCurrency = useWatch({
    control,
    name: 'currency',
  });

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
            <div className="flex flex-col gap-8 w-full h-72">
              <h1 className="text-xl font-bold tracking-wide">
                Información del producto
              </h1>
              <div className="flex flex-row items-center gap-8">
                <div className="flex flex-col w-1/2 h-full gap-6">
                  <div>
                    <label className="block text-xs font-bold mb-2">Nombre</label>
                    <input
                      type="text"
                      placeholder="ej. Celular A312 234"
                      className="w-full bg-[#0f1535] border border-white/30 rounded-2xl p-2.5 text-sm placeholder:text-xs outline-none focus:border-blue-500"
                      {...register("name", {
                        required: true,
                        maxLength: {
                          value: 100,
                          message: "El nombre del producto no puede exceder los 100 caracteres."
                        }
                      })}
                    />
                  </div>
                  <div className="h-full">
                    <label className="block text-xs font-bold mb-2">Categoría</label>
                    <select
                      className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-2.5 py-2 text-sm text-neutral-400 outline-none focus:border-blue-500"
                      {...register("category_id", {
                        required: true
                      })}
                    >
                      {categories.map((category: Category) => (
                        <option
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col w-1/2 h-full">
                  <label className="block text-xs font-bold mb-2">
                    Descripción <span className="text-neutral-400">(optional)</span>
                  </label>
                  <textarea
                    className="flex-1 bg-[#0f1535] border border-white/30 rounded-2xl px-2.5 py-2 text-sm resize-none outline-none focus:border-blue-500 "
                    placeholder="Escribe una breve descripción del producto..."
                    {...register("description", {required: false})}
                  />
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
                Inventario
              </h1>
              <div className="flex flex-row items-center gap-8">
                <div className="w-1/2">
                  <label className="block text-xs font-bold mb-2">Stock actual</label>
                  <input
                    type="number"
                    placeholder="100"
                    className="aparence-none w-full bg-[#0f1535] border border-white/30 rounded-2xl p-2.5 text-xs outline-none focus:border-blue-500"
                    {...register("current_stock", {
                      required: true,
                      valueAsNumber: true,
                      min: 0,
                      validate: (value) => value >= 0 || "El stock actual no puede ser negativo."
                    })}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-xs font-bold mb-2">Stock mínimo permitido</label>
                  <input
                    type="number"
                    placeholder="10"
                    className="aparence-none w-full bg-[#0f1535] border border-white/30 rounded-2xl p-2.5 text-xs outline-none focus:border-blue-500"
                    {...register("minimum_stock", {
                      required: true,
                      valueAsNumber: true,
                      min: 0,
                      validate: (value) => value >= 0 || "El stock mínimo permitido no puede ser negativo."
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-row-reverse items-center justify-between w-full">
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!isValid}
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
                    <label className="block text-xs font-bold mb-2">Precio de compra</label>
                    <Controller
                      name="sale_price"
                      control={control}
                      rules={{required: true}}
                      render={({field}) => (
                        <CurrencyInput
                          {...field}
                          currency={selectedCurrency as 'COP' | 'USD' | 'EUR'}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div>
                    <label className="block text-xs font-bold mb-2">Precio de venta</label>
                    <Controller
                      name="purchase_price"
                      control={control}
                      rules={{required: true}}
                      render={({field}) => (
                        <CurrencyInput
                          {...field}
                          currency={selectedCurrency as 'COP' | 'USD' | 'EUR'}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <label className="block text-xs font-bold mb-2">Moneda</label>
                  <Controller
                    name="currency"
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                      <select
                        {...field}
                        className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-2.5 py-2 text-sm text-neutral-400 outline-none focus:border-blue-500"
                      >
                        <option value="COP">COP</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    )}
                  />
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