import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import allMovies from "../../mocks/movies";
import configureStore from "redux-mock-store";
import Main from "./main";

const mockStore = configureStore([]);

const promoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `drama`,
  year: 2014
};

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

const genres = [`All Genres`, `Fantasy`, `Thrillers`];

describe(`Main component`, () => {
  it(`Render Main`, () => {
    const store = mockStore({
      currentGenre: `All Genres`,
      filteredMovies: allMovies,
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <Main
              filteredMovies={moviesMock}
              promoMovieData={promoMovie}
              genres={genres}
              onMovieCardTitleClick={() => {}}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
