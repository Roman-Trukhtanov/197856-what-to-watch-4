import React from "react";
import renderer from "react-test-renderer";
import FullVideoPlayer from "./full-video-player";
import {noop} from "../../utils";

describe(`FullVideoPlayer component`, () => {
  it(`Render FullVideoPlayer`, () => {
    const tree = renderer
      .create(
          <FullVideoPlayer
            title={`Some title`}
            isPlayingReal={true}
            onPlayBtnClick={noop}
            onFullScreenBtnClick={noop}
            timeElapsed={100}
            percentProgress={30}
          >
            <video/>
          </FullVideoPlayer>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
