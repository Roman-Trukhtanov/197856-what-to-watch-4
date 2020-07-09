import {extend, getFilteredMovies} from "./utils";
import allMovies, {GenreType} from "./mocks/movies";

const initialState = {
  currentGenre: GenreType.ALL_GENRES,
  filteredMovies: allMovies,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SET_FILTERED_MOVIES: `SET_FILTERED_MOVIES`,
};

const ActionCreator = {
  changeGenre(genre = GenreType.ALL_GENRES) {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: genre,
    };
  },
  setFilteredMovies(genre = GenreType.ALL_GENRES, movies = allMovies) {
    return {
      type: ActionType.SET_FILTERED_MOVIES,
      payload: getFilteredMovies(genre, movies),
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });
    case ActionType.SET_FILTERED_MOVIES:
      return extend(state, {
        filteredMovies: action.payload,
      });
  }

  return state;
};

export {
  reducer,
  ActionType,
  ActionCreator,
};
