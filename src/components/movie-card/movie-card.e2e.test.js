import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";

configure({
  adapter: new Adapter(),
});

const mockMovieData = {
  id: 1,
  title: `Snatch`,
  genre: `Comedy`,
  bgColor: `#FDFDFC`,
  coverSrc: `https://some-link`,
  bigPosterSrc: `https://some-link`,
  previewImgSrc: `https://some-link`,
  isFavorite: false,
  fullVideo: {
    className: `player__video`,
    src: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
    type: `video/mp4`,
    isAutoPlay: true,
    isLoop: false,
    isMute: false,
  },
  previewVideo: {
    src: `https://some-link`,
    type: `video/mp4`,
    isAutoPlay: true,
    isLoop: true,
    isMute: true,
  },
  details: {
    rate: 3,
    releaseYear: 2000,
    ratingCount: 100,
    level: `Bad`,
    description: `Description`,
    director: `Guy Ritchie`,
    runTime: 104,
    starring: [`Jason Statham`, `Brad Pitt`, `Benicio Del Toro`],
  },
};

const mockEvent = {
  preventDefault() {}
};

describe(`MovieCard component`, () => {
  it(`Click, MouseEnter, MouseLeave functions should be called`, () => {
    const onMovieCardTitleClick = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const renderVideo = jest.fn();
    const activePlayerId = mockMovieData.id;

    window.scrollTo = jest.fn();

    const MovieCardItem = mount(
        <MovieCard
          movie={mockMovieData}
          onMovieCardTitleClick={onMovieCardTitleClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          activePlayerId={activePlayerId}
          renderVideo={renderVideo}
        />
    );

    const cardLink = MovieCardItem.find(`.small-movie-card__link`);
    const cardImageWrap = MovieCardItem.find(`.small-movie-card__image`);

    cardLink.simulate(`click`, mockEvent);
    cardImageWrap.simulate(`click`, mockEvent);

    expect(onMovieCardTitleClick.mock.calls.length).toBe(2);

    const cardItem = MovieCardItem.find(`.small-movie-card`);

    cardItem.simulate(`mouseenter`, mockEvent);
    cardItem.simulate(`mouseleave`, mockEvent);

    expect(onMouseEnter).toHaveBeenCalledTimes(1);

    expect(onMouseEnter.mock.calls[0][0]).toMatchObject(mockMovieData);

    expect(onMouseLeave).toHaveBeenCalledTimes(1);

    expect(renderVideo).toHaveBeenCalledTimes(1);
  });
});
