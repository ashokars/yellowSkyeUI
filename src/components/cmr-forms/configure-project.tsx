import { API_CONSTANTS } from "@/constants";
import { useAxios, useLazyAxios } from "@/hooks";
import { data } from "autoprefixer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../spinner";
import { useCmrContext } from "@/context";

interface Iprops {
  onSubmit: () => void;
}

const classNames = {
  validLabel: "text-xs text-[#666666]",
  invalidLabel: "text-xs text-red-700",
  validInput:
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm text-[#444444] rounded-lg focus:outline-none focus:border-[#228DBB] focus:ring-1 focus:ring-[#228DBB] block w-full p-2.5",
  invalidInput:
    "bg-red-50 border border-red-300 text-red-900 text-sm text-red-700 rounded-lg focus:outline-none block w-full p-2.5",
};

export default function ConfigureProjectForm({ onSubmit }: Iprops) {
  //get params and fetch data
  const params = useParams();
  const {setProjectName} = useCmrContext();
  const {
    data: project,
    loading,
    error,
  } = useAxios({
    url: `${API_CONSTANTS.project}/${params.id}`,
    method: "GET",
  });

  const [formValue, setFormValue] = useState({
    projectName: "",
    location: "",
    projectHeadName: "",
    startDate: "",
    endDate: "",
    budget: "",
  });
  const [isEdit, setIsEdit] = useState(true);

  //For updating cmr records
  const [setData, { loading: loading2, error: error2, data: cmr }] =
    useLazyAxios({
      url: `${API_CONSTANTS.cmr}`,
      method: "POST",
    });

  useEffect(() => {
    if (project) {
      //set values to context and initiate local state
      console.log(project);
      setProjectName(project?.projectName );
      const defaultValue = {
        projectName: project?.projectName || "",
        location: project?.location || "",
        projectHeadName: project?.cmr?.projectHeadName || "",
        startDate: project?.cmr?.startDate || "",
        endDate: project?.cmr?.endDate || "",
        budget: project?.cmr?.budget || "",
      };
      setFormValue(defaultValue);
    }
  }, [project]);

  useEffect(() => {
    if (cmr) {
      onSubmit();
    }
  }, [cmr]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onNext = () => {
    //delete disabled obj
    setIsEdit(false);
    const { projectName, location, ...payload } = formValue;
    let validated = true;
    (Object.keys(payload) as (keyof typeof payload)[]).forEach((key, index) => {
      console.log(key, payload[key], index);
      if (
        payload[key] === "" ||
        payload[key] == null ||
        payload[key] == undefined
      )
        validated = false;
    });
    if (validated) setData({ projectId: params.id, ...payload });
  };

  const checkDateValidation = () => {
    return new Date(formValue.endDate) > new Date(formValue.startDate);
  };

  if (error) {
    //show error window
  }

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
      <div className="lg:w-2/3 w-full">
        {loading ? (
          <Spinner size="large" position="center"/>
        ) : (
          <form>
            <div className="py-6">
              <h2 className="text-base text-xl font-semibold leading-7 text-gray-900 pb-2">
                Configure Project
              </h2>
              <div className="mb-2">
                <label htmlFor="projectName" className="text-xs text-[#666666]">
                  Project name
                </label>
                <input
                  id="projectName"
                  disabled
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-[#444444] rounded-lg focus:outline-none focus:border-[#228DBB] focus:ring-1 focus:ring-[#228DBB] block w-full p-2.5"
                  value={formValue.projectName}
                ></input>
              </div>
              {/* <div className="mb-2">
              <label htmlFor="clientName" className="text-xs text-[#666666]">
                Client name
              </label>
              <input
                id="clientName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-[#444444] rounded-lg focus:outline-none focus:border-[#228DBB] focus:ring-1 focus:ring-[#228DBB] block w-full p-2.5"
                placeholder="Tata Realty"
              ></input>
            </div> */}
              <div className="mb-2">
                <label htmlFor="location" className="text-xs text-[#666666]">
                  Location
                </label>
                <input
                  id="location"
                  disabled
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-[#444444] rounded-lg focus:outline-none focus:border-[#228DBB] focus:ring-1 focus:ring-[#228DBB] block w-full p-2.5"
                  value={formValue.location}
                ></input>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="projectHeadName"
                  className={
                    formValue.projectHeadName || isEdit
                      ? classNames.validLabel
                      : classNames.invalidLabel
                  }
                >
                  Project head name
                </label>
                <input
                  id="projectHeadName"
                  name="projectHeadName"
                  required
                  onChange={(e) => handleChange(e)}
                  className={
                    formValue.projectHeadName || isEdit
                      ? classNames.validInput
                      : classNames.invalidInput
                  }
                  value={formValue.projectHeadName}
                ></input>
              </div>
              <div className="w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-2">
                    <label
                      htmlFor="startDate"
                      className={
                        formValue.startDate || isEdit
                          ? classNames.validLabel
                          : classNames.invalidLabel
                      }
                    >
                      Start date
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      required
                      onChange={(e) => handleChange(e)}
                      name="startDate"
                      value={formValue.startDate}
                      className={
                        (formValue.startDate && checkDateValidation()) || isEdit
                          ? classNames.validInput
                          : classNames.invalidInput
                      }
                    ></input>
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="endDate"
                      className={
                        formValue.endDate || isEdit
                          ? classNames.validLabel
                          : classNames.invalidLabel
                      }
                    >
                      End Date
                    </label>
                    <input
                      id="endDate"
                      onChange={(e) => handleChange(e)}
                      type="date"
                      required
                      min={formValue.startDate}
                      name="endDate"
                      className={
                        (formValue.endDate && checkDateValidation()) || isEdit
                          ? classNames.validInput
                          : classNames.invalidInput
                      }
                      value={formValue.endDate}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="budget"
                  className={
                    formValue.budget || isEdit
                      ? classNames.validLabel
                      : classNames.invalidLabel
                  }
                >
                  Budget
                </label>
                <input
                  id="budget"
                  step="0.25"
                  name="budget"
                  type="number"
                  onChange={(e) => handleChange(e)}
                  value={formValue.budget}
                  className={
                    formValue.budget || isEdit
                      ? classNames.validInput
                      : classNames.invalidInput
                  }
                ></input>
              </div>
            </div>
            {!loading2 ? (
              <>
                <button
                  type="button"
                  onClick={() => onNext()}
                  className="float-right text-white bg-[#228DBB] focus:outline-none hover:bg-[#1f6d8f] font-medium rounded-lg text-sm lg:w-24 sm:w-auto px-3 py-2 text-center"
                >
                  Next
                </button>
              </>
            ) : (
              <div className="float-right">
                <Spinner size="small" position="inline" />
              </div>
            )}
          </form>
        )}
      </div>
      <div className="flex items-center">
        <img
          className="rounded-lg w-full h-2/3 object-contain"
          src="/assets/images/man_drone.svg"
          alt="drone monitoring"
        ></img>
      </div>
    </div>
  );
}
