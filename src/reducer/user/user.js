import modelUser from "../model-user";
import {extend} from "../../utils";
import {AuthorizationStatus} from '../../const.js';
import {ActionCreator as ScreenActionCreator} from "../screen/screen";
import {getPrevScreen} from "../screen/selectors";

const initialState = {
  authorizationError: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {
    id: 0,
    name: ``,
    email: ``,
    avatarSrc: ``,
  },
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  ERROR_AUTHORIZATION: `SET_ERROR`,
  SET_USER_DATA: `SET_USER_DATA`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  errorAuthorization: (error) => {
    return {
      type: ActionType.ERROR_AUTHORIZATION,
      payload: error,
    };
  },

  setUserData: (userData) => {
    return {
      type: ActionType.SET_USER_DATA,
      payload: userData,
    };
  },
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.errorAuthorization(false));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserData(modelUser(response.data)));

        // Возвращаем пользователя на экран, с которого был осуществлен переход на страницу с регистрацией
        dispatch(ScreenActionCreator.changeScreen(getPrevScreen(getState())));
      })
      .catch((err) => {
        dispatch(ActionCreator.errorAuthorization(true));
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });

    case ActionType.ERROR_AUTHORIZATION:
      return extend(state, {
        authorizationError: action.payload,
      });

    case ActionType.SET_USER_DATA:
      return extend(state, {
        user: action.payload,
      });

    default:
      return state;
  }
};

export {reducer, Operation, ActionType, ActionCreator};
