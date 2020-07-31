import React from "react";
import renderer from "react-test-renderer";
import {GenresList} from "./genres-list";
import {noop} from "../../utils";

const genres: string[] = [`All Genres`, `Fantasy`, `Thrillers`];

describe(`GenresList component`, () => {
  it(`Render GenresList`, () => {
    const tree = renderer
      .create(
          <GenresList
            currentGenre={`All Genres`}
            genres={genres}
            onGenreLinkClick={noop}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
