import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {ActionType, Operation, reducer} from './review';
import {noop} from "../../utils";
import {ActionObject, Review} from "../../types";
import {AxiosInstance} from "axios";
import NameSpace from "../name-space";

const mockReviewData: Review = {
  rating: 10,
  comment: `Test comment`,
};

const getMockState = () => ({
  [NameSpace.DATA]: {},
  [NameSpace.APP_STATE]: {},
  [NameSpace.USER]: {},
  [NameSpace.REVIEW]: {},
});

const api: AxiosInstance = createAPI(noop);

const emptyAction: ActionObject<null> = {
  type: null,
  payload: null,
};

describe(`Operaions Review`, () => {
  it(`Should make a correct API call to post /comments/filmID`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewSending = Operation.sendReview(0, mockReviewData);

    apiMock
      .onPost(`/comments/0`)
      .reply(200, [{fake: true}]);

    return reviewSending(dispatch, getMockState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.SEND_REVIEW_SUCCESS,
          payload: true,
        });
      });
  });
});

describe(`Reducer User`, () => {
  it(`Should return initial state`, () => {
    expect(reducer(undefined, emptyAction)).toEqual({
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
