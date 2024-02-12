import { HiMenu, HiOutlineSearch, HiOutlineUser, HiX } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "react-responsive";
import { useState, useRef, useEffect } from "react";
import SideNav from "./SideNav";
import { getSearchMovie, getGenreList } from "../utils/api";
import DropDownMovie from "./DropdownMovie";

const Navbar = () => {
  const [isOpenSideNav, setIsOpenSideNav] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [listMovies, setListMovies] = useState([]);
  const [listGenres, setListGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState("");

  const inputRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // change focus to input when click button searching
  useEffect(() => {
    if (isSearching && inputRef.current) inputRef.current.focus();
  }, [isSearching]);

  // get list Genre movies
  useEffect(() => {
    getGenreList().then((response) => {
      setListGenres(response.genres);
    });
  }, []);

  // Mapping list movie when searching
  useEffect(() => {
    const baseimgurl = import.meta.env.VITE_BASEIMGURL;

    const fetchMovie = async () => {
      await getSearchMovie(searchData)
        .then((response) => {
          if (response.total_results !== 0) {
            const movies = response.results.map((item) => {
              const filteredGenre = listGenres.filter((ar) =>
                item.genre_ids.includes(ar.id),
              );
              return {
                id: item.id,
                title: item.title,
                release_year: item.release_date.split("-")[0],
                poster: item.poster_path
                  ? `${baseimgurl}${item.poster_path}`
                  : null,
                genre: filteredGenre.map((ar) => ar.name),
              };
            });
            setListMovies(movies);
          } else {
            setNotFoundMessage(`Movie "${searchData}" Not Found`);
          }
        })
        .catch((error) => {
          console.log({ error });
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    };

    const timer = setTimeout(() => {
      setNotFoundMessage("");
      setIsLoading(true);
      fetchMovie();
    }, 650);

    return () => clearTimeout(timer);
  }, [searchData, listGenres]);

  return (
    <div className="flex h-[10vh] w-screen items-center justify-between bg-secondary p-5">
      <div
        onClick={() => setSearchData("")}
        className="flex items-center gap-4"
      >
        <div
          onClick={() => setIsOpenSideNav((prev) => !prev)}
          className={twMerge(
            "cursor-pointer text-3xl text-white",
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
              "ml-2 flex items-center justify-center gap-3 text-xl font-semibold text-white",
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
        <div className="absolute left-0 right-0 top-0 min-h-[10vh] transition duration-300 ease-in-out">
          <input
            type="text"
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search Movie Here...."
            className={twMerge(
              "h-[10vh] w-full bg-secondary p-3 text-white ",
              "pr-10 placeholder:font-bold placeholder:text-tertiary focus:outline-none",
            )}
            ref={inputRef}
          />
          <div
            className="absolute right-5 top-5 rounded-full text-2xl font-semibold text-white"
            onClick={() => {
              setIsSearching((prev) => !prev),
                setSearchData(""),
                setListMovies([]);
            }}
          >
            <HiX className="hover:text-primary" />
          </div>
          {searchData.length >= 3 && (
            <DropDownMovie
              listMovies={listMovies}
              isLoading={isLoading}
              notFoundMessage={notFoundMessage}
            />
          )}
        </div>
      )}
      {/* END searching bar for mobile */}
      <div
        className={twMerge("flex items-center gap-4", "md:w-[40%] lg:w-1/2")}
      >
        {isMobile ? (
          // open from mobile size
          <div
            className="cursor-pointer text-xl text-white"
            onClick={() => setIsSearching((prev) => !prev)}
          >
            <HiOutlineSearch className="hover:text-primary" />
          </div>
        ) : (
          // open from above tablet size
          <>
            <div className="relative flex w-full items-center rounded-md bg-white p-2">
              <input
                type="text"
                placeholder="Search Movie Here..."
                onChange={(e) => setSearchData(e.target.value)}
                className={twMerge(
                  "outline-none",
                  "pr-10 placeholder:font-semibold placeholder:text-tertiary focus:outline-none",
                )}
                ref={inputRef}
              />
              <div className="absolute right-2 top-2 text-2xl font-bold ">
                <HiOutlineSearch
                  className="hover:text-primary"
                  onClick={() => setIsSearching((prev) => !prev)}
                />
              </div>
              {searchData.length >= 3 && (
                <DropDownMovie
                  listMovies={listMovies}
                  isLoading={isLoading}
                  notFoundMessage={notFoundMessage}
                />
              )}
            </div>
            <span className="text-2xl font-semibold text-tertiary">|</span>
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
