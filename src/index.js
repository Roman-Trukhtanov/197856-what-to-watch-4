import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";
import promoMovie from "./mocks/promo-movie";
import movies from './mocks/movies';
import {
  movieInfo,
  moviesOverview,
  moviesDetails,
  moviesComments
} from "./mocks/movies-data";

const rootElement = document.querySelector(`#root`);

const init = () => {
  ReactDOM.render(
      <App
        promoMovieData={promoMovie}
        movies={movies}
        movieInfo={movieInfo}
        moviesOverview={moviesOverview}
        moviesDetails={moviesDetails}
        moviesComments={moviesComments}
      />,
      rootElement
  );
};

init();
