import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import Header from "./header";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../const";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import history from "../../history";

const mockStore = configureStore([]);

describe(`Header component`, () => {
  it(`Render Header`, () => {
    const store = mockStore({
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
            <Router
              history={history}
            >
              <Header/>
            </Router>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
