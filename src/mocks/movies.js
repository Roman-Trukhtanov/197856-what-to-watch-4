const PREVIEW_URL = `http://placeimg.com/280/175/any`;
const BUCK_TRAILER_SRC = `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`;
const BUNNY_TRAILER_SRC = `https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4`;

const mockVideos = [
  {
    src: BUCK_TRAILER_SRC,
    type: `video/mp4`,
  },
  {
    src: BUNNY_TRAILER_SRC,
    type: `video/webm`,
  }
];

const getMovieItemData = ({title, genre}, index) => {
  return {
    id: index,
    title,
    genre,
    coverSrc: `/img/bg-the-grand-budapest-hotel.jpg`,
    bigPosterSrc: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImgSrc: `${PREVIEW_URL}/${index}`,
    previewVideo: {
      src: mockVideos[index % mockVideos.length].src,
      type: mockVideos[index % mockVideos.length].type,
      isLoop: true,
      isMute: true,
    },
    details: {
      rate: 9.1,
      releaseYear: 2014,
      ratingCount: 240,
      level: `Very good`,
      director: `Wes Andreson`,
      runTime: `1h 39m`,
      description: [
        `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
        `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
      ],
      starring: [
        `Bill Murray`,
        `Edward Norton`,
        `Jude Law`,
        `Willem Dafoe`,
        `Saoirse Ronan`,
        `Tony Revoloru`,
        `Tilda Swinton`,
        `Tom Wilkinson`,
        `Owen Wilkinson`,
        `Adrien Brody`,
        `Ralph Fiennes`,
        `Jeff Goldblum`
      ],
    },
  };
};

const movies = [
  {
    genre: `Fantasy`,
    title: `Фантастические твари`,
  },
  {
    title: `Форсаж`,
    genre: `Thrillers`,
  },
  {
    title: `Жажда скорости`,
    genre: `Thrillers`,
  },
  {
    title: `Гарри Поттер`,
    genre: `Fantasy`,
  },
  {
    title: `Спецназ`,
    genre: `Thrillers`,
  },
  {
    title: `Игра престолов`,
    genre: `Fantasy`,
  },
  {
    title: `Стрела`,
    genre: `Thrillers`,
  },
  {
    title: `Флэш`,
    genre: `Fantasy`,
  },
  {
    title: `Шерлок`,
    genre: `Dramas`,
  },
  {
    title: `Доктор Хаус`,
    genre: `Dramas`,
  },
];

const moviesData = movies.map((movie, index) => getMovieItemData(movie, index));

export default moviesData;
