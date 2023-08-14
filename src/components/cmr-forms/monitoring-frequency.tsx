import { useState } from "react";

interface Iprops {
  onSubmit: (step: string, file: any) => void;
}

export default function MonitoringFrequencyForm({ onSubmit }: Iprops) {
  const [file, setFile] = useState<any>();

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
      <div className="lg:w-2/3 w-full">
        <form>
          <div className="mb-2">
            <p className="text-sm pt-4 font-medium text-[#363636]">
              Choose monitoring frequency
            </p>
          </div>
          <div className="mb-2 text-[#444444]">
            <label htmlFor="radio" className="text-sm text-[#363636]">
              Select from below
            </label>
            <div className="flex items-center my-6">
              <input
                id="default-radio-1"
                type="radio"
                value="daily"
                name="frequency"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              ></input>
              <label htmlFor="default-radio-1" className="ml-2 text-sm">
                Daily
              </label>
            </div>
            <div className="mb-6 flex items-center">
              <input
                checked
                id="default-radio-2"
                type="radio"
                value="weekly"
                name="frequency"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              ></input>
              <label htmlFor="default-radio-2" className="ml-2 text-sm">
                Weekly
              </label>
            </div>
            <div className="mb-6 flex items-center">
              <input
                checked
                id="default-radio-2"
                type="radio"
                value="fortnightly"
                name="frequency"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              ></input>
              <label htmlFor="default-radio-2" className="ml-2 text-sm">
                Fortnightly
              </label>
            </div>
            <div className="mb-6 flex items-center">
              <input
                checked
                id="default-radio-2"
                type="radio"
                value="monthly"
                name="frequency"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              ></input>
              <label htmlFor="default-radio-2" className="ml-2 text-sm">
                Monthly
              </label>
            </div>
          </div>
          <button
            onClick={() => onSubmit("locationDetail", file)}
            className="float-right text-white bg-[#228DBB] focus:outline-none hover:bg-[#1f6d8f] font-medium rounded-lg text-sm lg:w-24 sm:w-auto px-4 py-2 text-center"
          >
            Next
          </button>
        </form>
      </div>
      <div className="flex items-center justify-center">
        <img
          className="rounded-lg w-2/3  object-contain"
          src="/assets/images/cost_location.svg"
          alt="drone monitoring"
        ></img>
      </div>
    </div>
  );
}
