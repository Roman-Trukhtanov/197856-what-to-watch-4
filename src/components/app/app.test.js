import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const promoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `drama`,
  year: 2014
};

const movieTitles = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

describe(`App component`, () => {
  it(`Render App`, () => {
    const tree = renderer
      .create(<App
        promoMovieData={promoMovie}
        movieTitles={movieTitles}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
