import React from "react";
import {steps} from "@/app/(protected)/(routes)/inventory/products/new-product/components/ui/stepper/Stepper.data";

interface StepperProps {
  currentStep: number;
}

export default function Stepper({currentStep}: StepperProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="flex justify-center items-center py-6 relative gap-10">
        {steps.map((step, index) => {
          const displayIndex = index + 1;
          const isCompleted = displayIndex < currentStep;
          const isActive = displayIndex === currentStep;

          return (
            <React.Fragment key={displayIndex}>
              <div className="flex flex-col items-cente relative">
                <div
                  className={`w-5 h-5 rounded-full z-10
                    ${isCompleted || isActive ? "bg-white" : ""}
                    ${!isCompleted && !isActive ? "bg-blue-500" : ""}`}
                />
                <div
                  className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-base font-bold whitespace-nowrap
                  ${isActive ? " text-white" : "text-neutral-400"}`}
                >
                  {`${displayIndex}. ${step.label}`}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 h-1 bg-gray-600 -mx-10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-full bg-blue-600"/>

                  {isCompleted && (
                    <div
                      className="absolute top-0 left-0 h-full bg-white transition-all duration-700 ease-in-out"
                      style={{width: "100%"}}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
