import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player";

describe(`VideoPlayer component`, () => {
  it(`Render VideoPlayer`, () => {
    const tree = renderer
      .create(
          <VideoPlayer>
            <video />
          </VideoPlayer>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
