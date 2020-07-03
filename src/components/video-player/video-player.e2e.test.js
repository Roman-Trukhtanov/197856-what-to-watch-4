import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player";
import movies from "../../mocks/movies";

Enzyme.configure({adapter: new Adapter()});

const videoMock = movies[0];

describe(`VideoPlayer component`, () => {
  it(`should contain the playback state`, () => {
    const VideoPlayerWrapped = shallow(<VideoPlayer
      isPlaying={true}
      videoType={videoMock.videoType}
      videoSrc={videoMock.videoSrc}
      preview={videoMock.preview}
    />, {
      disableLifecycleMethods: true,
    });

    expect(VideoPlayerWrapped.state(`isPlaying`)).toBe(true);
  });

  it(`should contain the pause state`, () => {
    const VideoPlayerWrapped = shallow(<VideoPlayer
      isPlaying={false}
      videoType={videoMock.videoType}
      videoSrc={videoMock.videoSrc}
      preview={videoMock.preview}
    />, {
      disableLifecycleMethods: true,
    });

    expect(VideoPlayerWrapped.state(`isPlaying`)).toBe(false);
  });
});
