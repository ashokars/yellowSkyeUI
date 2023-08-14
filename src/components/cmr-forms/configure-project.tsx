interface Iprops {
  onSubmit: () => void;
}
export default function ConfigureProjectForm({ onSubmit }: Iprops) {
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
      <div className="lg:w-2/3 w-full">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-[#444444] rounded-lg focus:outline-none focus:border-[#228DBB] focus:ring-1 focus:ring-[#228DBB] block w-full p-2.5"
                placeholder="Intellion Park"
              ></input>
            </div>
            <div className="mb-2">
              <label htmlFor="clientName" className="text-xs text-[#666666]">
                Client name
              </label>
              <input
                id="clientName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-[#444444] rounded-lg focus:outline-none focus:border-[#228DBB] focus:ring-1 focus:ring-[#228DBB] block w-full p-2.5"
                placeholder="Tata Realty"
              ></input>
            </div>
            <div className="mb-2">
              <label htmlFor="location" className="text-xs text-[#666666]">
                Location
              </label>
              <input
                id="location"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-[#444444] rounded-lg focus:outline-none focus:border-[#228DBB] focus:ring-1 focus:ring-[#228DBB] block w-full p-2.5"
                placeholder="Gurugram"
              ></input>
            </div>
            <div className="mb-2">
              <label htmlFor="projectHead" className="text-xs text-[#666666]">
                Project head name
              </label>
              <input
                id="projectHead"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-[#444444] rounded-lg focus:outline-none focus:border-[#228DBB] focus:ring-1 focus:ring-[#228DBB] block w-full p-2.5"
                placeholder="Abhinav Srivastava"
              ></input>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-2">
                  <label htmlFor="startDate" className="text-xs text-[#666666]">
                    Start date
                  </label>
                  <input
                    id="startDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-[#444444] rounded-lg focus:outline-none focus:border-[#228DBB] focus:ring-1 focus:ring-[#228DBB] w-full block p-2.5"
                    placeholder="20-04-2022"
                  ></input>
                </div>
                <div className="mb-2">
                  <label htmlFor="endDate" className="text-xs text-[#666666]">
                    End Date
                  </label>
                  <input
                    id="projectHead"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-[#444444] rounded-lg focus:outline-none focus:border-[#228DBB] focus:ring-1 focus:ring-[#228DBB] w-full block p-2.5"
                    placeholder="20-04-2026"
                  ></input>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="budget" className="text-xs text-[#666666]">
                Budget
              </label>
              <input
                id="budget"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-[#444444] rounded-lg focus:outline-none focus:border-[#228DBB] focus:ring-1 focus:ring-[#228DBB] block w-full p-2.5"
                placeholder="40,00,00,000.00"
              ></input>
            </div>
          </div>
          <button
            onClick={() => onSubmit()}
            className="float-right text-white bg-[#228DBB] focus:outline-none hover:bg-[#1f6d8f] font-medium rounded-lg text-sm lg:w-24 sm:w-auto px-3 py-2 text-center"
          >
            Next
          </button>
        </form>
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
