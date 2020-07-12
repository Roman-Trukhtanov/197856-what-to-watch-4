import React from "react";
import renderer from "react-test-renderer";
import withVideoPlayer from "./with-video-player.js";
import movies from "../../mocks/movies";

const videoMock = movies[0];

const MockComponent = () => {
  return (
    <div/>
  );
};

const MockComponentWrapped = withVideoPlayer(MockComponent);

it(`withVideoPlayer is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      isPlaying={true}
      videoType={videoMock.videoType}
      videoSrc={videoMock.videoSrc}
      preview={videoMock.preview}
      isLoop={videoMock.isLoop}
    />
  ), {
    createNodeMock() {
      return {
        addEventListener() {},
      };
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
