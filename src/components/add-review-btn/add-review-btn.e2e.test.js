import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {AddReviewBtn} from "./add-review-btn";

configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {}
};

describe(`AddReviewBtn component`, () => {
  it(`Click function should be called`, () => {
    const onAddReviewBtnClick = jest.fn();

    const PlayBtnItem = shallow(
        <AddReviewBtn
          onAddReviewBtnClick={onAddReviewBtnClick}
        />
    );

    const playButton = PlayBtnItem.find(`.btn`);

    playButton.simulate(`click`, mockEvent);

    expect(onAddReviewBtnClick).toHaveBeenCalledTimes(1);
  });
});
