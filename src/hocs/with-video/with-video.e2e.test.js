import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideo from "./with-video.js";

const mockMovieData = {
  id: 1,
  title: `Snatch`,
  genre: `Comedy`,
  bgColor: `#FDFDFC`,
  coverSrc: `https://some-link`,
  bigPosterSrc: `https://some-link`,
  previewImgSrc: `https://some-link`,
  isFavorite: false,
  fullVideo: {
    className: `player__video`,
    src: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
    type: `video/mp4`,
    isAutoPlay: false,
    isLoop: false,
    isMute: false,
  },
  previewVideo: {
    src: `https://some-link`,
    type: `video/mp4`,
    isAutoPlay: true,
    isLoop: true,
    isMute: true,
  },
  details: {
    rate: 3,
    releaseYear: 2000,
    ratingCount: 100,
    level: `Bad`,
    description: `Description`,
    director: `Guy Ritchie`,
    runTime: 104,
    starring: [`Jason Statham`, `Brad Pitt`, `Benicio Del Toro`],
  },
};

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

it(`Checks that after 1 second the video started (with autoplay)`, () => {
  jest.useFakeTimers();

  const PlayerWrapped = withVideo(Player);

  const {previewVideo, previewImgSrc} = mockMovieData;

  const wrapper = mount(<PlayerWrapped
    isStartPlaying={false}
    previewImgSrc={previewImgSrc}
    videoData={previewVideo}
  />);

  window.HTMLMediaElement.prototype.play = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `play`);

  jest.advanceTimersByTime(1000);

  expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
});

it(`Checks that after 1 second the video did not play (without autoplay)`, () => {
  jest.useFakeTimers();

  const PlayerWrapped = withVideo(Player);

  const {fullVideo, previewImgSrc} = mockMovieData;

  const wrapper = mount(<PlayerWrapped
    isStartPlaying={false}
    previewImgSrc={previewImgSrc}
    videoData={fullVideo}
  />);

  window.HTMLMediaElement.prototype.play = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `play`);

  jest.advanceTimersByTime(1000);

  expect(_videoRef.current.play).toHaveBeenCalledTimes(0);
});

it(`Checks that HOC's callback turn on video (play)`, () => {
  const PlayerWrapped = withVideo(Player);

  const {previewVideo, previewImgSrc} = mockMovieData;

  const wrapper = mount(<PlayerWrapped
    isStartPlaying={false}
    previewImgSrc={previewImgSrc}
    videoData={previewVideo}
  />);

  window.HTMLMediaElement.prototype.play = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `play`);

  wrapper.find(`button`).simulate(`click`);

  expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
});

it(`Checks that HOC's callback turn off video (pause)`, () => {
  const PlayerWrapped = withVideo(Player);

  const {previewVideo, previewImgSrc} = mockMovieData;

  window.HTMLMediaElement.prototype.play = () => {};
  window.HTMLMediaElement.prototype.pause = () => {};

  const wrapper = mount(<PlayerWrapped
    isStartPlaying={true}
    previewImgSrc={previewImgSrc}
    videoData={previewVideo}
  />);

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `pause`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(_videoRef.current.pause).toHaveBeenCalledTimes(1);
});
