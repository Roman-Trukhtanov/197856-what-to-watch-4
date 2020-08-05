import React from "react";
import renderer from "react-test-renderer";
import MovieNav from "./movie-nav";
import {TabType} from "../../const";
import {noop} from "../../utils";

describe(`MovieNav component`, () => {
  it(`Render MovieNav`, () => {
    const tree = renderer
      .create(<MovieNav
        currentTab={TabType.OVERVIEW}
        onNavItemClick={noop}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
