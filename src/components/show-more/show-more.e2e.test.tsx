import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ShowMore} from "./show-more";

configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {
    return;
  }
};

describe(`GenresList component`, () => {
  it(`GenresList function should be called`, () => {
    const onShowMoreBtnClick = jest.fn();

    const ShowMoreItem = shallow(
        <ShowMore
          onShowMoreBtnClick={onShowMoreBtnClick}
        />
    );

    const showMoreBtn = ShowMoreItem.find(`.catalog__button`);

    showMoreBtn.simulate(`click`, mockEvent);

    expect(onShowMoreBtnClick.mock.calls.length).toBe(1);
  });
});
