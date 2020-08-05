import {createSelector} from "reselect";
import NameSpace from "../name-space";
import {DEFAULT_GENRE, MAX_GENRES_AMOUNT, MAX_SLICED_MOVIES} from "../../const";
import {shuffleMovies} from "../../utils";
import {getMovies} from "../data/selectors";
import {AppState} from "./app-state";
import {Movie} from "../../types";

export const getCurrentGenre = (state: AppState): string => {
  return state[NameSpace.APP_STATE].currentGenre;
};

export const getMovieCollectionNumber = (state: AppState): number => {
  return state[NameSpace.APP_STATE].movieCollectionNumber;
};

export const getSelectedMovieID = (state: AppState): number => {
  return state[NameSpace.APP_STATE].selectedMovieID;
};

const filterMoviesByGenre = (
    genre: string = DEFAULT_GENRE,
    movies: Movie[]
): Movie[] => {
  if (genre === DEFAULT_GENRE) {
    return movies;
  }

  return movies.filter((movie) => genre === movie.genre);
};

export const getFilteredMovies = createSelector(
    getCurrentGenre,
    getMovies,
    (genre: string, movies: Movie[]): Movie[] => {
      return filterMoviesByGenre(genre, movies);
    }
);

const getGenres = (movies: Movie[]): string[] => {
  const genresSetList = new Set([DEFAULT_GENRE, ...movies.map((movie) => movie.genre)]);

  const genresList = [...genresSetList];

  if (genresList.length >= MAX_GENRES_AMOUNT) {
    return genresList.slice(0, MAX_GENRES_AMOUNT);
  }

  return genresList;
};

export const getGenresList = createSelector(
    getMovies,
    (movies: Movie[]): string[] => {
      return getGenres(movies);
    }
);

const getRandomMoviesList = (selectedMovieID: number, movies: Movie[]): Movie[] => {
  const slicedMovies: Movie[] = [
    ...movies.slice(0, selectedMovieID - 1),
    ...movies.slice(selectedMovieID, movies.length)
  ];

  const shuffleMoviesList = shuffleMovies(slicedMovies);

  return shuffleMoviesList.slice(0, MAX_SLICED_MOVIES);
};

export const getRandomMovies = createSelector(
    getSelectedMovieID,
    getMovies,
    (selectedMovieID, movies) => {
      return getRandomMoviesList(selectedMovieID, movies);
    }
);
