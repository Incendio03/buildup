import * as React from "react";
import { cn } from "@/lib/utils";

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: {
    label: string;
    description: string;
  }[];
  currentStep?: number;
  orientation?: "vertical" | "horizontal";
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    { className, steps, currentStep = 0, orientation = "vertical", ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col" : "flex-row gap-4",
          className,
        )}
        {...props}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-3",
              orientation === "vertical" &&
                index !== steps.length - 1 &&
                "pb-6",
            )}
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-2.5 w-2.5 rounded-full",
                  index <= currentStep ? "bg-primary" : "bg-muted",
                )}
              />
            </div>
            <div className="flex-1 pb-2">
              <p className="text-sm font-medium text-foreground">
                {step.label}
              </p>
              <p className="text-xl font-bold text-foreground mt-1">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  },
);

Stepper.displayName = "Stepper";

export { Stepper };
