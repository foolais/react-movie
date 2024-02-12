import { useState, useEffect } from "react";
import { getMovieList } from "../utils/api";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { truncateString } from "../utils/utils";

const Main = () => {
  const [listMovies, setListMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const baseImageUrl = import.meta.env.VITE_BASEIMGURL;
    const fetchMovie = async () =>
      await getMovieList("now_playing")
        .then((datas) => {
          setIsLoading(true);
          const { results } = datas;
          const movies = results.map((item) => ({
            id: item.id,
            title: item.title,
            overview: item.overview,
            release_year: item.release_date.split("-")[0],
            backdrop: item.backdrop_path
              ? `${baseImageUrl}${item.backdrop_path}`
              : null,
          }));
          setListMovies(movies);
        })
        .catch((error) => {
          console.log({ error });
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));

    fetchMovie();
  }, []);

  return (
    <Carousel
      autoPlay={true}
      showThumbs={false}
      infiniteLoop={true}
      showStatus={false}
    >
      {listMovies.slice(8, 19).map((item) => {
        return (
          <div key={item.id} className="relative h-full w-full">
            <div
              className={twMerge(
                `absolute bottom-0 left-0 right-0 top-0 z-[99] h-[105%] w-full bg-gradient-to-t from-secondary`,
              )}
            ></div>
            <img
              src={item.backdrop}
              className={twMerge(
                "bg-no-repeat object-cover object-top",
                "h-[70vh] md:h-[80vh] lg:h-[90vh]",
              )}
              alt="poster"
            />
            <div className="absolute left-[7%] top-1/3 z-[99] w-3/4 text-left md:left-[4%] md:w-1/2">
              <span
                className={twMerge(
                  "text-left font-bold text-tertiary",
                  "text-3xl lg:text-4xl",
                )}
              >
                {item.title}
              </span>
              <Button
                isBgFilled={true}
                classname="py-2 px-6 md:py-3 md:px-7 mt-5 mb-8 md:mt-8 md:mb-10"
              >
                <HiOutlineInformationCircle className="text-2xl md:text-3xl" />
                <span>Hello</span>
              </Button>
              <div
                className={twMerge(
                  "text-wrap text-justify text-tertiary",
                  "text-lg md:text-xl lg:text-3xl",
                )}
              >
                {truncateString(item.overview, 100)}
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Main;
