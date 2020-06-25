import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";
import promoMovie from "./mocks/promo-movie";
import movies from './mocks/movies';

const rootElement = document.querySelector(`#root`);

const init = () => {
  ReactDOM.render(
      <App
        promoMovieData={promoMovie}
        movies={movies}
      />,
      rootElement
  );
};

init();
