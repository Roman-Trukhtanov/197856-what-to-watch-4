import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {GenresList} from "./genres-list";

configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {
    return;
  }
};

const genres: string[] = [`All Genres`, `Fantasy`, `Thrillers`];

describe(`GenresList component`, () => {
  it(`GenresList function should be called`, () => {
    const onGenreLinkClick = jest.fn();

    const GenresListItem = shallow(
        <GenresList
          genres={genres}
          currentGenre={genres[0]}
          onGenreLinkClick={onGenreLinkClick}
        />
    );

    const genreLink = GenresListItem.find(`.catalog__genres-link`);
    const genreLinkItem = genreLink.at(0);

    genreLinkItem.simulate(`click`, mockEvent);

    expect(onGenreLinkClick.mock.calls.length).toBe(1);
  });
});
