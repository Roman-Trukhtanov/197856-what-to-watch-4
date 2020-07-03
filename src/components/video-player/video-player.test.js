import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player";
import movies from "../../mocks/movies";

const videoMock = movies[0];

describe(`VideoPlayer component`, () => {
  it(`Render VideoPlayer`, () => {
    const tree = renderer
      .create(<VideoPlayer
        isPlaying={true}
        videoType={videoMock.videoType}
        videoSrc={videoMock.videoSrc}
        preview={videoMock.preview}
      />, {
        createNodeMock(element) {
          if (element.type === `video`) {
            return {
              addEventListener() {},
            };
          }

          return null;
        }
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
