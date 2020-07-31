import React from "react";
import {Router} from "react-router-dom";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {AddReviewBtn} from "./add-review-btn";
import history from "../../history";
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

describe(`AddReviewBtn component`, () => {
  it(`Should enter on the right path`, () => {
    const mockMovie = mockMovieData[0];

    const targetReviewUrl = `/films/${mockMovie.id}/review`;

    const AddReviewItem = mount(
        <Router
          history={history}
        >
          <AddReviewBtn
            movie={mockMovie}
          />
        </Router>
    );

    const addReviewButton = AddReviewItem.find(`.btn`).at(0);

    expect(addReviewButton.props().to).toBe(targetReviewUrl);
  });
});
