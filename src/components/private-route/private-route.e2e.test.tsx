import React from "react";
import {configure, mount} from "enzyme";
import {Router} from "react-router-dom";
import Adapter from "enzyme-adapter-react-16";
import {PrivateRoute} from "./private-route";
import {AuthorizationStatus} from "../../const";
import {createBrowserHistory, History} from "history";

configure({
  adapter: new Adapter(),
});

describe(`PrivateRoute component`, () => {
  it(`should redirect to login if user is not authenticated`, () => {
    const MockComponent = <div>AComponent</div>;
    const privatePath = `/private`;
    const signInPath = `/login`;

    const history = createBrowserHistory();

    const enzymeWrapper = mount(
        <Router
          history={history}
        >
          <PrivateRoute
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            exact
            path={privatePath}
            render={() => MockComponent}
          />
        </Router>
    );

    history.push(privatePath);

    const historyData: History = enzymeWrapper.find(`Router`).prop(`history`);

    expect(historyData.location.pathname).toBe(signInPath);
  });

  it(`should redirect to private if user is authenticated`, () => {
    const MockComponent = <div>AComponent</div>;
    const history = createBrowserHistory();
    const url = `/private`;

    const enzymeWrapper = mount(
        <Router
          history={history}
        >
          <PrivateRoute
            authorizationStatus={AuthorizationStatus.AUTH}
            exact
            path={url}
            render={() => MockComponent}
          />
        </Router>
    );

    history.push(url);

    const historyData: History = enzymeWrapper.find(`Router`).prop(`history`);

    expect(historyData.location.pathname).toBe(url);
  });
});
