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
  const {previewVideo, previewImgSrc} = videoMock;

  const tree = renderer.create((
    <MockComponentWrapped
      isPlaying={true}
      previewImgSrc={previewImgSrc}
      videoData={previewVideo}
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
