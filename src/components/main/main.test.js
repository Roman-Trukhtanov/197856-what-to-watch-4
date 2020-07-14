import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import moviesData from "../../mocks/movies";
import configureStore from "redux-mock-store";
import Main from "./main";

const mockStore = configureStore([]);

const promoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `drama`,
  year: 2014
};

const genres = [`All Genres`, `Fantasy`, `Thrillers`];

describe(`Main component`, () => {
  it(`Render Main`, () => {
    const store = mockStore({
      currentGenre: `All Genres`,
      filteredMovies: moviesData,
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <Main
              filteredMovies={moviesData}
              promoMovieData={promoMovie}
              genres={genres}
              movieCollectionNumber={1}
              onMovieCardTitleClick={() => {}}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
