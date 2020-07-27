import NameSpace from "../name-space.js";

export const getMovies = (state) => {
  return state[NameSpace.DATA].movies;
};

export const getPromoMovie = (state) => {
  return state[NameSpace.DATA].promoMovie;
};

export const getFavoriteMovies = (state) => {
  return state[NameSpace.DATA].favoriteMovies;
};

export const getMovieComments = (state) => {
  return state[NameSpace.DATA].movieComments;
};

export const getUpdatedMovies = (movies, newMovie) => {
  const copiedMovies = [...movies];

  const prevMovieIndex = copiedMovies.findIndex((movie) => movie.id === newMovie.id);

  copiedMovies[prevMovieIndex] = newMovie;

  return copiedMovies;
};
