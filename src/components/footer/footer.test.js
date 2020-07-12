import React from "react";
import renderer from "react-test-renderer";
import Footer from "./footer";

describe(`Footer component`, () => {
  it(`Render Footer`, () => {
    const tree = renderer
      .create(<Footer/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
