import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import SighIn from './sign-in';
import {ScreenType} from "../../const";

const mockStore = configureStore([]);

describe(`SignIn component`, () => {
  it(`Render, no error authorization`, () => {
    const store = mockStore({
      [NameSpace.SCREEN]: {
        screen: `/sign-in`,
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <SighIn />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render, is error authorization`, () => {
    const store = mockStore({
      [NameSpace.SCREEN]: {
        screen: ScreenType.SIGN_IN,
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: true,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <SighIn />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
