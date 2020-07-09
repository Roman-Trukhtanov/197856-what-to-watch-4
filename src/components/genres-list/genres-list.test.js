import React from "react";
import renderer from "react-test-renderer";
import {GenresList} from "./genres-list";

const genres = [`All Genres`, `Fantasy`, `Thrillers`];

describe(`GenresList component`, () => {
  it(`Render GenresList`, () => {
    const tree = renderer
      .create(
          <GenresList
            currentGenre={`All Genres`}
            genres={genres}
            onGenreLinkClick={() => {}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
