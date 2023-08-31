"use client";

export default function Spinner({ size, position }: { size: "small" | "large", position: "inline" | "center" }) {
  const dynamicClass = size === "small" ? "w-6 h-6" : "w-8 h-8";
  const layoutClass = position === "inline" ? '':'min-h-[20rem]';
  return (
    <div className="flex flex-col rounded-xl">
      <div className={`${layoutClass} flex flex-auto flex-col justify-center items-center p-4 md:p-5`}>
        <div className="flex justify-center">
          <div
            className={`animate-spin inline-block ${dynamicClass} border-[3px] border-current border-t-transparent text-[#228DBB] rounded-full`}
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
