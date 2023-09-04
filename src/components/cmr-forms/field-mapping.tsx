import { useEffect, useState } from "react";
import { TreeSelect } from "primereact/treeselect";
import "primereact/resources/themes/lara-light-blue/theme.css"; // theme
import "primereact/resources/primereact.css";
import "../cutsom-css/select.css";
import cloneDeep from "lodash/cloneDeep";
import groupBy from "lodash/groupBy";
import useAxios from "@/hooks/useAxios";
import { API_CONSTANTS } from "@/constants";
import { useParams } from "next/navigation";
import { createChildrenPath, replaceAllObjKeys } from "@/utils";
import FieldMappingPreview from "./field-mapping-preview";

interface Iprops {
  onSubmit: (step: string, file: any) => void;
}

export default function FieldMappingForm({ onSubmit }: Iprops) {
  const params = useParams();
  const [location, setLocations] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [selectedLocationKeys, setSelectedLocationKeys] = useState({});
  const [activity, setActivity] = useState([]);
  const [selectedActivityKeys, setSelectedActivityKeys] = useState({});
  const [locationMap, setLocationMap] = useState([]);
  const [activityMap, setActivityMap] = useState([]);
  const [fieldMap, setFieldMap] = useState({});

  const getNewLocKey = (arg: string) =>
    ({
      name: "label",
      id: "key",
      children: "children",
    }[arg]);

  //For fetching location records
  const {
    loading,
    error,
    data: locationRaw,
  } = useAxios({
    url: `${API_CONSTANTS.location}/${params.id}`,
    method: "GET",
  });

  //For fetching stage records
  const {
    loading: loading2,
    error: error2,
    data: stageRaw,
  } = useAxios({
    url: `${API_CONSTANTS.stage}/project/${params.id}`,
    method: "GET",
  });

  const addCurrentMapping = () => {
    let obj: any = { ...fieldMap };
    let locKeys = Object.keys(selectedLocationKeys);
    let actKeys = Object.keys(selectedActivityKeys);
    actKeys.forEach(
      (k) =>
        obj[k] && obj[k].length ? (obj[k] = locKeys) : (obj[k] = [...locKeys]) //pending
    );
    setFieldMap({ ...obj });
    clearSelections();
  };

  const removeMapping = (locId: any, actId: any) => {
    let obj: any = { ...fieldMap };
    let index = obj[actId].indexOf(`${locId}`);
    if (index > -1) obj[actId].splice(index, 1);
    if (!obj[actId].length) delete obj[actId];
    setFieldMap(obj);
  };

  const submitMapping = () => {
    let constructedPayload = [];
    console.log(fieldMap);
    // Object.keys(o=>)
  };

  const onNext = () => {
    onSubmit("fieldMapping", null);
  };

  const clearSelections = () => {
    setSelectedActivityKeys({});
    setSelectedLocationKeys({});
  };

  useEffect(() => {
    if (locationRaw) {
      //using clone deep to not make changes in api resp
      let payload = cloneDeep(locationRaw["children"]);
      setLocations(replaceAllObjKeys(payload, getNewLocKey));
      //set map for accessing and viewing in preview area
      setLocationMap(createChildrenPath(locationRaw["children"]));
    }
  }, [locationRaw]);

  useEffect(() => {
    if (stageRaw) {
      //using clone deep to not make changes in api resp
      const activities = groupBy(cloneDeep(stageRaw), "stageName");
      let payload: any = [];
      for (const key in activities) {
        let children = activities[key].map((o) => ({
          label: `${o?.groupName} - ${o?.activityName}`,
          key: o?.id,
          id: o?.id,
        }));
        payload.push({ label: key, selectable: false, id: key, children });
      }
      setActivityMap(payload.flatMap((a: any) => a.children));
      setActivity(payload);
    }
  }, [stageRaw]);

  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 pt-6">
        <div>
          <div className="card flex justify-content-center">
            <TreeSelect
              filter={true}
              scrollHeight="200px"
              value={selectedLocationKeys}
              onChange={(e: any) => setSelectedLocationKeys(e.value)}
              options={location}
              metaKeySelection={false}
              className="text-xs md:w-20rem w-full"
              panelClassName="text-xs"
              panelStyle={{ padding: 0 }}
              selectionMode="multiple"
              placeholder="Select Locations"
            ></TreeSelect>
          </div>
        </div>
        <div>
          <div className="card flex justify-content-center">
            <TreeSelect
              filter={true}
              scrollHeight="200px"
              value={selectedActivityKeys}
              onChange={(e: any) => setSelectedActivityKeys(e.value)}
              options={activity}
              metaKeySelection={false}
              className="text-xs md:w-20rem w-full"
              panelClassName="text-xs"
              panelStyle={{ padding: 0 }}
              selectionMode="multiple"
              placeholder="Select Activity"
            ></TreeSelect>
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={() => addCurrentMapping()}
            className="text-white bg-[#228DBB] hover:bg-[#1f6d8f] transition duration-150 ease-in-out focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
          >
            <svg
              className="w-5 h-5 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="sr-only">Add</span>
          </button>
          <button
            type="button"
            onClick={() => clearSelections()}
            className="text-white bg-gray-400 hover:bg-gray-600 transition duration-150 ease-in-out focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
          >
            <svg
              className="w-5 h-5 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="sr-only">Clear</span>
          </button>
        </div>
      </div>
      <div className="pt-4">
        <FieldMappingPreview
          {...{
            fieldMap,
            activityMap,
            locationMap,
            removeMapping,
          }}
        />
      </div>
      {Object.keys(fieldMap).length ? (
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
                onClick={() => submitMapping()}
                className="float-right ml-4 text-white bg-[#228DBB] focus:outline-none hover:bg-[#1f6d8f] font-medium rounded-lg text-sm lg:w-24 sm:w-auto px-4 py-2 text-center"
              >
                Submit
              </button>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
