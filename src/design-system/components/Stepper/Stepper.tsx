import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export interface StepperStep {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  showStepNumbers?: boolean;
  showStepDescriptions?: boolean;
  allowClickOnCompleted?: boolean;
  allowClickOnFuture?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  orientation = "horizontal",
  size = "md",
  showStepNumbers = true,
  showStepDescriptions = true,
  allowClickOnCompleted = true,
  allowClickOnFuture = false,
}) => {
  const sizeClasses = {
    sm: {
      container: "gap-2",
      step: "p-2",
      icon: "w-6 h-6 text-sm",
      title: "text-sm",
      description: "text-xs",
      line: "h-0.5",
    },
    md: {
      container: "gap-4",
      step: "p-3",
      icon: "w-8 h-8 text-base",
      title: "text-base",
      description: "text-sm",
      line: "h-1",
    },
    lg: {
      container: "gap-6",
      step: "p-4",
      icon: "w-10 h-10 text-lg",
      title: "text-lg",
      description: "text-base",
      line: "h-1.5",
    },
  };

  const currentSize = sizeClasses[size];

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return "completed";
    if (stepIndex === currentStep) return "current";
    return "future";
  };

  const canClickStep = (stepIndex: number) => {
    if (steps[stepIndex].disabled) return false;
    if (stepIndex < currentStep) return allowClickOnCompleted;
    if (stepIndex > currentStep) return allowClickOnFuture;
    return true;
  };

  const handleStepClick = (stepIndex: number) => {
    if (canClickStep(stepIndex) && onStepClick) {
      onStepClick(stepIndex);
    }
  };

  const renderStepIcon = (step: StepperStep, stepIndex: number, status: string) => {
    const baseClasses = `flex items-center justify-center rounded-full border-2 transition-colors ${currentSize.icon}`;

    let statusClasses = "";
    let content = null;

    switch (status) {
      case "completed":
        statusClasses = "bg-primary-600 border-primary-600 text-white";
        content = <FontAwesomeIcon icon={faCheck} />;
        break;
      case "current":
        statusClasses = "bg-white border-primary-600 text-primary-600";
        content = showStepNumbers ? (stepIndex + 1).toString() : step.icon;
        break;
      case "future":
        statusClasses = "bg-white border-neutral-300 text-neutral-400";
        content = showStepNumbers ? (stepIndex + 1).toString() : step.icon;
        break;
    }

    return <div className={`${baseClasses} ${statusClasses}`}>{content}</div>;
  };

  const renderStepContent = (step: StepperStep, stepIndex: number, status: string) => {
    const isClickable = canClickStep(stepIndex);
    const cursorClass = isClickable ? "cursor-pointer" : "cursor-not-allowed";

    return (
      <div
        className={`flex items-center ${currentSize.step} ${cursorClass} ${
          isClickable ? "hover:bg-neutral-50" : ""
        }`}
        onClick={() => handleStepClick(stepIndex)}
      >
        {renderStepIcon(step, stepIndex, status)}
        <div className="ml-3 flex-1">
          <div
            className={`font-medium ${currentSize.title} ${
              status === "completed"
                ? "text-primary-600"
                : status === "current"
                  ? "text-neutral-900"
                  : "text-neutral-500"
            }`}
          >
            {step.title}
          </div>
          {showStepDescriptions && step.description && (
            <div className={`${currentSize.description} text-neutral-500 mt-1`}>
              {step.description}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderConnector = (stepIndex: number) => {
    if (stepIndex === steps.length - 1) return null;

    const isCompleted = stepIndex < currentStep;
    const connectorClasses = `flex-1 transition-colors ${currentSize.line} ${
      isCompleted ? "bg-primary-600" : "bg-neutral-300"
    }`;

    return <div className={connectorClasses} />;
  };

  if (orientation === "vertical") {
    return (
      <div className="flex flex-col">
        {steps.map((step, stepIndex) => {
          const status = getStepStatus(stepIndex);

          return (
            <div key={step.id} className="flex">
              <div className="flex flex-col items-center">
                {renderStepIcon(step, stepIndex, status)}
                {stepIndex < steps.length - 1 && (
                  <div
                    className={`w-0.5 mt-2 transition-colors ${
                      stepIndex < currentStep ? "bg-primary-600" : "bg-neutral-300"
                    }`}
                    style={{ height: "2rem" }}
                  />
                )}
              </div>
              <div className="flex-1 ml-4">{renderStepContent(step, stepIndex, status)}</div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center ${currentSize.container}`}>
      {steps.map((step, stepIndex) => {
        const status = getStepStatus(stepIndex);

        return (
          <React.Fragment key={step.id}>
            <div className="flex-1">{renderStepContent(step, stepIndex, status)}</div>
            {renderConnector(stepIndex)}
          </React.Fragment>
        );
      })}
    </div>
  );
};
