export const API = "https://api.themoviedb.org/3";
export const API_IMAGE = "https://image.tmdb.org/t/p/original/";

//Authentication

export const GET_POPULAR_LIST = `${API}/discover/movie`;
export const GET_SEARCH_LIST = `${API}/search/movie`;
export const GET_MOVIE_BY_ID = (movie_id: number) => `${API}/movie/${movie_id}`;