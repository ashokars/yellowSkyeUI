import { Key } from "react";

interface Iprops {
  fieldMap: any;
  locationMap: any[];
  activityMap: any[];
  removeMapping: (locId: any, actId: any) => void;
}

export default function FieldMappingPreview({
  fieldMap,
  locationMap,
  activityMap,
  removeMapping,
}: Iprops) {
  console.log(locationMap);
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <tbody>
          {fieldMap &&
            Object.keys(fieldMap).map((activity, i) => {
              return (
                <tr key={i} className="bg-white">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    {activityMap.find((a) => a.id == activity)["label"]}
                  </th>
                  <td className="flex flex-wrap px-6 py-4">
                    {fieldMap[activity as keyof typeof fieldMap].map(
                      (loc: any, j: number) => {
                        return (
                          <div className="pt-2" key={`${i}_${j}`}>
                            <span
                              id="badge-dismiss-dark"
                              className="px-2 py-1 mr-2 text-xs text-gray-800 bg-gray-100 rounded"
                            >
                              {locationMap[loc]}
                              <button
                                onClick={() => removeMapping(loc, activity)}
                                type="button"
                                className="inline-flex items-center p-1 ml-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900"
                                data-dismiss-target="#badge-dismiss-dark"
                                aria-label="Remove"
                              >
                                <svg
                                  className="w-2 h-2"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                  />
                                </svg>
                                <span className="sr-only">Remove badge</span>
                              </button>
                            </span>
                          </div>
                        );
                      }
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
