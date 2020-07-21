import React from "react";
import renderer from "react-test-renderer";
import MovieNav from "./movie-nav";
import {TabType} from "../../const";

describe(`MovieNav component`, () => {
  it(`Render MovieNav`, () => {
    const tree = renderer
      .create(<MovieNav
        currentTab={TabType.OVERVIEW}
        onNavItemClick={() =>{}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
