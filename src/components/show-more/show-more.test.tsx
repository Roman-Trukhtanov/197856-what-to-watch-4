import React from "react";
import renderer from "react-test-renderer";
import {ShowMore} from "./show-more";
import {noop} from "../../utils";

describe(`ShowMore component`, () => {
  it(`Render ShowMore`, () => {
    const tree = renderer
      .create(
          <ShowMore
            onShowMoreBtnClick={noop}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
