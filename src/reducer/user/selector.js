import NameSpace from '../name-space.js';

export const getAuthStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

export const getAuthError = (state) => {
  return state[NameSpace.USER].authorizationError;
};

export const getUserData = (state) => {
  return state[NameSpace.USER].user;
};
