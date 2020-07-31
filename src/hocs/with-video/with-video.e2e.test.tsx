import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideo from "./with-video";
import {Movie} from "../../types";

const mockMovieData: Movie = {
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

interface Props {
  children: React.ReactNode | React.ReactNodeArray;
  onPlayBtnClick?: () => void;
}

const Player = (props: Props): React.ReactNode => {
  const {onPlayBtnClick, children} = props;
  return (
    <div>
      <button type="button" onClick={onPlayBtnClick}/>
      {children}
    </div>
  );
};

it(`Checks that after 1 second the video started (with autoplay)`, () => {
  jest.clearAllMocks();
  jest.useFakeTimers();

  const PlayerWrapped = withVideo(Player);

  const {previewVideo, previewImgSrc} = mockMovieData;

  mount(<PlayerWrapped
    isStartPlaying={false}
    previewImgSrc={previewImgSrc}
    videoData={previewVideo}
  />);

  const mediaElement = window.HTMLMediaElement.prototype;

  jest.spyOn(mediaElement, `play`).mockImplementation(() => Promise.resolve());

  jest.advanceTimersByTime(1000);

  expect(mediaElement.play).toHaveBeenCalledTimes(1);
});

it(`Checks that after 1 second the video did not play (without autoplay)`, () => {
  jest.clearAllMocks();
  jest.useFakeTimers();

  const PlayerWrapped = withVideo(Player);

  const {fullVideo, previewImgSrc} = mockMovieData;

  mount(<PlayerWrapped
    isStartPlaying={false}
    previewImgSrc={previewImgSrc}
    videoData={fullVideo}
  />);

  const mediaElement = window.HTMLMediaElement.prototype;

  jest.spyOn(mediaElement, `play`).mockImplementation(() => Promise.resolve());

  jest.advanceTimersByTime(1000);

  expect(mediaElement.play).toHaveBeenCalledTimes(0);
});

it(`Checks that HOC's callback turn on video (play)`, () => {
  jest.clearAllMocks();
  const PlayerWrapped = withVideo(Player);

  const {previewVideo, previewImgSrc} = mockMovieData;

  const wrapper = mount(<PlayerWrapped
    isStartPlaying={false}
    previewImgSrc={previewImgSrc}
    videoData={previewVideo}
  />);

  const mediaElement = window.HTMLMediaElement.prototype;

  jest.spyOn(mediaElement, `play`).mockImplementation(() => Promise.resolve());

  wrapper.find(`button`).simulate(`click`);

  expect(mediaElement.play).toHaveBeenCalledTimes(1);
});

it(`Checks that HOC's callback turn off video (pause)`, () => {
  jest.clearAllMocks();
  const PlayerWrapped = withVideo(Player);

  const {previewVideo, previewImgSrc} = mockMovieData;

  window.HTMLMediaElement.prototype.play = () => Promise.resolve();

  const wrapper = mount(<PlayerWrapped
    isStartPlaying={true}
    previewImgSrc={previewImgSrc}
    videoData={previewVideo}
  />);

  const mediaElement = window.HTMLMediaElement.prototype;

  jest.spyOn(mediaElement, `pause`).mockImplementation(() => Promise.resolve());

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(mediaElement.pause).toHaveBeenCalledTimes(1);
});
