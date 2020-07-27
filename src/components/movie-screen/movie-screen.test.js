import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import MovieScreen from "./movie-screen";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../const";
import history from "../../history";

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

const mockStore = configureStore([]);

describe(`MovieScreen component`, () => {
  it(`Render MovieScreen`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        promoMovie: mockMovieData[0],
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: {
          id: 0,
          name: ``,
          email: ``,
          avatarSrc: ``,
        },
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <Router
              history={history}
            >
              <MovieScreen
                authorizationStatus={AuthorizationStatus.AUTH}
                moreMovies={mockMovieData}
                movie={mockMovieData[0]}
                movieComments={mockCommentData}
                onMovieCardTitleClick={() => {}}
              />
            </Router>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
