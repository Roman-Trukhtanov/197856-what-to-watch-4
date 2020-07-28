import NameSpace from '../name-space.js';

export const getSendingReview = (state) => {
  return state[NameSpace.REVIEW].isSendingReview;
};

export const getSendReviewError = (state) => {
  return state[NameSpace.REVIEW].isSendReviewError;
};

export const getSendReviewSuccess = (state) => {
  return state[NameSpace.REVIEW].isSendReviewSuccess;
};
