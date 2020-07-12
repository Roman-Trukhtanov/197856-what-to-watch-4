import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs";
import {
  moviesComments,
  moviesDetails,
  moviesOverview
} from "../../mocks/movies-data";

describe(`Tabs component`, () => {
  it(`Render Tabs`, () => {
    const tree = renderer
      .create(<Tabs
        movieOverview={moviesOverview[0]}
        movieDetails={moviesDetails[0]}
        movieComments={moviesComments[0]}
        onItemClick={() => {}}
        activeItem={``}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
