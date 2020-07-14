import {reducer, ActionCreator, ActionType} from "./reducer.js";
import allMovies from "./mocks/movies";
import {GenreType, ScreenType} from "./mocks/const";

const moviesMock = [
  {
    id: 0,
    genre: `Fantasy`,
    title: `Фантастические твари`,
    preview: `http://placeimg.com/280/175/any`,
    videoSrc: `https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4`,
    videoType: `video/mp4`,
  },
  {
    id: 1,
    title: `Форсаж`,
    genre: `Thrillers`,
    preview: `http://placeimg.com/280/175/any`,
    videoSrc: `https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4`,
    videoType: `video/webm`,
  },
  {
    id: 2,
    title: `Жажда скорости`,
    genre: `Thrillers`,
    preview: `http://placeimg.com/280/175/any`,
    videoSrc: `https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4`,
    videoType: `video/mp4`,
  },
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    screen: ScreenType.MAIN,
    currentGenre: GenreType.ALL_GENRES,
    filteredMovies: allMovies,
    movieCollectionNumber: 1,
  });
});

it(`Reducer should change screen`, () => {
  expect(reducer({
    screen: ScreenType.MAIN,
  }, {
    type: ActionType.CHANGE_SCREEN,
    payload: `Movie`,
  })).toEqual({
    screen: `Movie`,
  });

  expect(reducer({
    screen: ScreenType.MOVIE,
  }, {
    type: ActionType.CHANGE_SCREEN,
    payload: `Main`,
  })).toEqual({
    screen: `Main`,
  });
});

it(`Reducer should change genre`, () => {
  expect(reducer({
    currentGenre: GenreType.ALL_GENRES,
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Comedies`,
  })).toEqual({
    currentGenre: `Comedies`,
  });

  expect(reducer({
    currentGenre: GenreType.ALL_GENRES,
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
  it(`Action creator for changing screen returns default screen`, () => {
    expect(ActionCreator.changeScreen()).toEqual({
      type: ActionType.CHANGE_SCREEN,
      payload: ScreenType.MAIN,
    });
  });

  it(`Action creator for changing screen returns any screen`, () => {
    expect(ActionCreator.changeScreen(ScreenType.MOVIE)).toEqual({
      type: ActionType.CHANGE_SCREEN,
      payload: ScreenType.MOVIE,
    });
  });

  it(`Action creator for changing genre returns default genre`, () => {
    expect(ActionCreator.changeGenre()).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: GenreType.ALL_GENRES,
    });
  });

  it(`Action creator for changing genre returns any genre`, () => {
    expect(ActionCreator.changeGenre(GenreType.THRILLERS)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: GenreType.THRILLERS,
    });
  });

  it(`Action creator for filtering movies returns filtered movies`, () => {
    expect(ActionCreator.setFilteredMovies(GenreType.THRILLERS, moviesMock)).toEqual({
      type: ActionType.SET_FILTERED_MOVIES,
      payload: [
        {
          id: 1,
          title: `Форсаж`,
          genre: `Thrillers`,
          preview: `http://placeimg.com/280/175/any`,
          videoSrc: `https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4`,
          videoType: `video/webm`,
        },
        {
          id: 2,
          title: `Жажда скорости`,
          genre: `Thrillers`,
          preview: `http://placeimg.com/280/175/any`,
          videoSrc: `https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4`,
          videoType: `video/mp4`,
        },
      ],
    });
  });
});
