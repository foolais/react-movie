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

  const handleClickSearch = () => {
    setIsSearching((prev) => !prev);
  };

  useEffect(() => {
    if (isSearching && inputRef.current) inputRef.current.focus();
  }, [isSearching]);

  return (
    <div className="bg-secondary flex h-16 w-screen items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <div
          onClick={() => setIsOpenSideNav((prev) => !prev)}
          className={twMerge("text-white cursor-pointer text-3xl", "md:hidden")}
        >
          <HiMenu className="hover:text-primary" />
        </div>
        <div className="w-max cursor-pointer rounded-md bg-primary p-1 text-2xl font-extrabold hover:opacity-80">
          IMDb
        </div>
      </div>
      {/* searching bar for mobile */}
      {isMobile && isSearching && (
        <div className="absolute left-0 right-0 top-0 min-h-16 transition duration-300 ease-in-out">
          <input
            type="text"
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search Movie here...."
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
      <div className="flex items-center gap-4">
        {isMobile ? (
          // open from mobile size
          <div
            className="text-white cursor-pointer text-xl"
            onClick={() => handleClickSearch()}
          >
            <HiOutlineSearch className="hover:text-primary" />
          </div>
        ) : (
          // open from above tablet size
          <div className="bg- flex items-center">
            <input type="text" />
            <div className="text-white text-xl">
              <HiOutlineSearch
                className="hover:text-primary"
                onClick={() => setIsSearching((prev) => !prev)}
              />
            </div>
          </div>
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
