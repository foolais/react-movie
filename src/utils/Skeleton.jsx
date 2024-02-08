import { twMerge } from "tailwind-merge";

export const dropDownSkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className={twMerge(
            "border-b-tertiary flex items-start justify-start gap-4 border-b-2 py-2",
            "hover:opacity-60",
          )}
        >
          <div className="bg-tertiary flex h-28 w-20 animate-pulse items-center justify-center rounded-md opacity-80"></div>
          <div className="grid pt-2  text-left">
            <div className="bg-tertiary w-60 animate-pulse rounded-md p-2"></div>
            <div className="bg-tertiary mb-2 mt-4 w-24 animate-pulse rounded-md p-2"></div>
            <div className="bg-tertiary w-52 animate-pulse rounded-md p-2"></div>
          </div>
        </div>
      ))}
    </>
  );
};
