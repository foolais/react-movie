import { HiMenu, HiOutlineSearch, HiOutlineUser, HiX } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "react-responsive";
import { useState, useRef } from "react";
import { useEffect } from "react";
import SideNav from "./SideNav";

const Navbar = () => {
  const [isOpenSideNav, setIsOpenSideNav] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchData, setSearchData] = useState("");

  const inputRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (isSearching && inputRef.current) inputRef.current.focus();
  }, [isSearching]);

  return (
    <div className="bg-secondary flex h-16 w-screen items-center justify-between p-5">
      <div className="flex items-center gap-4">
        <div
          onClick={() => setIsOpenSideNav((prev) => !prev)}
          className={twMerge(
            "text-white cursor-pointer text-3xl",
            "md:hidden ",
          )}
        >
          <HiMenu className="hover:text-primary" />
        </div>
        <div className="w-max cursor-pointer rounded-md bg-primary p-1 text-2xl font-extrabold hover:opacity-80">
          IMDb
        </div>
        {!isMobile && (
          <div
            className={twMerge(
              "text-white ml-2 flex items-center justify-center gap-3 text-xl font-semibold",
              "lg:gap-4 lg:tracking-wider",
            )}
          >
            <span className="hover:text-primary">Popular</span>
            <span className="hover:text-primary">Top Rated</span>
            <span className="hover:text-primary">Upcoming</span>
          </div>
        )}
      </div>
      {/* searching bar for mobile */}
      {isMobile && isSearching && (
        <div className="absolute left-0 right-0 top-0 min-h-16 transition duration-300 ease-in-out">
          <input
            type="text"
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search Movie Here...."
            className={twMerge(
              "bg-secondary text-white h-16 w-full p-3 ",
              "placeholder:text-textPrimary pr-10 placeholder:font-bold focus:outline-none",
            )}
            ref={inputRef}
          />
          <div
            className="text-white absolute right-5 top-5 rounded-full text-2xl font-semibold"
            onClick={() => {
              setIsSearching((prev) => !prev), setSearchData("");
            }}
          >
            <HiX className="hover:text-primary" />
          </div>
        </div>
      )}
      {/* END searching bar for mobile */}
      <div
        className={twMerge("flex items-center gap-4", "md:w-[40%] lg:w-1/2")}
      >
        {isMobile ? (
          // open from mobile size
          <div
            className="text-white cursor-pointer text-xl"
            onClick={() => setIsSearching((prev) => !prev)}
          >
            <HiOutlineSearch className="hover:text-primary" />
          </div>
        ) : (
          // open from above tablet size
          <>
            <div className="bg-white relative flex w-full items-center rounded-md p-2">
              <input
                type="text"
                placeholder="Search Movie Here..."
                onChange={(e) => setSearchData(e.target.value)}
                className={twMerge(
                  "outline-none",
                  "placeholder:text-textPrimary pr-10 placeholder:font-semibold focus:outline-none",
                )}
                ref={inputRef}
              />
              <div className="absolute right-2 top-2 text-2xl font-bold ">
                <HiOutlineSearch
                  className="hover:text-primary"
                  onClick={() => setIsSearching((prev) => !prev)}
                />
              </div>
            </div>
            <span className="text-textPrimary text-2xl font-semibold">|</span>
          </>
        )}
        <div className="rounded-full bg-primary p-3 text-xl font-semibold hover:opacity-80">
          <HiOutlineUser />
        </div>
        {isOpenSideNav && (
          <SideNav closeSideNav={() => setIsOpenSideNav(false)} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
