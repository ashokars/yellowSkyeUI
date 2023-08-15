"use client";
import FloatNav from "@/components/admin/floatnav";
import ConfigureProjectForm from "@/components/cmr-forms/configure-project";
import CostLocationForm from "@/components/cmr-forms/cost-location";
import TimelinesQuantitiesForm from "@/components/cmr-forms/timelines-quantities";
import { useState } from "react";

export default function CMR() {
  //logical
  const [currentStep, setCurrentStep] = useState(1);

  const ConditionalFormRendering = () => {
    switch (currentStep) {
      case 1:
        return <ConfigureProjectForm onSubmit={() => setCurrentStep(2)} />;
      case 2:
        return <CostLocationForm onSubmit={() => setCurrentStep(3)} />;
      default:
        return <TimelinesQuantitiesForm onSubmit={() => setCurrentStep(3)} />;
    }
  };

  //style related declaration
  const customClassSelector = (identifer: number) => {
    return currentStep === identifer
      ? "active"
      : currentStep > identifer
      ? "completed"
      : "pending";
  };

  const numberBorder = {
    completed: "bg-[#26282B] text-white",
    active: "bg-[#228CBA] text-white",
    pending: "border-[#666666] border-[1.5px] text-[#666666]",
  };

  const textStyle = {
    completed: "text-[#26282B] font-semibold",
    active: "text-[#228DBB] font-semibold",
    pending: "text-[#666666]",
  };

  return (
    <div className="flex h-full w-full flex-col items-center bg-white p-4">
      <FloatNav />
      <div className="py-4 md:w-11/12 items-center">
        <div className="flex flex-wrap text-[#666666] text-sm">
          <div className="flex pb-2 lg:basis-1/6 md:basis-3/12 w-full">
            <div
              className={`${
                numberBorder[customClassSelector(1)]
              } flex h-5 w-5 shrink-0 grow-0 items-center justify-center rounded-full`}
            >
              1
            </div>
            <div className={`px-2 ${textStyle[customClassSelector(1)]}`}>
              Configure project
            </div>
          </div>
          <div className="flex pb-2 lg:basis-1/4 md:basis-4/12 w-full">
            <div
              className={`${
                numberBorder[customClassSelector(2)]
              } flex h-5 w-5 shrink-0 grow-0 items-center justify-center rounded-full`}
            >
              2
            </div>
            <div className={`px-2 ${textStyle[customClassSelector(2)]}`}>
              Cost, location and activities
            </div>
          </div>
          <div className="flex pb-2 lg:basis-1/4 md:basis-5/12 w-full">
            <div
              className={`${
                numberBorder[customClassSelector(3)]
              } flex h-5 w-5 shrink-0 grow-0 items-center justify-center rounded-full`}
            >
              3
            </div>
            <div className={`px-2 ${textStyle[customClassSelector(3)]}`}>
              Project timelines and quantities
            </div>
          </div>
        </div>
        {ConditionalFormRendering()}
      </div>
    </div>
  );
}
