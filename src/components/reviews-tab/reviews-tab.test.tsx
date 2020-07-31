import React from "react";
import renderer from "react-test-renderer";
import {ReviewsTab} from "./reviews-tab";
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

describe(`ReviewsTab component`, () => {
  it(`Render ReviewsTab`, () => {
    const tree = renderer
      .create(<ReviewsTab
        movieComments={mockCommentData}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
