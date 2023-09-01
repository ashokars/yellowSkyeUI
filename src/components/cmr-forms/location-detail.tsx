import { useEffect, useState } from "react";
import LocationPreview from "./location-preview";
import { csvToJson } from "@/utils";
import { useParams } from "next/navigation";
import { useCmrContext } from "@/context";
import { API_CONSTANTS } from "@/constants";
import useLazyAxios from "@/hooks/useLazyAxios";
import { useAxios } from "@/hooks";
import Spinner from "../spinner";

interface Iprops {
  onSubmit: (step: string) => void;
}

export default function LocationDetailForm({ onSubmit }: Iprops) {
  const params = useParams();
  const { projectName } = useCmrContext();
  const [file, setFile] = useState<any>();
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [fileContent, setFileContent] = useState<{}[]>([]);
  const [isPreview, setPreview] = useState<boolean>(false);

  //For fetching location records
  const {
    loading,
    error,
    data: location,
  } = useAxios({
    url: `${API_CONSTANTS.location}/${params.id}`,
    method: "GET",
  });

  //For inserting location records
  const [
    uploadLocations,
    { loading: loading2, error: error2, data: location2 },
  ] = useLazyAxios({
    url: `${API_CONSTANTS.location}/${params.id}`,
    method: "POST",
  });

  useEffect(() => {
    let lk = [
      "location1",
      "location2",
      "location3",
      "location4",
      "location5",
      "location6",
    ];
    if (location) {
      setPreview(true);
      setReadOnly(true);
      let loc: any[] = location.children;
      let data = lk.reduce((t: any[], k) => {
        const loc = t;
        return loc.reduce((r, l) => {
          if (l.children.length) {
            r.push(
              ...l.children.map((i: any) => ({ [k]: l.name, ...l, ...i }))
            );
          } else {
            const { name, ...rest } = l;
            name ? r.push({ ...rest, [k]: name }) : r.push(rest);
          }
          return r;
        }, []);
      }, loc);
      setFileContent(data);
    }
  }, [location]);

  useEffect(() => {
    if (location2) onSubmit("locationDetail");
  }, [location2]);

  //on file upload get the file content as text
  const handleChange = async (event: any) => {
    event.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const text = e.target.result;
      setFileContent(csvToJson(text));
    };
    const i = event.target.files[0];
    reader.readAsText(i);
    setFile(i);
  };

  //process the finalized preview data
  const processLocationData = () => {
    const processedData = fileContent.map((locationObject) => {
      let payload = {
        location0: projectName,
      };
      let map = (
        Object.keys(locationObject) as (keyof typeof locationObject)[]
      ).forEach((key, index) => {
        // 👇️ pass to payload if location has data in it
        if (locationObject[key]) {
          payload[key] = locationObject[key];
        }
        return;
      });
      return payload;
    });
    uploadLocations({ data: processedData });
    //TODO: add validations for processed data
  };

  if (loading) {
    return <Spinner size="small" position="center" />;
  }

  return (
    <div>
      {isPreview ? (
        <LocationPreview
          loading={loading2}
          readOnly={readOnly}
          locationDetails={fileContent}
          onNext={() => onSubmit("locationDetail")}
          onCancel={() => setPreview(false)}
          onSubmit={() => processLocationData()}
        />
      ) : (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
          <div className="lg:w-2/3 w-full">
            {loading ? (
              <Spinner size="small" position="center" />
            ) : (
              <form>
                <div className="mb-2">
                  <p className="text-sm pt-4 text-[#363636]">
                    Download this location template and reupload it after
                    filling the details
                  </p>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="download"
                    className="text-sm font-medium pb-4 text-[#363636]"
                  >
                    Location template
                  </label>
                  <a
                    href="/assets/templates/location_template.csv"
                    download="location_template.csv"
                  >
                    <button
                      type="button"
                      className="w-full justify-center text-white bg-[#228DBB] hover:bg-[#1f6d8f] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                    >
                      Download location template
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 ml-2 -mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </button>
                  </a>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="download"
                    className="text-sm font-medium pb-4 text-[#363636]"
                  >
                    Upload location detail file
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-32 border border-[#6F98BA] border-dashed rounded-lg cursor-pointer bg-[#ECF3F7]/50 hover:bg-[#ECF3F7]"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="w-full justify-center text-[#228DBB] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                          Choose file
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 ml-2 -mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                            />
                          </svg>
                        </p>
                      </div>
                      <input
                        accept=".csv"
                        onChange={handleChange}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                  {file ? (
                    <div className="flex items-center">
                      <div className="text-[#666666] text-sm px-2 py-4">
                        {file.name}
                      </div>
                      <div
                        className="text-[#666666]"
                        onClick={() => setFile(null)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.75}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <button
                  disabled={!file}
                  onClick={() => setPreview(true)}
                  className={`float-right text-white ${
                    file ? "bg-[#228DBB] hover:bg-[#1f6d8f]" : "bg-[#228DBB]/70"
                  } focus:outline-none font-medium rounded-lg text-sm lg:w-24 sm:w-auto px-4 py-2 text-center`}
                >
                  Preview
                </button>
              </form>
            )}
          </div>
          <div className="flex items-center justify-center">
            <img
              className="rounded-lg w-2/3  object-contain"
              src="/assets/images/cost_location.svg"
              alt="drone monitoring"
            ></img>
          </div>
        </div>
      )}
    </div>
  );
}
