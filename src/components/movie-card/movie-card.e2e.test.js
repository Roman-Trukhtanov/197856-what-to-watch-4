import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";
import movies from "../../mocks/movies";

configure({
  adapter: new Adapter(),
});

const movieMock = movies[0];

const mockEvent = {
  preventDefault() {}
};

describe(`MovieCard component`, () => {
  it(`Click, MouseEnter, MouseLeave functions should be called`, () => {
    const onMovieCardTitleClick = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const MovieCardItem = shallow(
        <MovieCard
          movie={movieMock}
          onMovieCardTitleClick={onMovieCardTitleClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
    );

    const cardLink = MovieCardItem.find(`.small-movie-card__link`);

    cardLink.props().onClick();

    expect(onMovieCardTitleClick.mock.calls.length).toBe(1);

    const cardItem = MovieCardItem.find(`.small-movie-card`);

    cardItem.simulate(`mouseenter`, mockEvent);
    cardItem.simulate(`mouseleave`, mockEvent);

    expect(onMouseEnter).toHaveBeenCalledTimes(1);

    expect(onMouseEnter.mock.calls[0][0]).toMatchObject(movieMock);

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});
