import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card";

const movieMock = [
  {
    id: 0,
    title: `Кремниевая долина`,
    preview: `http://placeimg.com/280/175/any`,
  },
];

describe(`MovieCard component`, () => {
  it(`Render MovieCard`, () => {
    const tree = renderer
      .create(<MovieCard
        movie={movieMock}
        onMovieCardTitleClick={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
