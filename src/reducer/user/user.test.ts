import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {AuthorizationStatus} from '../../const';
import {ActionType, Operation, reducer} from './user';
import {ActionObject, User, UserData} from "../../types";
import {noop} from "../../utils";
import {AxiosInstance} from "axios";
import NameSpace from "../name-space";
import modelUser from "../model-user";

const mockUserData: User = {
  id: 1,
  email: `user@site.com`,
  name: `Joe John`,
  avatarSrc: `avatarSrc`,
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

const mockUser: UserData = {
  email: `jon@site.com`,
  password: `password`,
};

const fakeUser = {
  "email": `Oliver.conner@gmail.com`,
  "password": `12345678`,
};

describe(`Operaions User`, () => {
  it(`Should return checkAuth NO_AUTH`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const userCheckAuth = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return userCheckAuth(dispatch, getMockState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: `NO_AUTH`,
        });
      });
  });

  it(`Should make a correct API call to post /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const postFavoriteMovie = Operation.login(mockUser);

    apiMock
      .onPost(`/login`)
      .reply(200, fakeUser);

    return postFavoriteMovie(dispatch, getMockState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.SET_USER_DATA,
          payload: modelUser(fakeUser),
        });
      });
  });
});

describe(`Reducer User`, () => {
  it(`Should return initital state`, () => {
    expect(reducer(undefined, emptyAction)).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authorizationError: false,
      user: {
        id: 0,
        email: ``,
        name: ``,
        avatarSrc: ``,
      },
    });
  });

  it(`Return authorizationStatus after change`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });
  });

  it(`Return authorizationError after change`, () => {
    expect(reducer({
      authorizationError: false,
    }, {
      type: ActionType.ERROR_AUTHORIZATION,
      payload: true,
    })).toEqual({
      authorizationError: true,
    });
  });

  it(`Return user after change`, () => {
    expect(reducer({
      user: {
        id: 0,
        email: ``,
        name: ``,
        avatarSrc: ``,
      },
    }, {
      type: ActionType.SET_USER_DATA,
      payload: mockUserData,
    })).toEqual({
      user: mockUserData,
    });
  });
});


