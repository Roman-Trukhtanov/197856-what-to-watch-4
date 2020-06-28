import React from "react";
import renderer from "react-test-renderer";
import MovieScreen from "./movie-screen";
import {movieInfo, movieOverview} from "../../mocks/movie-details";

describe(`MovieScreen component`, () => {
  it(`Render MovieScreen`, () => {
    const tree = renderer
      .create(<MovieScreen
        movieInfo={movieInfo[0]}
        movieOverview={movieOverview[0]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
