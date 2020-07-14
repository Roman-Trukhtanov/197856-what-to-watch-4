import {GenreType, MAX_GENRES_AMOUNT, MAX_VISIBLE_MOVIES_COUNT} from "./mocks/const";

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

export const spliceMovies = (
    collectionNumber = 1,
    movies,
    visibleMoviesCount = MAX_VISIBLE_MOVIES_COUNT
) => {
  return [...movies].splice(0, visibleMoviesCount * collectionNumber);
};

export const checkVisibleMovies = (movies, movieCollectionNumber) => {
  return MAX_VISIBLE_MOVIES_COUNT * movieCollectionNumber < movies.length;
};
