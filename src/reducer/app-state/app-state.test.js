import {reducer, ActionCreator, ActionType} from "./app-state";
import {DEFAULT_GENRE, DEFAULT_COLLECTION_NUMBER} from "../../const";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    selectedMovieID: 1,
    currentGenre: DEFAULT_GENRE,
    movieCollectionNumber: DEFAULT_COLLECTION_NUMBER,
  });
});


it(`Reducer should set selected movie id`, () => {
  expect(reducer({
    selectedMovieID: 1,
  }, {
    type: ActionType.SET_SELECTED_MOVIE_ID,
    payload: 3,
  })).toEqual({
    selectedMovieID: 3,
  });

  expect(reducer({
    selectedMovieID: 10,
  }, {
    type: ActionType.SET_SELECTED_MOVIE_ID,
    payload: 12,
  })).toEqual({
    selectedMovieID: 12,
  });
});

it(`Reducer should change genre`, () => {
  expect(reducer({
    currentGenre: DEFAULT_GENRE,
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Comedies`,
  })).toEqual({
    currentGenre: `Comedies`,
  });

  expect(reducer({
    currentGenre: DEFAULT_GENRE,
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Thrillers`,
  })).toEqual({
    currentGenre: `Thrillers`,
  });
});

it(`Reducer should change movie collection number`, () => {
  expect(reducer({
    movieCollectionNumber: 1,
  }, {
    type: ActionType.INCREMENT_COLLECTION,
    payload: 1,
  })).toEqual({
    movieCollectionNumber: 2,
  });

  expect(reducer({
    movieCollectionNumber: 2,
  }, {
    type: ActionType.INCREMENT_COLLECTION,
    payload: 2,
  })).toEqual({
    movieCollectionNumber: 4,
  });
});

it(`Reducer should reset movie collection number`, () => {
  expect(reducer({
    movieCollectionNumber: 1,
  }, {
    type: ActionType.RESET_COLLECTION_NUMBER,
    payload: 1,
  })).toEqual({
    movieCollectionNumber: 1,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing genre returns default genre`, () => {
    expect(ActionCreator.changeGenre()).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: DEFAULT_GENRE,
    });
  });

  it(`Action creator for changing genre returns any genre`, () => {
    expect(ActionCreator.changeGenre(`Action`)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: `Action`,
    });
  });

  it(`Action creator for setting selected movie id returns default id`, () => {
    expect(ActionCreator.setSelectedMovieID()).toEqual({
      type: ActionType.SET_SELECTED_MOVIE_ID,
      payload: 1,
    });
  });

  it(`Action creator for setting selected movie id returns any id`, () => {
    expect(ActionCreator.setSelectedMovieID(10)).toEqual({
      type: ActionType.SET_SELECTED_MOVIE_ID,
      payload: 10,
    });
  });
});
