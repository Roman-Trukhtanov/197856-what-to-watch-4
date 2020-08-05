import React from "react";
import {Router} from "react-router-dom";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Header} from "./header";
import {AuthorizationStatus} from "../../const";
import history from "../../history";
import {Movie, User} from "../../types";

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

const mockUser: User = {
  id: 1,
  name: `Joe`,
  email: `joe@site.com`,
  avatarSrc: `link`,
};

describe(`Header component`, () => {
  it(`Should enter on the Root path`, () => {
    const targetRootUrl = `/`;

    history.push(`/custom`);

    const HeaderItem = mount(
        <Router
          history={history}
        >
          <Header
            authorizationStatus={AuthorizationStatus.NO_AUTH}
          />
        </Router>
    );

    const logoBtn = HeaderItem.find(`.logo__link`).at(0);

    expect(logoBtn.props().to).toBe(targetRootUrl);
  });

  it(`Should enter on the login`, () => {
    const targetLoginUrl = `/login`;

    const HeaderItem = mount(
        <Router
          history={history}
        >
          <Header
            authorizationStatus={AuthorizationStatus.NO_AUTH}
          />
        </Router>
    );

    const signInBtn = HeaderItem.find(`.user-block__link`).at(0);

    expect(signInBtn.props().to).toBe(targetLoginUrl);
  });

  it(`Should back on the films`, () => {
    const mockMovie = mockMovieData[0];

    const targetMovieUrl = `/films/${mockMovie.id}`;

    const HeaderItem = mount(
        <Router
          history={history}
        >
          <Header
            authorizationStatus={AuthorizationStatus.AUTH}
            isReview={true}
            movie={mockMovie}
            user={mockUser}
          />
        </Router>
    );

    const breadcrumbsLink = HeaderItem.find(`.breadcrumbs__link`).at(0);

    expect(breadcrumbsLink.props().to).toBe(targetMovieUrl);
  });

  it(`Should enter on the mylist`, () => {
    const targetMyListUrl = `/mylist`;

    const HeaderItem = mount(
        <Router
          history={history}
        >
          <Header
            authorizationStatus={AuthorizationStatus.AUTH}
            user={mockUser}
          />
        </Router>
    );

    const avatarLink = HeaderItem.find(`.user-block__avatar-link`).at(0);

    expect(avatarLink.props().to).toBe(targetMyListUrl);
  });
});
