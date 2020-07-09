import React from "react";
import renderer from "react-test-renderer";
import {ShowMore} from "./show-more";

describe(`ShowMore component`, () => {
  it(`Render ShowMore`, () => {
    const tree = renderer
      .create(
          <ShowMore
            onShowMoreBtnClick={() => {}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
