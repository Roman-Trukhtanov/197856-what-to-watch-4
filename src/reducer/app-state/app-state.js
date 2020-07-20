import {extend} from "../../utils";
import {
  DEFAULT_GENRE,
  DEFAULT_COLLECTION_NUMBER,
  DEFAULT_SELECTED_MOVIE_ID,
} from "../../const";

const initialState = {
  selectedMovieID: DEFAULT_SELECTED_MOVIE_ID,
  currentGenre: DEFAULT_GENRE,
  movieCollectionNumber: DEFAULT_COLLECTION_NUMBER,
};

const ActionType = {
  SET_SELECTED_MOVIE_ID: `SET_SELECTED_MOVIE_ID`,
  INCREMENT_COLLECTION: `INCREMENT_COLLECTION`,
  RESET_COLLECTION_NUMBER: `RESET_COLLECTION_NUMBER`,
  CHANGE_GENRE: `CHANGE_GENRE`,
};

const ActionCreator = {
  setSelectedMovieID(movieID = DEFAULT_SELECTED_MOVIE_ID) {
    return {
      type: ActionType.SET_SELECTED_MOVIE_ID,
      payload: movieID,
    };
  },
  changeGenre(genre = DEFAULT_GENRE) {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: genre,
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
    case ActionType.SET_SELECTED_MOVIE_ID:
      return extend(state, {
        selectedMovieID: action.payload,
      });
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });
    case ActionType.INCREMENT_COLLECTION:
      return extend(state, {
        movieCollectionNumber: state.movieCollectionNumber + action.payload,
      });
    case ActionType.RESET_COLLECTION_NUMBER:
      return extend(state, {
        movieCollectionNumber: action.payload,
      });
  }

  return state;
};

export {
  reducer,
  ActionType,
  ActionCreator,
};
