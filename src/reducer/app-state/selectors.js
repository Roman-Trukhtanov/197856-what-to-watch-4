import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {DEFAULT_GENRE, MAX_GENRES_AMOUNT, MAX_SLICED_MOVIES} from "../../const";
import {getMovies} from "../data/selectors";
import {shuffleArray} from "../../utils";

export const getCurrentGenre = (state) => {
  return state[NameSpace.APP_STATE].currentGenre;
};

export const getMovieCollectionNumber = (state) => {
  return state[NameSpace.APP_STATE].movieCollectionNumber;
};

export const getSelectedMovieID = (state) => {
  return state[NameSpace.APP_STATE].selectedMovieID;
};

const filterMoviesByGenre = (genre = DEFAULT_GENRE, movies) => {
  if (genre === DEFAULT_GENRE) {
    return movies;
  }

  return movies.filter((movie) => genre === movie.genre);
};

export const getFilteredMovies = createSelector(
    getCurrentGenre,
    getMovies,
    (genre, movies) => {
      return filterMoviesByGenre(genre, movies);
    }
);

const getGenres = (movies) => {
  const genresSetList = new Set([DEFAULT_GENRE, ...movies.map((movie) => movie.genre)]);

  const genresList = [...genresSetList];

  if (genresList.length >= MAX_GENRES_AMOUNT) {
    return genresList.slice(0, MAX_GENRES_AMOUNT);
  }

  return genresList;
};

export const getGenresList = createSelector(
    getMovies,
    (movies) => {
      return getGenres(movies);
    }
);

const getRandomMoviesList = (selectedMovieID, movies) => {
  const slicedMovies = [
    ...movies.slice(0, selectedMovieID - 1),
    ...movies.slice(selectedMovieID, movies.length)
  ];

  const shuffleMovies = shuffleArray(slicedMovies);

  return shuffleMovies.slice(0, MAX_SLICED_MOVIES);
};

export const getRandomMovies = createSelector(
    getSelectedMovieID,
    getMovies,
    (selectedMovieID, movies) => {
      return getRandomMoviesList(selectedMovieID, movies);
    }
);
