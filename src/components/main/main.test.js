import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const promoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `drama`,
  year: 2014
};

const movieTitles = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

describe(`Main component`, () => {
  it(`Render Main`, () => {
    const tree = renderer
      .create(<Main
        promoMovieData={promoMovie}
        movieTitles={movieTitles}
        onMovieCardTitleClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
