import { useState } from "react";
import LocationDetailForm from "./location-detail";
import ActivityDetailForm from "./activity-detail";
import MonitoringFrequencyForm from "./monitoring-frequency";
import FieldMappingForm from "./field-mapping";

interface Iprops {
  onSubmit: () => void;
}

export default function LocationActivityForm({ onSubmit }: Iprops) {
  //logical
  const [files, setFiles] = useState({
    fieldMapping: null,
  });
  const [currentStep, setCurrentStep] = useState(1);

  const proceedForm = (step: string, file?: any) => {
    switch (step) {
      case "locationDetail":
        setCurrentStep(2);
        break;
      case "activityDetail":
        setCurrentStep(3);
        break;
      case "monitoringFrequency":
        setCurrentStep(4);
        break;
      case "fieldMapping":
        setFiles({ ...files, fieldMapping: file });
        onSubmit();
        break;
      default:
        break;
    }
  };

  const ConditionalFormRendering = () => {
    switch (currentStep) {
      case 1:
        return <LocationDetailForm onSubmit={proceedForm} />;
      case 2:
        return <ActivityDetailForm onSubmit={proceedForm} />;
      case 3:
        return <MonitoringFrequencyForm onSubmit={proceedForm} />;
      case 4:
        return <FieldMappingForm onSubmit={proceedForm} />;
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
        Cost, location and activities
      </h2>
      <div className="flex lg:flex-row flex-col text-sm">
        <div className="flex pb-2 lg:basis-1/6 md:basis-2/12 w-full">
          <div className={getClasses(1)}>1. Location details</div>
        </div>
        <div className="flex pb-2 lg:basis-1/6 md:basis-3/12 w-full">
          <div className={getClasses(2)}>2. Activity details</div>
        </div>
        <div className="flex pb-2 lg:basis-1/6 md:basis-3/12 w-full">
          <div className={getClasses(3)}>3. Monitoring frequency</div>
        </div>
        <div className="flex pb-2 lg:basis-2/6 md:basis-3/12 w-full">
          <div className={getClasses(4)}>4. Field mapping</div>
        </div>
      </div>
      {ConditionalFormRendering()}
    </div>
  );
}
