import React from "react";
import renderer from "react-test-renderer";
import DetailsTab from "./details-tab";
import {moviesDetails} from "../../mocks/movies-data";

describe(`DetailsTab component`, () => {
  it(`Render DetailsTab`, () => {
    const tree = renderer
      .create(<DetailsTab
        movieDetails={moviesDetails[0]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
