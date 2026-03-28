"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingStepperProps {
  currentStep: number;
}

export function BookingStepper({ currentStep }: BookingStepperProps) {
  const t = useTranslations("booking");
  const steps = [t("step1"), t("step2"), t("step3")];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((label, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isComplete = step < currentStep;

        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  isComplete && "bg-primary-600 text-white",
                  isActive && "bg-primary-600 text-white ring-4 ring-primary-100",
                  !isActive && !isComplete && "bg-gray-200 text-gray-500"
                )}
              >
                {isComplete ? <Check className="h-5 w-5" /> : step}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium",
                  isActive ? "text-primary-700" : "text-gray-500"
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "w-16 md:w-24 h-0.5 mx-2 mt-[-1rem]",
                  step < currentStep ? "bg-primary-600" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
