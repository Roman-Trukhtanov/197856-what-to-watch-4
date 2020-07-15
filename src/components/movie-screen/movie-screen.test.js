import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import MovieScreen from "./movie-screen";
import moviesData from "../../mocks/movies";
import {
  movieComments,
} from "../../mocks/movie-comments";
import {GenreType} from "../../mocks/const";

const mockStore = configureStore([]);

describe(`MovieScreen component`, () => {
  it(`Render MovieScreen`, () => {
    const store = mockStore({});

    const tree = renderer
      .create(
          <Provider store={store}>
            <MovieScreen
              movies={moviesData.filter((movie) => movie.genre === GenreType.FANTASY)}
              movie={moviesData[0]}
              movieComments={movieComments[0]}
              onMovieCardTitleClick={() => {}}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
