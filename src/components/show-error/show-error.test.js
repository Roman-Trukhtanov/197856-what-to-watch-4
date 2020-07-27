import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import ShowError from "./show-error";
import history from "../../history";
// import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

describe(`ShowError component`, () => {
  it(`Render ShowError`, () => {
    const store = mockStore({});

    const tree = renderer.create(
        <Provider store={store}>
          <Router
            history={history}
          >
            <ShowError errorMessage={`404: Page not found...`}/>
          </Router>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
