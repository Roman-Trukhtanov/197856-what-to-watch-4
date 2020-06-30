import React from "react";
import renderer from "react-test-renderer";
import MovieList from "./movie-list";

const moviesMock = [
  {
    id: 0,
    title: `Кремниевая долина`,
    preview: `http://placeimg.com/280/175/any`,
  },
  {
    id: 1,
    title: `Форсаж`,
    preview: `http://placeimg.com/280/175/any`,
  },
  {
    id: 2,
    title: `Жажда скорости`,
    preview: `http://placeimg.com/280/175/any`,
  },
  {
    id: 3,
    title: `Гарри Поттер`,
    preview: `http://placeimg.com/280/175/any`,
  },
  {
    id: 4,
    title: `Спецназ`,
    preview: `http://placeimg.com/280/175/any`,
  },
  {
    id: 5,
    title: `Игра престолов`,
    preview: `http://placeimg.com/280/175/any`,
  },
  {
    id: 6,
    title: `Стрела`,
    preview: `http://placeimg.com/280/175/any`,
  },
  {
    id: 7,
    title: `Флэш`,
    preview: `http://placeimg.com/280/175/any`,
  },
];

describe(`MovieList component`, () => {
  it(`Render MovieList`, () => {
    const tree = renderer
      .create(<MovieList
        movies={moviesMock}
        onMovieCardTitleClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
