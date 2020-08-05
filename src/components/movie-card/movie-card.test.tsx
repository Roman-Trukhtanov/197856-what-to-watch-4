import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card";
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

const getVideo = () => <video/>;

describe(`MovieCard component`, () => {
  it(`Render MovieCard`, () => {
    const tree = renderer
      .create(<MovieCard
        movie={mockMovieData[0]}
        onMovieCardTitleClick={noop}
        onMouseEnter={noop}
        onMouseLeave={noop}
        renderVideo={getVideo}
        activePlayerId={0}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
