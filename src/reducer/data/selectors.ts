import NameSpace from "../name-space";
import {DataState} from "./data";
import {Comment, Movie} from "../../types";

export const getMovies = (state: DataState): Movie[] => {
  return state[NameSpace.DATA].movies;
};

export const getPromoMovie = (state: DataState): Movie => {
  return state[NameSpace.DATA].promoMovie;
};

export const getFavoriteMovies = (state: DataState): Movie[] => {
  return state[NameSpace.DATA].favoriteMovies;
};

export const getMovieComments = (state: DataState): Comment[] => {
  return state[NameSpace.DATA].movieComments;
};

export const getUpdatedMovies = (movies: Movie[], newMovie: Movie): Movie[] => {
  const copiedMovies = [...movies];

  const prevMovieIndex = copiedMovies.findIndex((movie) => movie.id === newMovie.id);

  copiedMovies[prevMovieIndex] = newMovie;

  return copiedMovies;
};
