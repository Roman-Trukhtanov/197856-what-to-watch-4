import React from "react";
import renderer from "react-test-renderer";
import ReviewsTab from "./reviews-tab";
import {moviesComments} from "../../mocks/movies-data";

describe(`ReviewsTab component`, () => {
  it(`Render ReviewsTab`, () => {
    const tree = renderer
      .create(<ReviewsTab
        movieComments={moviesComments[0]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
