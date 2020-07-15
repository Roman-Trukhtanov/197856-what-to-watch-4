import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withVideo from "./with-video.js";
import moviesData from "../../mocks/movies";

const videoMock = moviesData[0];

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withVideo(MockComponent);

it(`withAudio is rendered correctly`, () => {
  const {previewVideo} = videoMock;

  const tree = renderer.create((
    <MockComponentWrapped
      isPlaying={true}
      videoType={previewVideo.type}
      videoSrc={previewVideo.src}
      previewImgSrc={videoMock.previewImgSrc}
      isLoop={previewVideo.isLoop}
      isMute={previewVideo.isMute}
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
