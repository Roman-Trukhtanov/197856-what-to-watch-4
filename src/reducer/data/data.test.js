import {createAPI} from "../../api.js";
import MockAdapter from "axios-mock-adapter";
import {reducer, ActionType, Operation} from "./data.js";
import ModelMovie from "../model-movie";
import ModelComment from "../model-comment";

const api = createAPI(() => {});

const fakeFilmData = {
  "id": 1,
  "name": `The Grand Budapest Hotel`,
  "poster_image": `img/the-grand-budapest-hotel-poster.jpg`,
  "preview_image": `img/the-grand-budapest-hotel.jpg`,
  "background_image": `img/the-grand-budapest-hotel-bg.jpg`,
  "background_color": `#ffffff`,
  "video_link": `https://some-link`,
  "preview_video_link": `https://some-link`,
  "description": `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  "rating": 8.9,
  "scores_count": 240,
  "director": `Wes Andreson`,
  "starring": [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  "run_time": 99,
  "genre": `Comedy`,
  "released": 2014,
  "is_favorite": false,
};

const fakeComment = {
  "id": 1,
  "user": {
    "id": 4,
    "name": `Kate Muir`
  },
  "rating": 8.9,
  "comment": `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  "date": `2019-05-08T14:13:56.569Z`
};

const mockMovieData = [{
  id: 1,
  title: `Snatch`,
  genre: `Comedy`,
  bgColor: `#FDFDFC`,
  coverSrc: `https://some-link`,
  bigPosterSrc: `https://some-link`,
  previewImgSrc: `https://some-link`,
  isFavorite: false,
  fullVideo: {
    className: `player__video`,
    src: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
    type: `video/mp4`,
    isAutoPlay: true,
    isLoop: false,
    isMute: false,
  },
  previewVideo: {
    src: `https://some-link`,
    type: `video/mp4`,
    isAutoPlay: true,
    isLoop: true,
    isMute: true,
  },
  details: {
    rate: 3,
    releaseYear: 2000,
    ratingCount: 100,
    level: `Bad`,
    description: `Description`,
    director: `Guy Ritchie`,
    runTime: 104,
    starring: [`Jason Statham`, `Brad Pitt`, `Benicio Del Toro`],
  },
}];

const mockCommentData = [{
  id: 1,
  user: {
    id: 2,
    name: `Other user`,
  },
  rating: 7.2,
  comment: `Other comment`,
  dateText: `June 20, 2020`,
}];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    movies: [],
    promoMovie: {},
    favoriteMovies: [],
    movieComments: [{}],
  });
});

it(`Reducer should update movies by load movies`, () => {
  expect(reducer({
    movies: [],
  }, {
    type: ActionType.LOAD_MOVIES,
    payload: mockMovieData,
  })).toEqual({
    movies: mockMovieData,
  });
});

it(`Reducer should update movieComments by load movie comments`, () => {
  expect(reducer({
    movieComments: [],
  }, {
    type: ActionType.LOAD_MOVIE_COMMENTS,
    payload: mockCommentData,
  })).toEqual({
    movieComments: mockCommentData,
  });
});

it(`Reducer should update movieComments by load promo movie`, () => {
  expect(reducer({
    promoMovie: [],
  }, {
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: mockMovieData[0],
  })).toEqual({
    promoMovie: mockMovieData[0],
  });
});

it(`Reducer should update movies by load favorite movies`, () => {
  expect(reducer({
    favoriteMovies: [],
  }, {
    type: ActionType.LOAD_FAVORITE_MOVIES,
    payload: mockMovieData,
  })).toEqual({
    favoriteMovies: mockMovieData,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, [fakeFilmData]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: ModelMovie.parseMovies([fakeFilmData]),
        });
      });
  });

  it(`Should make a correct API call to /comments/:id`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieCommentsLoader = Operation.loadMovieComments(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [fakeComment]);

    return movieCommentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIE_COMMENTS,
          payload: ModelComment.parseComments([fakeComment]),
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoMovieLoader = Operation.loadPromoMovie();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, fakeFilmData);

    return promoMovieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_MOVIE,
          payload: ModelMovie.parseMovie(fakeFilmData),
        });
      });
  });

  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteMoviesLoader = Operation.loadFavoriteMovies();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [fakeFilmData]);

    return favoriteMoviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITE_MOVIES,
          payload: ModelMovie.parseMovies([fakeFilmData]),
        });
      });
  });
});
