import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";
import promoMovie from "./mocks/promo-movie";
import movies from './mocks/movies';
import {movieInfo, movieOverview} from "./mocks/movie-details";

const rootElement = document.querySelector(`#root`);

const init = () => {
  ReactDOM.render(
      <App
        promoMovieData={promoMovie}
        movies={movies}
        movieInfo={movieInfo}
        movieOverview={movieOverview}
      />,
      rootElement
  );
};

init();
