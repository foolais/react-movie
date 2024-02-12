import { HiOutlineUser } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { truncateString } from "../utils/utils";
import { dropDownSkeleton as Skeleton } from "../utils/Skeleton";

/* eslint-disable react/prop-types */
const DropdownMovie = ({ listMovies, isLoading, notFoundMessage }) => {
  return (
    <div
      className={twMerge(
        "absolute left-0 right-0 top-16 z-[99] rounded-md border-t-2 border-t-black border-opacity-20 bg-secondary px-2 pb-8 pt-4",
        "md:left-auto md:right-0 md:top-10 md:w-96",
        "lg:w-[45vw]",
      )}
    >
      {listMovies.length === 0 && notFoundMessage.length > 0 && (
        <div className="flex items-center justify-center">
          <span className="text-md text-primary lg:text-lg">
            {notFoundMessage}
          </span>
        </div>
      )}
      {isLoading ? (
        <Skeleton />
      ) : (
        listMovies.slice(0, 8).map((item) => {
          return (
            <div
              key={item.id}
              className={twMerge(
                "flex items-start justify-start gap-4 border-b-2 border-b-tertiary py-2",
                "hover:opacity-60 md:py-3",
              )}
            >
              <div
                className={twMerge(
                  "flex h-28 min-w-20 items-center justify-center rounded-sm bg-tertiary opacity-80",
                  "md:h-32 md:min-w-24",
                )}
              >
                {item.poster ? (
                  <img
                    className="h-full w-full"
                    src={item.poster}
                    alt="poster"
                  />
                ) : (
                  <HiOutlineUser className="" />
                )}
              </div>
              <div className={twMerge("grid pt-2 text-left")}>
                <span
                  className={twMerge(
                    "text-md font-semibold text-white",
                    "md:text-lg",
                  )}
                >
                  {truncateString(item.title, 30)}
                </span>
                <span
                  className={twMerge(
                    "pt-4 text-sm font-bold text-tertiary",
                    "text-md",
                  )}
                >
                  {item.release_year}
                </span>
                <span
                  className={twMerge(
                    "text-sm font-bold text-tertiary",
                    "md:text-md",
                  )}
                >
                  {item.genre.join(", ")}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default DropdownMovie;
