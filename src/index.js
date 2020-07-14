import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";
import promoMovie from "./mocks/promo-movie";
import moviesData from './mocks/movies';
import {createStore} from "redux";
import {reducer} from "./reducer";
import {Provider} from "react-redux";
import {
  movieComments
} from "./mocks/movie-comments";

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
          movies={moviesData}
          movieComments={movieComments}
        />
      </Provider>,
      rootElement
  );
};

init();
