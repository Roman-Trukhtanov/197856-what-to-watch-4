import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import {AuthorizationStatus} from "../../const";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

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
    src: `https://some-link.mp4`,
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

describe(`App component`, () => {
  it(`Render App`, () => {
    const store = mockStore({
      [NameSpace.APP_STATE]: {
        selectedMovieID: 1,
        currentGenre: `All Genres`,
        movieCollectionNumber: 1,
      },
      [NameSpace.DATA]: {
        movies: mockMovieData,
        promoMovie: mockMovieData[0],
        favoriteMovies: mockMovieData,
        movieComments: mockCommentData,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              promoMovieData={mockMovieData[0]}
              selectedMovieID={1}
              randomMovies={mockMovieData}
              movies={mockMovieData}
              genres={[`All Genres`]}
              movieComments={mockCommentData}
              filteredMovies={mockMovieData}
              movieCollectionNumber={1}
              onMovieCardTitleClick={() => {}}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              loadAllMovieComments={() => {}}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
