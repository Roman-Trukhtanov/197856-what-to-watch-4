import React from "react";
import renderer from "react-test-renderer";
import ReviewsTab from "./reviews-tab";
import {movieComments} from "../../mocks/movie-comments";

describe(`ReviewsTab component`, () => {
  it(`Render ReviewsTab`, () => {
    const tree = renderer
      .create(<ReviewsTab
        movieComments={movieComments[0]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
