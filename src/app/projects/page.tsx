import ProjectCards from "@/components/admin/projectcards";
import { mockProjectData } from "./mocks";
import Link from "next/link";

export default function Projects() {
  return (
    <div className="flex h-screen flex-col items-center bg-white justify-between p-4">
      <div className="w-11/12 font-primary text-md mx-4">
        <div className="flex">
          <div className="mb-6 w-full max-w-2xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="gray"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-icon"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#228DBB] focus:ring-1 focus:ring-[#228DBB] w-full pl-10 p-2.5"
                placeholder="Search for projects"
              ></input>
            </div>
          </div>
          <div className="mx-2">
            <Link
              href={"/projects/cmr"}
              type="button"
              className="text-white bg-[#228DBB] hover:bg-[#1f6d8f] focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>

              <span className="sr-only">Icon description</span>
            </Link>
          </div>
        </div>
        <div className="mb-6 w-full max-w-2xl">
          <h2 className="text-xl font-bold text-[#222222]">
            Showing all projects
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 md:gap-2">
          {mockProjectData.map((project, i) => (
            <ProjectCards key={i} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
