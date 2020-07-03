import React from "react";
import renderer from "react-test-renderer";
import MovieScreen from "./movie-screen";
import movies from "../../mocks/movies";
import {
  movieInfo,
  moviesOverview,
  moviesDetails,
  moviesComments,
} from "../../mocks/movies-data";
import {GenreType} from "../../mocks/movies";

describe(`MovieScreen component`, () => {
  it(`Render MovieScreen`, () => {
    const tree = renderer
      .create(<MovieScreen
        movies={movies.filter((movie) => movie.genre === GenreType.FANTASY)}
        movieInfo={movieInfo[0]}
        movieOverview={moviesOverview[0]}
        movieDetails={moviesDetails[0]}
        movieComments={moviesComments[0]}
        onMovieCardTitleClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
