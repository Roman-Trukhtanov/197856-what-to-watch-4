import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import {
  movieInfo,
  moviesOverview,
  moviesDetails,
  moviesComments
} from "../../mocks/movies-data";
import {ScreenType} from "../../mocks/data";

const mockStore = configureStore([]);

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
    const store = mockStore({
      screen: ScreenType.MAIN,
      currentGenre: `All Genres`,
      filteredMovies: movieMock,
      movieCollectionNumber: 1,
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              promoMovieData={promoMovie}
              movies={movieMock}
              movieInfo={movieInfo}
              moviesOverview={moviesOverview}
              moviesDetails={moviesDetails}
              moviesComments={moviesComments}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
