import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";
import {promoMovie} from "./data";

const rootElement = document.querySelector(`#root`);

const init = () => {
  ReactDOM.render(
      <App promoMovieData={promoMovie}/>,
      rootElement
  );
};

init();
