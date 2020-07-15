import React from "react";
import renderer from "react-test-renderer";
import MovieScreen from "./movie-screen";
import moviesData from "../../mocks/movies";
import {
  movieComments,
} from "../../mocks/movie-comments";
import {GenreType} from "../../mocks/const";

describe(`MovieScreen component`, () => {
  it(`Render MovieScreen`, () => {
    const tree = renderer
      .create(<MovieScreen
        movies={moviesData.filter((movie) => movie.genre === GenreType.FANTASY)}
        movie={moviesData[0]}
        movieComments={movieComments[0]}
        onMovieCardTitleClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
