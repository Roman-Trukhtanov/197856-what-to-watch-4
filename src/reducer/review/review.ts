import {extend} from "../../utils";
import {Operation as DataOperation} from "../data/data";
import {historyGoBack} from "../../history";
import {Action, ActionObject, Review} from "../../types";
import {AxiosInstance} from "axios";
import {AppDispatch, AppGetState} from "../../index";

export interface ReviewState {
  isSendingReview?: boolean;
  isSendReviewError?: boolean;
  isSendReviewSuccess?: boolean;
}

const initialState: ReviewState = {
  isSendingReview: false,
  isSendReviewError: false,
  isSendReviewSuccess: false,
};

const ActionType: Action = {
  SEND_REVIEW: `SEND_REVIEW`,
  SEND_REVIEW_ERROR: `SEND_COMMENT_ERROR`,
  SEND_REVIEW_SUCCESS: `SEND_REVIEW_SUCCESS`,
  RESET_REVIEW_STATE: `RESET_REVIEW_STATE`,
};

const ActionCreator = {
  sendingReview: (flag: boolean): ActionObject<boolean> => ({
    type: ActionType.SEND_REVIEW,
    payload: flag,
  }),

  sendReviewError: (error: boolean): ActionObject<boolean> => ({
    type: ActionType.SEND_REVIEW_ERROR,
    payload: error,
  }),

  sendReviewSuccess: (flag: boolean): ActionObject<boolean> => ({
    type: ActionType.SEND_REVIEW_SUCCESS,
    payload: flag,
  }),

  resetReviewState: (): ActionObject<ReviewState> => ({
    type: ActionType.RESET_REVIEW_STATE,
    payload: initialState,
  })
};

const Operation = {
  sendReview: (
      movieID: number,
      review: Review
  ) => (
      dispatch: AppDispatch,
      getState: AppGetState,
      api: AxiosInstance
  ) => {
    dispatch(ActionCreator.sendingReview(true));

    return api.post(`/comments/${movieID}`, {
      rating: review.rating,
      comment: review.comment,
    })
      .then(() => {
        dispatch(ActionCreator.sendingReview(false));
        dispatch(ActionCreator.sendReviewError(false));
        dispatch(ActionCreator.sendReviewSuccess(true));

        // Получаем обновленные комментарии
        dispatch(DataOperation.loadMovieComments(movieID));

        // Возвращаем на предыдущий экран
        historyGoBack();

        // Сброс на начальное состояние после успешной отправки
        dispatch(ActionCreator.resetReviewState());
      })
      .catch((err) => {
        dispatch(ActionCreator.sendReviewError(true));
        dispatch(ActionCreator.sendReviewSuccess(false));
        throw err;
      });
  }
};

const reducer = (
    state: ReviewState = initialState,
    {type, payload}: ActionObject<typeof payload>
): object => {
  switch (type) {
    case ActionType.SEND_REVIEW:
      return extend(state, {
        isSendingReview: payload,
      });
    case ActionType.SEND_REVIEW_ERROR:
      return extend(state, {
        isSendReviewError: payload,
      });
    case ActionType.SEND_REVIEW_SUCCESS:
      return extend(state, {
        isSendReviewSuccess: payload,
      });
    case ActionType.RESET_REVIEW_STATE:
      return extend(state, payload);

    default:
      return state;
  }
};

export {reducer, Operation, ActionType, ActionCreator};
