import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player";
import withVideo from "../../hocs/with-video/with-video";
import {Movie} from "../../types";

const VideoPlayerWrapped = withVideo(VideoPlayer);

Enzyme.configure({adapter: new Adapter()});

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
    isAutoPlay: true,
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

describe(`VideoPlayer component`, () => {
  it(`should contain the playback state`, () => {
    const {previewVideo} = mockMovieData;

    const VideoPlayerMount = shallow(<VideoPlayerWrapped
      isStartPlaying={true}
      previewImgSrc={mockMovieData.previewImgSrc}
      videoData={previewVideo}
    />, {
      disableLifecycleMethods: true,
    });

    expect(VideoPlayerMount.state(`isPlaying`)).toBe(true);
  });

  it(`should contain the pause state`, () => {
    const {previewVideo} = mockMovieData;

    const VideoPlayerMount = shallow(<VideoPlayerWrapped
      isStartPlaying={false}
      previewImgSrc={mockMovieData.previewImgSrc}
      videoData={previewVideo}
    />, {
      disableLifecycleMethods: true,
    });

    expect(VideoPlayerMount.state(`isPlaying`)).toBe(false);
  });
});
