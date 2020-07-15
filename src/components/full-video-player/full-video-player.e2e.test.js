import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {FullVideoPlayer} from "./full-video-player";

configure({
  adapter: new Adapter(),
});

describe(`FullVideoPlayer component`, () => {
  it(`Click functions should be called`, () => {
    const onPlayBtnClick = jest.fn();
    const onFullScreenBtnClick = jest.fn();
    const onPlayerExitBtnClick = jest.fn();

    const VideoPlayer = mount(
        <FullVideoPlayer
          prevScreen={`main`}
          title={`Some title`}
          isPlayingReal={true}
          onPlayBtnClick={onPlayBtnClick}
          onFullScreenBtnClick={onFullScreenBtnClick}
          onPlayerExitBtnClick={onPlayerExitBtnClick}
          timeElapsed={100}
          percentProgress={30}
        >
          <video/>
        </FullVideoPlayer>
    );

    const playBtn = VideoPlayer.find(`.player__play`);
    const exitBtn = VideoPlayer.find(`.player__exit`);
    const fullScreenBtn = VideoPlayer.find(`.player__full-screen`);

    playBtn.props().onClick();
    exitBtn.props().onClick();
    fullScreenBtn.props().onClick();

    expect(onPlayBtnClick).toHaveBeenCalledTimes(1);
    expect(onPlayerExitBtnClick).toHaveBeenCalledTimes(1);
    expect(onFullScreenBtnClick).toHaveBeenCalledTimes(1);
  });
});
