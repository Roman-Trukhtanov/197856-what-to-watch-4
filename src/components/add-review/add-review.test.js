import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import AddReview from "./add-review";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {Provider} from "react-redux";
import {AuthorizationStatus} from "../../const";
import history from "../../history";

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

describe(`AddReview component`, () => {
  it(`Render AddReview`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: {
          id: 0,
          name: ``,
          email: ``,
          avatarSrc: ``,
        },
      },
      [NameSpace.REVIEW]: {
        isSendingReview: false,
        isSendReviewError: false,
        isSendReviewSuccess: false,
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <Router
              history={history}
            >
              <AddReview
                rating={5}
                comment={``}
                movie={mockMovieData[0]}
                onReviewSubmit={() => {}}
                onReviewInput={() => {}}
                onStarChange={() => {}}
                isValidReview={false}
                isSendingReview={false}
                isSendReviewError={false}
                isSendReviewSuccess={false}
              />
            </Router>
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
