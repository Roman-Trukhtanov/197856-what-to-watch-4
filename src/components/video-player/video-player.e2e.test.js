import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player";
import movies from "../../mocks/movies";
import withVideo from "../../hocs/with-video/with-video";

const VideoPlayerWrapped = withVideo(VideoPlayer);

Enzyme.configure({adapter: new Adapter()});

const videoMock = movies[0];

describe(`VideoPlayer component`, () => {
  it(`should contain the playback state`, () => {
    const VideoPlayerMount = shallow(<VideoPlayerWrapped
      isPlaying={true}
      videoType={videoMock.videoType}
      videoSrc={videoMock.videoSrc}
      preview={videoMock.preview}
      isLoop={videoMock.isLoop}
    />, {
      disableLifecycleMethods: true,
    });

    expect(VideoPlayerMount.state(`isPlaying`)).toBe(true);
  });

  it(`should contain the pause state`, () => {
    const VideoPlayerMount = shallow(<VideoPlayerWrapped
      isPlaying={false}
      videoType={videoMock.videoType}
      videoSrc={videoMock.videoSrc}
      preview={videoMock.preview}
      isLoop={videoMock.isLoop}
    />, {
      disableLifecycleMethods: true,
    });

    expect(VideoPlayerMount.state(`isPlaying`)).toBe(false);
  });
});
