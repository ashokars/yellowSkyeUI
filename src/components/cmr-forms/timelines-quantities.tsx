import { useState } from "react";
import FieldMappingForm from "./field-mapping";
import QuantitiesDetailForm from "./quantities-detail";

interface Iprops {
  onSubmit: () => void;
}

export default function TimelinesQuantitiesForm({ onSubmit }: Iprops) {
  //logical
  const [files, setFiles] = useState({
    quantitiesDetail: null,
  });
  const [currentStep, setCurrentStep] = useState(1);

  const proceedForm = (step: string, file: any) => {
    switch (step) {
      case "fieldMapping":
        setCurrentStep(2);
        break;
      case "quantitiesDetail":
        setFiles({ quantitiesDetail: file });
        break;
      default:
        break;
    }
  };

  const ConditionalFormRendering = () => {
    switch (currentStep) {
      case 1:
        return <FieldMappingForm onSubmit={proceedForm} />;
      case 2:
        return <QuantitiesDetailForm onSubmit={proceedForm} />;
      default:
        <h1>Invalid step</h1>;
        break;
    }
  };

  //style related declaration
  const activeClasses = "font-semibold text-[#444444]";
  const inactiveClasses = "font-medium text-[#444444]/50";

  const getClasses = (identifer: number) => {
    return currentStep === identifer ? activeClasses : inactiveClasses;
  };

  return (
    <div className="py-6 h-5/6">
      <h2 className="text-base text-xl font-semibold leading-7 text-[#222222] pb-2">
        Project plan
      </h2>
      <div className="flex flex-wraptext-sm">
        <div className="flex pb-2 lg:basis-1/6 md:basis-2/12 w-full">
          <div className={getClasses(1)}>1. Field mapping</div>
        </div>
        <div className="flex pb-2 lg:basis-2/6 md:basis-4/12 w-full">
          <div className={getClasses(2)}>2. Project plan and quantities</div>
        </div>
      </div>
      {ConditionalFormRendering()}
    </div>
  );
}
