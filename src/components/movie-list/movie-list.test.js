import React from "react";
import renderer from "react-test-renderer";
import MovieList from "./movie-list";
import moviesData from "../../mocks/movies";

describe(`MovieList component`, () => {
  it(`Render MovieList`, () => {
    const tree = renderer
      .create(<MovieList
        movies={moviesData}
        onMovieCardTitleClick={() => {}}
        activePlayerId={0}
        renderVideo={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
