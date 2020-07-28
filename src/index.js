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
import {ActionCreator as UserActionCreator} from "./reducer/user/user";
import {AppRoute, AuthorizationStatus} from "./const";
import history from "./history";
import ShowError from "./components/show-error/show-error";

const rootElement = document.querySelector(`#root`);

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  history.push(AppRoute.SIGN_IN);
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
      <ShowError errorMessage={err}/>,
      rootElement
  );
};

const asyncOperations = [
  store.dispatch(DataOperation.loadPromoMovie()),
  store.dispatch(DataOperation.loadMovies()),
  store.dispatch(DataOperation.loadFavoriteMovies()),
];

Promise.all(asyncOperations).then(() => {
  initApp();
}).catch((err) => {
  showError(err);
  throw err;
});

