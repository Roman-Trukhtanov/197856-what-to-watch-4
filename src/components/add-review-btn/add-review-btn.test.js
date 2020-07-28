import React from "react";
import renderer from "react-test-renderer";
import {AddReviewBtn} from "./add-review-btn";

describe(`AddReviewBtn component`, () => {
  it(`Render AddReviewBtn`, () => {
    const tree = renderer
      .create(<AddReviewBtn
        onAddReviewBtnClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
