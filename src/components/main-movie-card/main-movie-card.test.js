import React from "react";
import renderer from "react-test-renderer";
import MainMovieCard from "./main-movie-card";

describe(`MainMovieCard component`, () => {
  it(`Render MainMovieCard`, () => {
    const tree = renderer
      .create(<MainMovieCard
        title={`The Grand Budapest Hotel`}
        genre={`Thrillers`}
        year={2020}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
