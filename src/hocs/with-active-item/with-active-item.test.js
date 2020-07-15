import React from "react";
import renderer from "react-test-renderer";
import withActiveItem from "./with-active-item";

const MockComponent = () => {
  return (
    <button type="button"/>
  );
};

const MockComponentWrapped = withActiveItem(MockComponent);

it(`withActiveItem is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      defaultItem={``}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
