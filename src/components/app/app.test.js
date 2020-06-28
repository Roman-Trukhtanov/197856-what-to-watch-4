import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {movieInfo, movieOverview} from "../../mocks/movie-details";

const promoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `drama`,
  year: 2014
};

const movieMock = [
  {
    id: 0,
    title: `Кремниевая долина`,
    preview: `http://placeimg.com/280/175/any`,
  },
];

describe(`App component`, () => {
  it(`Render App`, () => {
    const tree = renderer
      .create(<App
        promoMovieData={promoMovie}
        movies={movieMock}
        movieInfo={movieInfo}
        movieOverview={movieOverview}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
