import React from "react";
import renderer from "react-test-renderer";
import ReviewsTab from "./reviews-tab";

const mockCommentData = [{
  id: 1,
  user: {
    id: 2,
    name: `Other user`,
  },
  rating: 7.2,
  comment: `Other comment`,
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
