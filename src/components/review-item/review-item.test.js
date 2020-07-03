import React from "react";
import renderer from "react-test-renderer";
import ReviewItem from "./review-item";
import {moviesComments} from "../../mocks/movies-data";

describe(`ReviewItem component`, () => {
  it(`Render ReviewItem`, () => {
    const tree = renderer
      .create(<ReviewItem
        comment={moviesComments[0].comments[0]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
