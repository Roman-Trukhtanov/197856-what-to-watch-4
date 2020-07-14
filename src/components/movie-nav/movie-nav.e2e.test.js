import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieNav from "./movie-nav";
import {TabType} from "../../mocks/const";

configure({
  adapter: new Adapter(),
});

const currentTab = TabType.OVERVIEW;

describe(`MovieNav component`, () => {
  it(`Click function should be called`, () => {
    const onNavItemClick = jest.fn();
    const targetTab = TabType.OVERVIEW;

    const MovieNavItem = shallow(
        <MovieNav
          currentTab={currentTab}
          onNavItemClick={onNavItemClick}
        />
    );

    const navLinks = MovieNavItem.find(`.movie-nav__link`);
    const navLinkItem = navLinks.at(0);

    navLinkItem.props().onClick();

    expect(onNavItemClick.mock.calls.length).toBe(1);

    expect(onNavItemClick.mock.calls[0][1]).toMatch(targetTab);
  });
});
