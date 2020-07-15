import React from "react";
import renderer from "react-test-renderer";
import Header from "./header";

describe(`Header component`, () => {
  it(`Render Header`, () => {
    const tree = renderer
      .create(<Header/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
