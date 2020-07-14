import React from "react";
import renderer from "react-test-renderer";
import OverviewTab from "./overview-tab";
import moviesData from "../../mocks/movies";

describe(`OverviewTab component`, () => {
  it(`Render OverviewTab`, () => {
    const tree = renderer
      .create(<OverviewTab
        movie={moviesData[0]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
