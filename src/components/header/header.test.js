import React from "react";
import renderer from "react-test-renderer";
import Header from "./header";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus, ScreenType} from "../../const";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe(`Header component`, () => {
  it(`Render Header`, () => {
    const store = mockStore({
      [NameSpace.SCREEN]: {
        screen: ScreenType.MAIN,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: {
          id: 0,
          name: `Joe John`,
          email: `test@site.com`,
          avatarSrc: `avatarSrc`,
        }
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <Header/>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
