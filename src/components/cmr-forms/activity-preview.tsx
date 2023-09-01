import Spinner from "../spinner";

interface Iprops {
  loading: boolean;
  readOnly: boolean;
  onSubmit: () => void;
  onNext: () => void;
  onCancel: () => void;
  activityDetails: {}[];
}

export default function ActivityPreview({
  loading,
  readOnly,
  onSubmit,
  onCancel,
  onNext,
  activityDetails,
}: Iprops) {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-[#228DBB] md:h-12 uppercase bg-[#E0EDF2]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Stage
              </th>
              <th scope="col" className="px-6 py-3">
                Group
              </th>
              <th scope="col" className="px-6 py-3">
                Activity
              </th>
              <th scope="col" className="px-6 py-3">
                Units
              </th>
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
              activityDetails &&
              activityDetails.map((act: any, i) => (
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
                    {act.stageName}
                  </th>
                  <td className="px-6 py-4">{act.groupName}</td>
                  <td className="px-6 py-4">{act.activityName}</td>
                  <td className="px-6 py-4">{act.units}</td>
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
