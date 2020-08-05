import React from "react";
import renderer from "react-test-renderer";
import {MyListBtn} from "./my-list-btn";
import {AuthorizationStatus} from "../../const";
import {Movie} from "../../types";
import {noop} from "../../utils";

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

describe(`MyListBtn component`, () => {
  it(`Render MyListBtn`, () => {
    const tree = renderer
      .create(
          <MyListBtn
            promoMovie={mockMovieData[0]}
            movie={mockMovieData[0]}
            authorizationStatus={AuthorizationStatus.AUTH}
            onMyListClick={noop}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
