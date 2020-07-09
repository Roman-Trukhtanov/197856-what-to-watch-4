import {GenreType, MAX_GENRES_AMOUNT} from "./mocks/movies";

export const extend = (currentObject, newObject) => {
  return Object.assign({}, currentObject, newObject);
};

export const getFilteredMovies = (genre = GenreType.ALL_GENRES, movies, maxMoviesAmount) => {
  if (genre === GenreType.ALL_GENRES) {
    return movies;
  }

  if (maxMoviesAmount) {
    return movies.filter((movie) => genre === movie.genre).slice(0, maxMoviesAmount);
  }

  return movies.filter((movie) => genre === movie.genre);
};

export const getGenresList = (movies) => {
  const genresSetList = new Set([GenreType.ALL_GENRES, ...movies.map((movie) => movie.genre)]);

  const genresList = [...genresSetList];

  if (genresList.length >= MAX_GENRES_AMOUNT) {
    return genresList.slice(0, MAX_GENRES_AMOUNT);
  }

  return genresList;
};
