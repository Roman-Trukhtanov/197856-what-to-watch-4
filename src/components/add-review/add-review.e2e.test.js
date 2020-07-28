import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {AddReview} from "./add-review";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus, RATING_MULTIPLIER, ScreenType} from "../../const";
import {Provider} from "react-redux";

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

configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.SCREEN]: {
    prevScreen: ScreenType.MOVIE,
    screen: ScreenType.ADD_REVIEW,
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
  [NameSpace.REVIEW]: {
    isSendingReview: false,
    isSendReviewError: false,
    isSendReviewSuccess: false,
  }
});

const mockReview = {
  rating: 5,
  comment: `Hello`,
};

describe(`AddReview component`, () => {
  it(`Form functions should be called`, () => {
    const onReviewSubmit = jest.fn();
    const onReviewInput = jest.fn();
    const onStarChange = jest.fn();

    const selectedMovie = mockMovieData[0];

    const AddReviewWrap = mount(
        <Provider store={store}>
          <AddReview
            movie={selectedMovie}
            rating={mockReview.rating}
            comment={mockReview.comment}
            onReviewSubmit={onReviewSubmit}
            onStarChange={onStarChange}
            onReviewInput={onReviewInput}
            isValidReview={true}
            isSendingReview={false}
            isSendReviewError={false}
            isSendReviewSuccess={false}
          />
        </Provider>
    );

    const starInput = AddReviewWrap.find(`.rating__input`).at(0);
    const textAreaInput = AddReviewWrap.find(`.add-review__textarea`);
    const addReviewForm = AddReviewWrap.find(`.add-review__form`);

    starInput.simulate(`change`);
    textAreaInput.simulate(`input`);
    addReviewForm.simulate(`submit`);

    expect(onStarChange).toHaveBeenCalledTimes(1);
    expect(onReviewInput).toHaveBeenCalledTimes(1);

    expect(onReviewSubmit).toHaveBeenCalledWith(selectedMovie.id, {
      rating: mockReview.rating * RATING_MULTIPLIER,
      comment: mockReview.comment,
    });
  });
});
