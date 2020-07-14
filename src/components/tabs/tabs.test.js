import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs";
import {movieComments} from "../../mocks/movie-comments";
import moviesData from "../../mocks/movies";

describe(`Tabs component`, () => {
  it(`Render Tabs`, () => {
    const tree = renderer
      .create(<Tabs
        movie={moviesData[0]}
        movieComments={movieComments[0]}
        onItemClick={() => {}}
        activeItem={``}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
