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

    const {previewVideo} = videoMock;

    const VideoPlayerMount = shallow(<VideoPlayerWrapped
      isPlaying={true}
      videoType={previewVideo.type}
      videoSrc={previewVideo.src}
      previewImgSrc={videoMock.previewImgSrc}
      isLoop={previewVideo.isLoop}
      isMute={previewVideo.isMute}
    />, {
      disableLifecycleMethods: true,
    });

    expect(VideoPlayerMount.state(`isPlaying`)).toBe(true);
  });

  it(`should contain the pause state`, () => {
    const {previewVideo} = videoMock;

    const VideoPlayerMount = shallow(<VideoPlayerWrapped
      isPlaying={false}
      videoType={previewVideo.type}
      videoSrc={previewVideo.src}
      previewImgSrc={videoMock.previewImgSrc}
      isLoop={previewVideo.isLoop}
      isMute={previewVideo.isMute}
    />, {
      disableLifecycleMethods: true,
    });

    expect(VideoPlayerMount.state(`isPlaying`)).toBe(false);
  });
});
