import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";
import promoMovie from "./mocks/promo-movie";
import movies from './mocks/movies';
import {createStore} from "redux";
import {reducer} from "./reducer";
import {Provider} from "react-redux";
import {
  movieInfo,
  moviesOverview,
  moviesDetails,
  moviesComments
} from "./mocks/movies-data";

const rootElement = document.querySelector(`#root`);

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App
          promoMovieData={promoMovie}
          movies={movies}
          movieInfo={movieInfo}
          moviesOverview={moviesOverview}
          moviesDetails={moviesDetails}
          moviesComments={moviesComments}
        />
      </Provider>,
      rootElement
  );
};

init();
