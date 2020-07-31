import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import {createAPI} from "./api";
import {AppRoute, AuthorizationStatus} from "./const";
import reducer from "./reducer/reducer";
import {Operation as DataOperation} from "./reducer/data/data";
import {ActionCreator as UserActionCreator} from "./reducer/user/user";

import history from "./history";
import App from "./components/app/app";
import ShowError from "./components/show-error/show-error";

import {AxiosInstance} from "axios";

const rootElement = document.querySelector(`#root`);

const onUnauthorized = (): void => {
  store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  history.push(AppRoute.SIGN_IN);
};

const api: AxiosInstance = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;

const initApp = (): void => {
  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      rootElement
  );
};

const showError = (err: Error): void => {
  ReactDOM.render(
      <ShowError errorMessage={err}/>,
      rootElement
  );
};

const asyncOperations = [
  store.dispatch(DataOperation.loadPromoMovie()),
  store.dispatch(DataOperation.loadMovies()),
];

Promise.all(asyncOperations).then(() => {
  initApp();
}).catch((err) => {
  showError(err);
  throw err;
});

