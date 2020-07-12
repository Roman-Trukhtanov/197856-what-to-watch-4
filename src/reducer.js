import {extend, getFilteredMovies} from "./utils";
import allMovies, {GenreType} from "./mocks/movies";
import {ScreenType} from "./mocks/data";

const DEFAULT_COLLECTION_NUMBER = 1;

const initialState = {
  screen: ScreenType.MAIN,
  currentGenre: GenreType.ALL_GENRES,
  filteredMovies: allMovies,
  movieCollectionNumber: DEFAULT_COLLECTION_NUMBER,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SET_FILTERED_MOVIES: `SET_FILTERED_MOVIES`,
  INCREMENT_COLLECTION: `INCREMENT_COLLECTION`,
  RESET_COLLECTION_NUMBER: `RESET_COLLECTION_NUMBER`,
  CHANGE_SCREEN: `CHANGE_SCREEN`,
};

const ActionCreator = {
  changeScreen(screen = ScreenType.MAIN) {
    return {
      type: ActionType.CHANGE_SCREEN,
      payload: screen,
    };
  },
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
  },
  incrementCollection() {
    return {
      type: ActionType.INCREMENT_COLLECTION,
      payload: 1,
    };
  },
  resetCollectionNumber() {
    return {
      type: ActionType.RESET_COLLECTION_NUMBER,
      payload: DEFAULT_COLLECTION_NUMBER,
    };
  },
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
    case ActionType.INCREMENT_COLLECTION:
      return extend(state, {
        movieCollectionNumber: state.movieCollectionNumber + action.payload,
      });
    case ActionType.RESET_COLLECTION_NUMBER:
      return extend(state, {
        movieCollectionNumber: action.payload,
      });
    case ActionType.CHANGE_SCREEN:
      return extend(state, {
        screen: action.payload,
      });
  }

  return state;
};

export {
  reducer,
  ActionType,
  ActionCreator,
};
