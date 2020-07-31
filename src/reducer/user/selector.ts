import NameSpace from '../name-space';
import {UserState} from "./user";
import {User} from "../../types";

export const getAuthStatus = (state: UserState): string => {
  return state[NameSpace.USER].authorizationStatus;
};

export const getAuthError = (state: UserState): boolean => {
  return state[NameSpace.USER].authorizationError;
};

export const getUserData = (state: UserState): User => {
  return state[NameSpace.USER].user;
};
