import { HiOutlineUser } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { truncateString } from "../utils/utils";

/* eslint-disable react/prop-types */
const DropdownMovie = ({ listMovies }) => {
  return (
    <div
      className={twMerge(
        "absolute left-0 right-0 top-16 border-t-2 border-t-black border-opacity-20 bg-secondary px-2 py-4",
      )}
    >
      {listMovies.map((item) => {
        return (
          <div
            key={item.id}
            className={twMerge(
              "border-b-tertiary flex items-start justify-start gap-4 border-b-2 py-2",
              "hover:opacity-60",
            )}
          >
            <div
              className={twMerge(
                "bg-tertiary flex h-28 min-w-20 items-center justify-center rounded-sm opacity-80",
              )}
            >
              {item.poster ? (
                <img className="h-full w-full" src={item.poster} alt="poster" />
              ) : (
                <HiOutlineUser className="" />
              )}
            </div>
            <div className={twMerge("grid pt-2 text-left")}>
              <span className="text-md font-semibold text-white">
                {truncateString(item.title, 30)}
              </span>
              <span className="text-tertiary pt-4 text-sm font-bold">
                {item.release_year}
              </span>
              <span className="text-tertiary text-sm font-bold">
                {item.genre.join(", ")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DropdownMovie;
