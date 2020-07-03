import React from "react";
import renderer from "react-test-renderer";
import OverviewTab from "./overview-tab";
import {moviesOverview} from "../../mocks/movies-data";

describe(`OverviewTab component`, () => {
  it(`Render OverviewTab`, () => {
    const tree = renderer
      .create(<OverviewTab
        movieOverview={moviesOverview[0]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
