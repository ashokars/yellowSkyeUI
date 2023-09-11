import React from "react";
import Spinner from "../spinner";

interface Iprops {
  loading: boolean;
  readOnly: boolean;
  onSubmit: () => void;
  onNext: () => void;
  onCancel: () => void;
  planDetails: any[];
}

export default function QuantityPreview({
  loading,
  readOnly,
  onSubmit,
  onCancel,
  onNext,
  planDetails,
}: Iprops) {
  let keys = [...Object.keys(planDetails[0])];
  let [id, ...planHeaders] = keys;
  let [location, stage, group, activity, units, ...planDates] = planHeaders;
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="table-fixed text-sm text-left text-gray-500">
          <thead className="text-xs text-[#228DBB] md:h-12 uppercase bg-[#E0EDF2]">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 sticky left-0 whitespace-nowrap bg-[#E0EDF2]"
              >
                Location
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap left-96">
                Stage
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Group
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Activity
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Units
              </th>
              {planDates.map((h) => (
                <th key={h} scope="col" className="px-6 py-3 whitespace-nowrap">
                  {h.split("~")[1]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <Spinner size="large" position="center" />
                </td>
              </tr>
            ) : (
              planDetails &&
              planDetails.map((p: any, i) => (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"
                  } border-b`}
                >
                  <th
                    scope="row"
                    className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap sticky left-0 ${
                      i % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"
                    }`}
                  >
                    {p.location}
                  </th>
                  <td className="px-6 py-4 whitespace-nowrap">{p.stage}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{p.group}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{p.activity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{p.units}</td>
                  {planDates.map((d) => {
                    return (
                      <td key={d} className="px-6 py-4 whitespace-nowrap">
                        {p[d]}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="my-4">
        {readOnly ? (
          <button
            onClick={() => onNext()}
            className="float-right ml-4 text-white bg-[#228DBB] focus:outline-none hover:bg-[#1f6d8f] font-medium rounded-lg text-sm lg:w-24 sm:w-auto px-4 py-2 text-center"
          >
            Next
          </button>
        ) : (
          <>
            <button
              onClick={() => onSubmit()}
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
          </>
        )}
      </div>
    </div>
  );
}
