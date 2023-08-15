import { useState } from "react";

interface Iprops {
  onSubmit: (step: string, file: any) => void;
}

export default function FieldMappingForm({ onSubmit }: Iprops) {
  const [file, setFile] = useState<any>();

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
      <div className="lg:w-2/3 w-full">
        <form>
          <div className="mb-2 text-[#444444]">
            <div className="flex items-center my-8">
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-[#444444] text-sm rounded-lg block w-full p-2.5"
              >
                <option selected value="">
                  Location 0
                </option>
                <option value="US">Location 1</option>
                <option value="CA">Location 2</option>
                <option value="FR">Location 3</option>
                <option value="DE">Location 4</option>
              </select>
            </div>

            <div className="flex items-center mb-6">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-[#228DBB] accent-[#228DBB] rounded"
              ></input>
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-normal text-[#444444]"
              >
                Excavation
              </label>
            </div>

            <div className="flex items-center mb-6">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-[#228DBB] accent-[#228DBB] bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              ></input>
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-normal text-[#444444]"
              >
                Footer
              </label>
            </div>

            <div className="flex items-center mb-6">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-[#228DBB] accent-[#228DBB] bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              ></input>
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-normal text-[#444444]"
              >
                Painting
              </label>
            </div>

            <div className="flex items-center mb-6">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-[#228DBB] accent-[#228DBB] bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              ></input>
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-normal text-[#444444]"
              >
                Column
              </label>
            </div>

            <div className="flex items-center mb-6">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-[#228DBB] accent-[#228DBB] bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              ></input>
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-normal text-[#444444]"
              >
                Slab concrete
              </label>
            </div>
          </div>
          <button
            onClick={() => onSubmit("fieldMapping", file)}
            className="float-right text-white bg-[#228DBB]/80 focus:outline-none hover:bg-[#1f6d8f]/80 font-medium rounded-lg text-sm lg:w-24 sm:w-auto px-4 py-2 text-center"
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
