import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

Enzyme.configure({
  adapter: new Adapter(),
});

const promoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `drama`,
  year: 2014
};

const movieTitles = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

describe(`Main component`, () => {
  it(`Should card title be pressed`, () => {
    const onMovieCardTitleClick = jest.fn();

    const MainScreen = shallow(
        <Main
          promoMovieData={promoMovie}
          movieTitles={movieTitles}
          onMovieCardTitleClick={onMovieCardTitleClick}
        />
    );

    const cardTitles = MainScreen.find(`.small-movie-card__link`);

    if (!cardTitles.length) {
      return Promise.reject();
    }

    for (const cardTitle of cardTitles) {
      cardTitle.props.onClick();
    }

    expect(onMovieCardTitleClick.mock.calls.length).toBe(cardTitles.length);

    return Promise.resolve();
  });
});
