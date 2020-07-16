import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import MainMovieCard from "./main-movie-card";

const mockStore = configureStore([]);

describe(`MainMovieCard component`, () => {
  it(`Render MainMovieCard`, () => {
    const store = mockStore({});

    const tree = renderer
      .create(
          <Provider store={store}>
            <MainMovieCard
              title={`The Grand Budapest Hotel`}
              genre={`Thrillers`}
              year={2020}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
