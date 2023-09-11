import { API_CONSTANTS } from "@/constants";
import { useAxios, useLazyAxios } from "@/hooks";
import {
  replaceAllObjKeys,
  createChildrenPath,
  getInBtwDateFrequency,
  csvToJson,
} from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import QuantityPreview from "./quantities-preview";
import Spinner from "../spinner";

interface Iprops {
  onSubmit: (step: string, file: any) => void;
}

export default function QuantitiesDetailForm({ onSubmit }: Iprops) {
  const [file, setFile] = useState<any>();
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const [fileContent, setFileContent] = useState<{}[]>([]);
  const [isPreview, setPreview] = useState<boolean>(false);
  const [csvPayload, setCsvPaylod] = useState<any>([]);
  const [monDates, setMonDates] = useState<any[]>([]);
  const [fieldMap, setFieldMap] = useState<any>({});
  const params = useParams();

  //For fetching mapped records
  const {
    loading,
    error,
    data: fieldMapRaw,
  } = useAxios({
    url: `${API_CONSTANTS.location}/fieldmap/${params.id}`,
    method: "GET",
  });

  //For fetching location records
  const {
    loading: loading2,
    error: error2,
    data: locationRaw,
  } = useAxios({
    url: `${API_CONSTANTS.location}/${params.id}`,
    method: "GET",
  });

  //For fetching stage records
  const {
    loading: loading3,
    error: error3,
    data: stageRaw,
  } = useAxios({
    url: `${API_CONSTANTS.stage}/project/${params.id}`,
    method: "GET",
  });

  //For fetching cmr information
  const {
    data: cmrInfo,
    loading: loading4,
    error: error4,
  } = useAxios({
    url: `${API_CONSTANTS.project}/${params.id}`,
    method: "GET",
  });

  //For inserting planned data
  const [uploadPlan, { loading: loading5, error: error5, data: postPlanRaw }] =
    useLazyAxios({
      url: `${API_CONSTANTS.progress}`,
      method: "POST",
    });

  useEffect(() => {
    if (fieldMapRaw && locationRaw && stageRaw && cmrInfo) {
      setIsProcessing(true);
      let planPayload: any[] = [];
      let locations = createChildrenPath(locationRaw["children"]);
      let fm: any = {};
      fieldMapRaw.forEach(
        (la: {
          mapId: string;
          locationId: number;
          activityId: number;
          units: string;
        }) => {
          let activity = stageRaw.find((s: any) => s.id == la.activityId);
          let location = locations[la.locationId] || "";
          fm[la.mapId] = {
            fieldMapLocationId: la.locationId,
            fieldMapActivityId: la.activityId,
          };
          planPayload.push({
            id: la.mapId,
            units: activity.units,
            stage: activity.stageName,
            group: activity.groupName,
            activity: activity.activityName,
            location,
          });
        }
      );
      setFieldMap(fm);
      let cmr = cmrInfo.cmr;
      let planDates: any[] = getInBtwDateFrequency(
        cmr.monitoringFrequency,
        cmr.startDate,
        cmr.endDate
      );
      setMonDates(planDates);
      if (fieldMapRaw[0]?.progress?.length)
        planPayload.map((p) => {
          let progress: any[] =
            fieldMapRaw.find((f: any) => f.mapId === p["id"])?.progress || [];
          planDates.map((d) => {
            let m = progress.find((pr) => pr["date"] == d);
            p[`~${d}`] = +m["planned"];
          });
        });
      else planPayload.map((p) => planDates.map((d) => (p[`~${d}`] = 0)));
      // Contains the column headers and table data in the required format for CSV
      planDates = planDates.map((d) => `~${d}`);
      const csvData = [
        ["ID", "Location", "Stage", "Group", "Activity", "Units", ...planDates],
        ...planPayload.map((p: any) => [
          p.id,
          p.location,
          p.stage,
          p.group,
          p.activity,
          p.units,
          ...planDates.map((d) => p[d]),
        ]),
      ];
      let finalPayload = csvData.map((d) => d.join(","));
      setCsvPaylod(finalPayload.join("\n"));
      if (fieldMapRaw[0]?.progress?.length) {
        setPreview(true);
        setReadOnly(true);
        setFileContent(
          csvToJson(finalPayload.join("\n"), [
            "id",
            "location",
            "stage",
            "group",
            "activity",
            "units",
          ])
        );
      }
      setIsProcessing(false);
    }
  }, [fieldMapRaw, stageRaw, locationRaw, cmrInfo]);

  useEffect(() => {
    if (postPlanRaw) onSubmit("quantitiesDetail", file);
  }, [postPlanRaw]);

  //on file upload get the file content as text
  const handleChange = async (event: any) => {
    event.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const text = e.target.result;
      setFileContent(
        csvToJson(text, [
          "id",
          "location",
          "stage",
          "group",
          "activity",
          "units",
        ])
      );
    };
    const i = event.target.files[0];
    reader.readAsText(i);
    setFile(i);
  };

  const postPlannedData = () => {
    let payload: any = [];
    fileContent.forEach((c: any) => {
      monDates.forEach((d) => {
        let obj = {
          date: d,
          planned: parseInt(c[`~${d}`]),
          actual: 0,
          fieldMap: {
            locationId: fieldMap[c["id"]]?.fieldMapLocationId,
            activityId: fieldMap[c["id"]]?.fieldMapActivityId,
          },
        };
        payload.push(obj);
      });
    });
    uploadPlan(payload);
  };

  if (loading || loading2 || loading3 || loading4 || loading5 || isProcessing) {
    return <Spinner size="small" position="center" />;
  }

  return (
    <>
      {isPreview ? (
        <QuantityPreview
          loading={loading2}
          readOnly={readOnly}
          planDetails={fileContent}
          onNext={() => onSubmit("quantitiesDetail", null)}
          onCancel={() => setPreview(false)}
          onSubmit={() => postPlannedData()}
        />
      ) : (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
          <div className="lg:w-2/3 w-full">
            <form>
              <div className="mb-2">
                <p className="text-sm pt-4 text-[#363636]">
                  Download this project plan template and reupload it after
                  filling the details
                </p>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="download"
                  className="text-sm font-medium pb-4 text-[#363636]"
                >
                  Project plan template
                </label>
                <CSVLink
                  data={csvPayload}
                  filename={`${cmrInfo?.projectName}_ProjectPlan.csv`}
                  type="button"
                  className="w-full justify-center text-white bg-[#228DBB] hover:bg-[#1f6d8f] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                >
                  Download project plan template
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
                </CSVLink>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="download"
                  className="text-sm font-medium pb-4 text-[#363636]"
                >
                  Upload project plan file
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
    </>
  );
}
