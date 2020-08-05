import {extend} from "../../utils";
import {
  DEFAULT_GENRE,
  DEFAULT_COLLECTION_NUMBER,
  DEFAULT_SELECTED_MOVIE_ID,
} from "../../const";
import {Action, ActionObject} from "../../types";

export interface AppState {
  selectedMovieID?: number;
  currentGenre?: string;
  movieCollectionNumber?: number;
}

const initialState: AppState = {
  selectedMovieID: DEFAULT_SELECTED_MOVIE_ID,
  currentGenre: DEFAULT_GENRE,
  movieCollectionNumber: DEFAULT_COLLECTION_NUMBER,
};

const ActionType: Action = {
  SET_SELECTED_MOVIE_ID: `SET_SELECTED_MOVIE_ID`,
  INCREMENT_COLLECTION: `INCREMENT_COLLECTION`,
  RESET_COLLECTION_NUMBER: `RESET_COLLECTION_NUMBER`,
  CHANGE_GENRE: `CHANGE_GENRE`,
};

const ActionCreator = {
  setSelectedMovieID(movieID: number = DEFAULT_SELECTED_MOVIE_ID): ActionObject<number> {
    return {
      type: ActionType.SET_SELECTED_MOVIE_ID,
      payload: movieID,
    };
  },
  changeGenre(genre: string = DEFAULT_GENRE): ActionObject<string> {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: genre,
    };
  },
  incrementCollection(): ActionObject<number> {
    return {
      type: ActionType.INCREMENT_COLLECTION,
      payload: 1,
    };
  },
  resetCollectionNumber(): ActionObject<number> {
    return {
      type: ActionType.RESET_COLLECTION_NUMBER,
      payload: DEFAULT_COLLECTION_NUMBER,
    };
  },
};

const reducer = (
    state: AppState = initialState,
    {type, payload}: ActionObject<typeof payload>
): object => {
  switch (type) {
    case ActionType.SET_SELECTED_MOVIE_ID:
      return extend(state, {
        selectedMovieID: payload,
      });
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        currentGenre: payload,
      });
    case ActionType.INCREMENT_COLLECTION:
      return extend(state, {
        movieCollectionNumber: state.movieCollectionNumber + payload,
      });
    case ActionType.RESET_COLLECTION_NUMBER:
      return extend(state, {
        movieCollectionNumber: payload,
      });
  }

  return state;
};

export {
  reducer,
  ActionType,
  ActionCreator,
};
