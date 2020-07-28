import {extend} from "../../utils";
import {ActionCreator as ScreenActionCreator} from "../screen/screen";
import {Operation as DataOperation} from "../data/data";
import {getPrevScreen} from "../screen/selectors";

const initialState = {
  isSendingReview: false,
  isSendReviewError: false,
  isSendReviewSuccess: false,
};

const ActionType = {
  SEND_REVIEW: `SEND_REVIEW`,
  SEND_REVIEW_ERROR: `SEND_COMMENT_ERROR`,
  SEND_REVIEW_SUCCESS: `SEND_REVIEW_SUCCESS`,
  RESET_REVIEW_STATE: `RESET_REVIEW_STATE`,
};

const ActionCreator = {
  sendingReview: (flag) => ({
    type: ActionType.SEND_REVIEW,
    payload: flag,
  }),

  sendReviewError: (error) => ({
    type: ActionType.SEND_REVIEW_ERROR,
    payload: error,
  }),

  sendReviewSuccess: () => ({
    type: ActionType.SEND_REVIEW_SUCCESS,
    payload: true,
  }),

  resetReviewState: () => ({
    type: ActionType.RESET_REVIEW_STATE,
    payload: initialState,
  })
};

const Operation = {
  sendReview: (movieID, review) => (dispatch, getState, api) => {
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
        dispatch(ScreenActionCreator.changeScreen(getPrevScreen(getState())));

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SEND_REVIEW:
      return extend(state, {
        isSendingReview: action.payload,
      });
    case ActionType.SEND_REVIEW_ERROR:
      return extend(state, {
        isSendReviewError: action.payload,
      });
    case ActionType.SEND_REVIEW_SUCCESS:
      return extend(state, {
        isSendReviewSuccess: action.payload,
      });
    case ActionType.RESET_REVIEW_STATE:
      return extend(state, action.payload);

    default:
      return state;
  }
};

export {reducer, Operation, ActionType, ActionCreator};
