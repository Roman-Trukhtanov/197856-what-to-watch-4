import modelUser from "../model-user";
import {extend} from "../../utils";
import {AuthorizationStatus} from '../../const';
import {historyGoBack} from "../../history";
import {Operation as DataOperation} from "../data/data";
import {Action, ActionObject, User, UserData} from "../../types";
import {AxiosInstance} from "axios";
import {AppDispatch, AppGetState} from "../../index";

export interface UserState {
  authorizationError?: boolean;
  authorizationStatus?: string;
  user?: User;
}

const initialState: UserState = {
  authorizationError: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {
    id: 0,
    name: ``,
    email: ``,
    avatarSrc: ``,
  },
};

const ActionType: Action = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  ERROR_AUTHORIZATION: `SET_ERROR`,
  SET_USER_DATA: `SET_USER_DATA`,
};

const ActionCreator = {
  requireAuthorization: (status: string): ActionObject<string> => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  errorAuthorization: (error: boolean): ActionObject<boolean> => {
    return {
      type: ActionType.ERROR_AUTHORIZATION,
      payload: error,
    };
  },

  setUserData: (userData: User): ActionObject<User> => {
    return {
      type: ActionType.SET_USER_DATA,
      payload: userData,
    };
  },
};

const Operation = {
  checkAuth: () => (dispatch: AppDispatch, getState: AppGetState, api: AxiosInstance) => {
    return api.get(`/login`)
      .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))
      .catch((err) => {
        throw err;
      });
  },

  login: (authData: UserData) => (
      dispatch: AppDispatch,
      getState: AppGetState,
      api: AxiosInstance
  ) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.errorAuthorization(false));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserData(modelUser(response.data)));

        // Загружаем список избранных сразу когда пользователь залогинился
        dispatch(DataOperation.loadFavoriteMovies());

        // Возвращаем пользователя на тот экран, с которого был осуществлен переход на страницу с регистрацией
        historyGoBack();
      })
      .catch((err) => {
        dispatch(ActionCreator.errorAuthorization(true));
        throw err;
      });
  },
};

const reducer = (
    state: UserState = initialState,
    {type, payload}: ActionObject<typeof payload>
) => {
  switch (type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: payload,
      });

    case ActionType.ERROR_AUTHORIZATION:
      return extend(state, {
        authorizationError: payload,
      });

    case ActionType.SET_USER_DATA:
      return extend(state, {
        user: payload,
      });

    default:
      return state;
  }
};

export {reducer, Operation, ActionType, ActionCreator};
