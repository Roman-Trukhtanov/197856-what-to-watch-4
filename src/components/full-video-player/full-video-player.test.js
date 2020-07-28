import React from "react";
import renderer from "react-test-renderer";
import FullVideoPlayer from "./full-video-player";

describe(`FullVideoPlayer component`, () => {
  it(`Render FullVideoPlayer`, () => {
    const tree = renderer
      .create(
          <FullVideoPlayer
            prevScreen={``}
            title={`Some title`}
            isPlayingReal={true}
            onPlayBtnClick={() => {}}
            onFullScreenBtnClick={() => {}}
            onPlayerExitBtnClick={() => {}}
            timeElapsed={100}
            percentProgress={30}
          >
            <video/>
          </FullVideoPlayer>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
