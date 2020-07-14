import React from "react";
import renderer from "react-test-renderer";
import ReviewItem from "./review-item";
import {movieComments} from "../../mocks/movie-comments";

describe(`ReviewItem component`, () => {
  it(`Render ReviewItem`, () => {
    const tree = renderer
      .create(<ReviewItem
        comment={movieComments[0].comments[0]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
