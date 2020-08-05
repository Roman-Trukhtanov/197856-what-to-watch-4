import React from "react";
import renderer from "react-test-renderer";
import withVideo from "./with-video";
import {Movie} from "../../types";

const mockMovieData: Movie = {
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

interface Props {
  children: React.ReactNode | React.ReactNodeArray;
}

const MockComponent = (props: Props): React.ReactNode => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

const MockComponentWrapped = withVideo(MockComponent);

it(`withAudio is rendered correctly`, () => {
  const {previewVideo, previewImgSrc} = mockMovieData;

  const tree = renderer.create((
    <MockComponentWrapped
      isStartPlaying={true}
      previewImgSrc={previewImgSrc}
      videoData={previewVideo}
    />
  ), {
    createNodeMock() {
      return {
        addEventListener() {
          return;
        },
        play() {
          return;
        },
      };
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
