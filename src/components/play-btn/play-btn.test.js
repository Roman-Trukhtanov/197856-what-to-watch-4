import React from "react";
import renderer from "react-test-renderer";
import {PlayBtn} from "./play-btn";

describe(`PlayBtn component`, () => {
  it(`Render PlayBtn`, () => {
    const tree = renderer
      .create(<PlayBtn
        onPlayBtnClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
