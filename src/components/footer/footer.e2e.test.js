import React from "react";
import {Router} from "react-router-dom";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Footer from "./footer";
import history from "../../history";

configure({
  adapter: new Adapter(),
});

describe(`Footer component`, () => {
  it(`Should enter on the right path`, () => {
    const targetRootUrl = `/`;

    const FooterItem = mount(
        <Router
          history={history}
        >
          <Footer/>
        </Router>
    );

    const logoBtn = FooterItem.find(`.logo__link`).at(0);

    expect(logoBtn.props().to).toBe(targetRootUrl);
  });
});
