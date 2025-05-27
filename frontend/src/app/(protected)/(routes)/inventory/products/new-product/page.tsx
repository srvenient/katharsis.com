"use client";

import NewProductForm from "@/app/(protected)/(routes)/inventory/products/new-product/components/form";
import React, {useState} from "react";
import Stepper from "@/app/(protected)/(routes)/inventory/products/new-product/components/ui/stepper";

export default function NewProduct() {
  const [step, setStep] = useState(1);

  return (
    <div className="relative flex flex-col justify-center items-center ml-10 mt-30 z-30 w-full">
      <Stepper currentStep={step}/>
      <div className="mt-15 w-full max-w-5xl px-4">
        <NewProductForm step={step} setStepAction={setStep}/>
      </div>
    </div>
  );
}
