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
import {
  ActionCreator as UserActionCreator,
  Operation as UserOperation,
} from "./reducer/user/user";
import {AuthorizationStatus} from "./const";

const rootElement = document.querySelector(`#root`);

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

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

const asyncOperations = [
  store.dispatch(DataOperation.loadPromoMovie()),
  store.dispatch(DataOperation.loadMovies()),
  store.dispatch(UserOperation.checkAuth())
];

Promise.all(asyncOperations).then(() => {
  initApp();
}).catch((err) => {
  showError(err);
  throw err;
});

