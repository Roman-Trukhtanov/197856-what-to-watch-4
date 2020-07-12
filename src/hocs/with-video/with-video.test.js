import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withVideo from "./with-video.js";
import movies from "../../mocks/movies";

const videoMock = movies[0];

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
