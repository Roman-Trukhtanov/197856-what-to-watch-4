import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";

configure({
  adapter: new Adapter(),
});

const moviesMock = {
  id: 0,
  title: `Кремниевая долина`,
  preview: `http://placeimg.com/280/175/any`,
};

const mockEvent = {
  preventDefault() {}
};

describe(`MovieCard component`, () => {
  it(`Click, MouseEnter, MouseLeave functions should be called`, () => {
    const onMovieCardTitleClick = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const movie = {
      id: 0,
      title: `Кремниевая долина`,
      preview: `http://placeimg.com/280/175/any`,
    };

    const MovieCardItem = shallow(
        <MovieCard
          movie={moviesMock}
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

    expect(onMouseEnter.mock.calls[0][0]).toMatchObject(movie);

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});
