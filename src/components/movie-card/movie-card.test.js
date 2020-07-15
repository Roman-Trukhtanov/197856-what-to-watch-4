import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card";
import moviesData from "../../mocks/movies";

describe(`MovieCard component`, () => {
  it(`Render MovieCard`, () => {
    const tree = renderer
      .create(<MovieCard
        movie={moviesData[0]}
        onMovieCardTitleClick={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        renderVideo={() => {}}
        activePlayerId={0}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
