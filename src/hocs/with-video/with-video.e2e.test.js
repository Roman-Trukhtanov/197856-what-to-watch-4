import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideo from "./with-video.js";
import moviesData from "../../mocks/movies";

const videoMock = moviesData[0];

configure({adapter: new Adapter()});

const Player = (props) => {
  const {onPlayBtnClick, children} = props;
  return (
    <div>
      <button type="button" onClick={onPlayBtnClick}/>
      {children}
    </div>
  );
};

Player.propTypes = {
  onPlayBtnClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

it(`Checks that after 1 second the video started`, () => {
  jest.useFakeTimers();

  const PlayerWrapped = withVideo(Player);

  const {previewVideo, previewImgSrc} = videoMock;

  const wrapper = mount(<PlayerWrapped
    isPlaying={true}
    previewImgSrc={previewImgSrc}
    videoData={previewVideo}
  />);

  window.HTMLMediaElement.prototype.play = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `play`);

  jest.advanceTimersByTime(1000);

  expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
});

it(`Checks that after 1 second the video did not play`, () => {
  jest.useFakeTimers();

  const PlayerWrapped = withVideo(Player);

  const {previewVideo, previewImgSrc} = videoMock;

  const wrapper = mount(<PlayerWrapped
    isPlaying={false}
    previewImgSrc={previewImgSrc}
    videoData={previewVideo}
  />);

  window.HTMLMediaElement.prototype.play = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `play`);

  jest.advanceTimersByTime(1000);

  expect(_videoRef.current.play).toHaveBeenCalledTimes(0);
});

it(`Checks that HOC's callback turn on video (play)`, () => {
  const PlayerWrapped = withVideo(Player);

  const {previewVideo, previewImgSrc} = videoMock;

  const wrapper = mount(<PlayerWrapped
    isPlaying={false}
    previewImgSrc={previewImgSrc}
    videoData={previewVideo}
  />);

  window.HTMLMediaElement.prototype.play = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `play`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
});

it(`Checks that HOC's callback turn off video (pause)`, () => {
  const PlayerWrapped = withVideo(Player);

  const {previewVideo, previewImgSrc} = videoMock;

  const wrapper = mount(<PlayerWrapped
    isPlaying={true}
    previewImgSrc={previewImgSrc}
    videoData={previewVideo}
  />);

  window.HTMLMediaElement.prototype.pause = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `pause`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(_videoRef.current.pause).toHaveBeenCalledTimes(1);
});
