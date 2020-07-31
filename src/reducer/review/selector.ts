import NameSpace from '../name-space';
import {ReviewState} from "./review";

export const getSendingReview = (state: ReviewState): boolean => {
  return state[NameSpace.REVIEW].isSendingReview;
};

export const getSendReviewError = (state: ReviewState): boolean => {
  return state[NameSpace.REVIEW].isSendReviewError;
};

export const getSendReviewSuccess = (state: ReviewState): boolean => {
  return state[NameSpace.REVIEW].isSendReviewSuccess;
};
