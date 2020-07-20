import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createAPI} from "./api";
import reducer from "./reducer/reducer";
import {Operation as DataOperation} from "./reducer/data/data";

const rootElement = document.querySelector(`#root`);

const api = createAPI(() => {});

window.api = api;

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

const initApp = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      rootElement
  );
};

const showError = (err) => {
  ReactDOM.render(
      <div>
        <p><b>Произошла ошибка.</b> Попробуйте обновить страницу...</p>
        <p><b>Текст ошибки:</b> {err.toString().replace(`Error: `, ``)}</p>
      </div>,
      rootElement
  );
};

const loadedData = [
  store.dispatch(DataOperation.loadPromoMovie()),
  store.dispatch(DataOperation.loadMovies())
];

Promise.all(loadedData).then(() => {
  initApp();
}).catch((err) => {
  showError(err);
  throw err;
});

