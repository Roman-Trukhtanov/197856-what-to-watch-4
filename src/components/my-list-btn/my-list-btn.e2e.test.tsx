import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MyListBtn} from "./my-list-btn";
import {AuthorizationStatus} from "../../const";
import {Movie} from "../../types";

configure({
  adapter: new Adapter(),
});

const mockMovieData: Movie[] = [{
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
  preventDefault() {
    return;
  }
};

describe(`MyListBtn component`, () => {
  it(`Click function should be called`, () => {
    const mockMovie = mockMovieData[0];

    const onMyListClick = jest.fn();

    const PlayBtnItem = shallow(
        <MyListBtn
          movie={mockMovie}
          promoMovie={mockMovie}
          authorizationStatus={AuthorizationStatus.AUTH}
          onMyListClick={onMyListClick}
        />
    );

    const myListButton = PlayBtnItem.find(`.movie-card__button`);
    myListButton.simulate(`click`, mockEvent);

    expect(onMyListClick).toHaveBeenCalledTimes(1);
  });
});
