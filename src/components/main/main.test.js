import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main";
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

const genres = [`All Genres`, `Fantasy`, `Thrillers`];

describe(`Main component`, () => {
  it(`Render Main`, () => {
    const store = mockStore({
      [NameSpace.APP_STATE]: {
        currentGenre: `All Genres`,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <Main
              filteredMovies={mockMovieData}
              promoMovieData={mockMovieData[0]}
              genres={genres}
              movieCollectionNumber={1}
              onMovieCardTitleClick={() => {}}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
