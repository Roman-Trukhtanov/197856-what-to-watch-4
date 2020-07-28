import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {ActionType, Operation, reducer} from './review';
import NameSpace from "../name-space";
import {ScreenType} from "../../const";

const mockReviewData = {
  rating: 10,
  comment: `Test comment`,
};

const mockState = {
  [NameSpace.SCREEN]: {
    screen: ScreenType.MOVIE,
  },
};

const api = createAPI(() => {});

describe(`Operaions Review`, () => {
  it(`Should make a correct API call to post /comments/filmID`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewSending = Operation.sendReview(0, mockReviewData);

    apiMock
      .onPost(`/comments/0`)
      .reply(200, [{fake: true}]);

    return reviewSending(dispatch, () => mockState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.SEND_REVIEW,
          payload: true,
        });
      });
  });
});

describe(`Reducer User`, () => {
  it(`Should return initital state`, () => {
    expect(reducer(undefined, {})).toEqual({
      isSendingReview: false,
      isSendReviewError: false,
      isSendReviewSuccess: false,
    });
  });

  it(`Should update review send status`, () => {
    expect(reducer({
      isSendingReview: false,
    }, {
      type: ActionType.SEND_REVIEW,
      payload: true
    })).toEqual({
      isSendingReview: true,
    });
  });

  it(`Should reset default review state`, () => {
    expect(reducer({
      isSendingReview: false,
      isSendReviewError: false,
      isSendReviewSuccess: true,
    }, {
      type: ActionType.RESET_REVIEW_STATE,
      payload: {
        isSendingReview: false,
        isSendReviewError: false,
        isSendReviewSuccess: false,
      }
    })).toEqual({
      isSendingReview: false,
      isSendReviewError: false,
      isSendReviewSuccess: false,
    });
  });
});


