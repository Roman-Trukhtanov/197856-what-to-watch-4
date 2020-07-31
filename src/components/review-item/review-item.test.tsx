import React from "react";
import renderer from "react-test-renderer";
import ReviewItem from "./review-item";
import {Comment} from "../../types";

const mockCommentData: Comment[] = [{
  id: 1,
  user: {
    id: 2,
    name: `Other user`,
  },
  rating: 7.2,
  comment: `Other comment`,
  date: ``,
  dateText: `June 20, 2020`,
}];

describe(`ReviewItem component`, () => {
  it(`Render ReviewItem`, () => {
    const tree = renderer
      .create(<ReviewItem
        comment={mockCommentData[0]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
