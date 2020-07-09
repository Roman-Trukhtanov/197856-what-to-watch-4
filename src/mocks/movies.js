const PREVIEW_URL = `http://placeimg.com/280/175/any`;
const BUCK_TRAILER_SRC = `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`;
const BUNNY_TRAILER_SRC = `https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4`;

export const MAX_GENRES_AMOUNT = 10;
export const MAX_VISIBLE_MOVIES_COUNT = 8;

export const GenreType = {
  ALL_GENRES: `All Genres`,
  COMEDIES: `Comedies`,
  CRIME: `Crime`,
  DOCUMENTARY: `Documentary`,
  DRAMAS: `Dramas`,
  THRILLERS: `Thrillers`,
  HORROR: `Horror`,
  ROMANCE: `Romance`,
  FAMILY: `Family`,
  FANTASY: `Fantasy`,
};

export default [
  {
    id: 0,
    genre: `Fantasy`,
    title: `Фантастические твари`,
    preview: `${PREVIEW_URL}/1`,
    videoSrc: BUCK_TRAILER_SRC,
    videoType: `video/mp4`,
  },
  {
    id: 1,
    title: `Форсаж`,
    genre: `Thrillers`,
    preview: `${PREVIEW_URL}/2`,
    videoSrc: BUNNY_TRAILER_SRC,
    videoType: `video/webm`,
  },
  {
    id: 2,
    title: `Жажда скорости`,
    genre: `Thrillers`,
    preview: `${PREVIEW_URL}/3`,
    videoSrc: BUCK_TRAILER_SRC,
    videoType: `video/mp4`,
  },
  {
    id: 3,
    title: `Гарри Поттер`,
    genre: `Fantasy`,
    preview: `${PREVIEW_URL}/4`,
    videoSrc: BUNNY_TRAILER_SRC,
    videoType: `video/webm`,
  },
  {
    id: 4,
    title: `Спецназ`,
    genre: `Thrillers`,
    preview: `${PREVIEW_URL}/5`,
    videoSrc: BUCK_TRAILER_SRC,
    videoType: `video/mp4`,
  },
  {
    id: 5,
    title: `Игра престолов`,
    genre: `Fantasy`,
    preview: `${PREVIEW_URL}/6`,
    videoSrc: BUNNY_TRAILER_SRC,
    videoType: `video/webm`,
  },
  {
    id: 6,
    title: `Стрела`,
    genre: `Thrillers`,
    preview: `${PREVIEW_URL}/7`,
    videoSrc: BUCK_TRAILER_SRC,
    videoType: `video/mp4`,
  },
  {
    id: 7,
    title: `Флэш`,
    genre: `Fantasy`,
    preview: `${PREVIEW_URL}/8`,
    videoSrc: BUNNY_TRAILER_SRC,
    videoType: `video/webm`,
  },
  {
    id: 8,
    title: `Шерлок`,
    genre: `Dramas`,
    preview: `${PREVIEW_URL}/9`,
    videoSrc: BUCK_TRAILER_SRC,
    videoType: `video/webm`,
  },
  {
    id: 9,
    title: `Доктор Хаус`,
    genre: `Dramas`,
    preview: `${PREVIEW_URL}/10`,
    videoSrc: BUNNY_TRAILER_SRC,
    videoType: `video/webm`,
  },
];
