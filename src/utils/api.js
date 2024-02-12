import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASEURL;
const API_KEY = import.meta.env.VITE_APIKEY;

// GET Movie with params
export const getMovieList = async (params) => {
  try {
    const movies = await axios.get(
      `${BASE_URL}/movie/${params}?api_key=${API_KEY}`,
    );
    return movies.data;
  } catch (error) {
    return error;
  }
};

export const getSearchMovie = async (query) => {
  try {
    const search = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
    );
    return search.data;
  } catch (error) {
    return error;
  }
};

export const getGenreList = async () => {
  try {
    const genre = await axios.get(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
    );
    return genre.data;
  } catch (error) {
    return error;
  }
};
