import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PlayBtn} from "./play-btn";
import history from "../../history";

configure({
  adapter: new Adapter(),
});

const mockMovieData = [{
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
}];

const mockEvent = {
  preventDefault() {}
};

describe(`PlayBtn component`, () => {
  it(`Should enter on the right player url`, () => {
    const mockMovie = mockMovieData[0];

    const targetUrl = `/player/${mockMovie.id}`;

    const PlayBtnItem = shallow(
        <PlayBtn
          movieData={mockMovie}
        />
    );

    const playButton = PlayBtnItem.find(`button`);
    playButton.simulate(`click`, mockEvent);

    expect(history.location.pathname).toBe(targetUrl);
  });
});
