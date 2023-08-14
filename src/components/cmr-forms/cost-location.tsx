import { useRef, useState } from "react";
import CostDetailForm from "./cost-details";
import LocationDetailForm from "./location-detail";
import ActivityDetailForm from "./activity-detail";
import MonitoringFrequencyForm from "./monitoring-frequency";

export default function CostLocationForm() {
  //logical
  const [files, setFiles] = useState({
    costDetail: null,
    locationDetail: null,
    activityDetail: null,
  });
  const [currentStep, setCurrentStep] = useState(1);

  const proceedForm = (step: string, file: any) => {
    switch (step) {
      case "costDetail":
        setFiles({ ...files, costDetail: file });
        setCurrentStep(2);
        break;
      case "locationDetail":
        setFiles({ ...files, locationDetail: file });
        setCurrentStep(3);
        break;
      case "activityDetail":
        setFiles({ ...files, costDetail: file });
        setCurrentStep(4);
        break;
      case "monitoringFrequency":
        //add to update parent state
        break;
      default:
        break;
    }
  };

  const ConditionalFormRendering = () => {
    switch (currentStep) {
      case 1:
        return <CostDetailForm onSubmit={proceedForm} />;
      case 2:
        return <LocationDetailForm onSubmit={proceedForm} />;
      case 3:
        return <ActivityDetailForm onSubmit={proceedForm} />;
      case 4:
        return <MonitoringFrequencyForm onSubmit={proceedForm}/>
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
      <div className="flex flex-wraptext-sm">
        <div className="flex pb-2 lg:basis-1/6 md:basis-2/12 w-full">
          <div className={getClasses(1)}>1. Cost details</div>
        </div>
        <div className="flex pb-2 lg:basis-1/6 md:basis-3/12 w-full">
          <div className={getClasses(2)}>2. Location details</div>
        </div>
        <div className="flex pb-2 lg:basis-1/6 md:basis-3/12 w-full">
          <div className={getClasses(3)}>3. Activity details</div>
        </div>
        <div className="flex pb-2 lg:basis-2/6 md:basis-3/12 w-full">
          <div className={getClasses(4)}>4. Monitoring frequency</div>
        </div>
      </div>
      {ConditionalFormRendering()}
    </div>
  );
}
