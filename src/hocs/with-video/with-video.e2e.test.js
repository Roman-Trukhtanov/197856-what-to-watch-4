import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideo from "./with-video.js";
import movies from "../../mocks/movies";

const videoMock = movies[0];

configure({adapter: new Adapter()});

const Player = (props) => {
  const {children} = props;
  return (
    <div>
      {children}
    </div>
  );
};

Player.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

it(`Checks that after 1 second the video started`, () => {
  jest.useFakeTimers();

  const PlayerWrapped = withVideo(Player);

  const wrapper = mount(<PlayerWrapped
    isPlaying={true}
    videoType={videoMock.videoType}
    videoSrc={videoMock.videoSrc}
    preview={videoMock.preview}
    isLoop={videoMock.isLoop}
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

  const wrapper = mount(<PlayerWrapped
    isPlaying={false}
    videoType={videoMock.videoType}
    videoSrc={videoMock.videoSrc}
    preview={videoMock.preview}
    isLoop={videoMock.isLoop}
  />);

  window.HTMLMediaElement.prototype.play = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `play`);

  jest.advanceTimersByTime(1000);

  expect(_videoRef.current.play).toHaveBeenCalledTimes(0);
});
