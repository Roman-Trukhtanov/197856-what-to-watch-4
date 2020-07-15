import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import moviesData from "../../mocks/movies";
import {movieComments} from "../../mocks/movie-comments";
import {ScreenType} from "../../mocks/const";

const mockStore = configureStore([]);

const promoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `drama`,
  year: 2014
};

describe(`App component`, () => {
  it(`Render App`, () => {
    const store = mockStore({
      screen: ScreenType.MAIN,
      currentGenre: `All Genres`,
      filteredMovies: moviesData,
      movieCollectionNumber: 1,
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              promoMovieData={promoMovie}
              movies={moviesData}
              movieComments={movieComments}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
