import { Dispatch, SetStateAction } from "react";

interface Iprops {
  onSubmit: (step: string) => void;
  onCancel: () => void;
  locationDetails: {}[];
}

export default function LocationPreview({
  onSubmit,
  onCancel,
  locationDetails,
}: Iprops) {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-[#228DBB] md:h-12 uppercase bg-[#E0EDF2]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Location 1
              </th>
              <th scope="col" className="px-6 py-3">
                Location 2
              </th>
              <th scope="col" className="px-6 py-3">
                Location 3
              </th>
              <th scope="col" className="px-6 py-3">
                Location 4
              </th>
              <th scope="col" className="px-6 py-3">
                Location 5
              </th>
              <th scope="col" className="px-6 py-3">
                Location 6
              </th>
            </tr>
          </thead>
          <tbody>
            {locationDetails.map((loc: any, i) => (
              <tr
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"
                } border-b`}
              >
                <th
                  scope="row"
                  className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap`}
                >
                  {loc.location1}
                </th>
                <td className="px-6 py-4">{loc.location2}</td>
                <td className="px-6 py-4">{loc.location3}</td>
                <td className="px-6 py-4">{loc.location4}</td>
                <td className="px-6 py-4">{loc.location5}</td>
                <td className="px-6 py-4">{loc.location6}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-4">
        <button
          onClick={() => onSubmit("locationDetail")}
          className="float-right ml-4 text-white bg-[#228DBB] focus:outline-none hover:bg-[#1f6d8f] font-medium rounded-lg text-sm lg:w-24 sm:w-auto px-4 py-2 text-center"
        >
          Submit
        </button>
        <button
          onClick={() => onCancel()}
          className="float-right ml-4 text-white bg-[#228DBB] focus:outline-none hover:bg-[#1f6d8f] font-medium rounded-lg text-sm lg:w-24 sm:w-auto px-4 py-2 text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
