import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASEURL;
const API_KEY = import.meta.env.VITE_APIKEY;

// GET Movie with params
export const getMovieList = async (params) => {
  const movie = await axios.get(`${BASE_URL}/${params}?api_key=${API_KEY}`);
  return movie;
};

export const getSearchMovie = async (query) => {
  const search = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
  );
  return search;
};

export const getGenreList = async () => {
  const genre = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
  );
  return genre;
};
