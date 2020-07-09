import {reducer, ActionCreator, ActionType} from "./reducer.js";
import allMovies, {GenreType} from "./mocks/movies";

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
    currentGenre: GenreType.ALL_GENRES,
    filteredMovies: allMovies,
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

describe(`Action creators work correctly`, () => {
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
