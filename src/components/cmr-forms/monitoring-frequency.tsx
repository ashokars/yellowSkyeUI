import { API_CONSTANTS, MonitoringFrequency } from "@/constants";
import { useCmrContext } from "@/context";
import { useAxios, useLazyAxios } from "@/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../spinner";

interface Iprops {
  onSubmit: (step: string, file: any) => void;
}

export default function MonitoringFrequencyForm({ onSubmit }: Iprops) {
  const params = useParams();
  const { cmrId } = useCmrContext();
  const [monitoringFrequency, setMonitoringFrequency] =
    useState<MonitoringFrequency>(3);
  const {
    data: cmr,
    loading,
    error,
  } = useAxios({
    url: `${API_CONSTANTS.cmr}/project/${params.id}`,
    method: "GET",
  });

  //For updating cmr records
  const [setData, { loading: loading2, error: error2, data: cmrUpdatedRec }] =
    useLazyAxios({
      url: `${API_CONSTANTS.cmr}/${cmrId}`,
      method: "PATCH",
    });

  const setSelection = (sel: MonitoringFrequency) =>
    setMonitoringFrequency(sel);

  useEffect(() => {
    if (cmr && cmr.monitoringFrequency)
      setMonitoringFrequency(cmr.monitoringFrequency);
  }, [cmr]);

  useEffect(() => {
    if (cmrUpdatedRec) onSubmit("monitoringFrequency", null);
  }, [cmrUpdatedRec]);

  if (loading || loading2) return <Spinner size="large" position="center" />;

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
                checked={monitoringFrequency == MonitoringFrequency.Daily}
                onChange={() => setSelection(MonitoringFrequency.Daily)}
                value={MonitoringFrequency.Daily}
                name="frequency"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              ></input>
              <label htmlFor="default-radio-1" className="ml-2 text-sm">
                Daily
              </label>
            </div>
            <div className="mb-6 flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                checked={monitoringFrequency == MonitoringFrequency.Weekly}
                onChange={() => setSelection(MonitoringFrequency.Weekly)}
                value={MonitoringFrequency.Weekly}
                name="frequency"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              ></input>
              <label htmlFor="default-radio-2" className="ml-2 text-sm">
                Weekly
              </label>
            </div>
            <div className="mb-6 flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                checked={monitoringFrequency == MonitoringFrequency.Fortnightly}
                onChange={() => setSelection(MonitoringFrequency.Fortnightly)}
                value={MonitoringFrequency.Fortnightly}
                name="frequency"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              ></input>
              <label htmlFor="default-radio-2" className="ml-2 text-sm">
                Fortnightly
              </label>
            </div>
            <div className="mb-6 flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                checked={monitoringFrequency == MonitoringFrequency.Monthly}
                onChange={() => setSelection(MonitoringFrequency.Monthly)}
                value={MonitoringFrequency.Monthly}
                name="frequency"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              ></input>
              <label htmlFor="default-radio-2" className="ml-2 text-sm">
                Monthly
              </label>
            </div>
            <div className="mb-6 flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                checked={monitoringFrequency == MonitoringFrequency.Quarterly}
                onChange={() => setSelection(MonitoringFrequency.Quarterly)}
                value={MonitoringFrequency.Quarterly}
                name="frequency"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              ></input>
              <label htmlFor="default-radio-2" className="ml-2 text-sm">
                Quarterly
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setData({ monitoringFrequency })}
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
