import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import Footer from "./footer";
import history from "../../history";

describe(`Footer component`, () => {
  it(`Render Footer`, () => {
    const tree = renderer
      .create(
          <Router
            history={history}
          >
            <Footer/>
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
