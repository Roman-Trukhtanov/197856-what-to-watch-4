import React from "react";
import renderer from "react-test-renderer";
import DetailsTab from "./details-tab";
import moviesData from "../../mocks/movies";

describe(`DetailsTab component`, () => {
  it(`Render DetailsTab`, () => {
    const tree = renderer
      .create(<DetailsTab
        movie={moviesData[0]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
