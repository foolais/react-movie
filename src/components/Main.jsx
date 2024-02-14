import { useState, useEffect } from "react";
import { getMovieList } from "../utils/api";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import { HiPlay } from "react-icons/hi";
import "../customStyle.css";

const Main = () => {
  const [listMovies, setListMovies] = useState([]);

  useEffect(() => {
    const baseImageUrl = import.meta.env.VITE_BASEIMGURL;
    const fetchMovie = async () =>
      await getMovieList("now_playing")
        .then((datas) => {
          const { results } = datas;
          const movies = results.map((item) => ({
            id: item.id,
            title: item.title,
            overview: item.overview,
            release_year: moment(item.release_date).format("DD MMM YYYY"),
            backdrop: item.backdrop_path
              ? `${baseImageUrl}${item.backdrop_path}`
              : null,
            poster: item.poster_path
              ? `${baseImageUrl}${item.poster_path}`
              : null,
          }));
          setListMovies(movies);
        })
        .catch((error) => {
          console.log({ error });
        });

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
                `absolute bottom-0 left-0 right-0 top-0 z-[99] h-[105%] w-full`,
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
            {/* text title */}
            <div className="black-gradient absolute -bottom-5 left-0 right-0  p-28"></div>
            <div className="absolute bottom-0 left-0 right-0 flex gap-6">
              <img
                className="mb-12 ml-8 max-h-40 max-w-24 object-cover"
                src={item.poster}
                alt={item.title}
              />
              <div className="flex flex-col items-start justify-between pr-2 text-left text-tertiary">
                <div className="mt-3 flex max-h-10 max-w-10 items-center justify-center rounded-full bg-white hover:bg-tertiary">
                  <HiPlay className="min-h-14 min-w-14 text-primary" />
                </div>
                <div className="mb-14 grid">
                  <span className="mb-2 mt-4 font-bold tracking-widest">
                    {item.title}
                  </span>
                  <span className="text-lg font-semibold">
                    {item.release_year}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Main;
