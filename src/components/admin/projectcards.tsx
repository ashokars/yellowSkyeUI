"use client";
import { ProjectProps } from "@/types";
import Link from "next/link";

interface ProjectCardProps {
  project: ProjectProps;
}

export default function ProjectCards({ project }: ProjectCardProps) {
  return (
    <Link  href={`/projects/cmr/${project.id}`}>
    <div className="max-w-md rounded overflow-hidden shadow-lg h-48 cursor-pointer">
      <div className="flex h-4/5">
        <div className="pl-4 py-2 w-6/12">
          <div className="font-semibold text-black text-md">
            {project.projectName}
          </div>
          <div className="text-[#545454] text-sm mb-2">{project.location}</div>
          <div className="grid grid-cols-2">
            <div className="text-[#545454] text-xs">
              <p>Images</p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <p className="text-sm px-2 font-semibold">{120}</p>
              </div>
            </div>
            <div className="text-[#545454] text-xs">
              <p>Panaromas</p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>

                <p className="text-sm px-2 font-semibold">{20}</p>
              </div>
            </div>
            <div className="text-[#545454] text-xs">
              <p className="pt-2">Virtual Tours</p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                  />
                </svg>

                <p className="text-sm px-2 font-semibold">{23}</p>
              </div>
            </div>
            <div className="text-[#545454] text-xs">
              <p className="pt-2">Videos</p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>

                <p className="text-sm px-2 font-semibold">{130}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pr-4 pt-4 pb-2 w-5/12">
          <img
            className="rounded-lg w-full h-full object-cover"
            src="/assets/images/construction_1.jpeg"
            alt="image description"
          ></img>
        </div>
      </div>
      <footer className="static bottom-0 h-1/5 flex items-center bg-[#D5E0E9]">
        <p className="text-xs text-black font-semibold px-8">Orders: {210}</p>
        <p className="text-xs md:pl-12 sm:pl-6 text-[#545454]">
          Last Order Date: {22}
        </p>
      </footer>
    </div>
    </Link>
  );
}
