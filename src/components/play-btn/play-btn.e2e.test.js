import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PlayBtn} from "./play-btn";

configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {}
};

describe(`PlayBtn component`, () => {
  it(`Click function should be called`, () => {
    const onPlayBtnClick = jest.fn();

    const PlayBtnItem = shallow(
        <PlayBtn
          onPlayBtnClick={onPlayBtnClick}
        />
    );

    const playButton = PlayBtnItem.find(`button`);

    playButton.simulate(`click`, mockEvent);

    expect(onPlayBtnClick).toHaveBeenCalledTimes(1);
  });
});
