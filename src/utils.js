import {
  DEFAULT_BG_COLOR,
  MAX_VISIBLE_MOVIES_COUNT,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE
} from "./const";

export const extend = (currentObject, newObject) => {
  return Object.assign({}, currentObject, newObject);
};

export const spliceMovies = (
    collectionNumber = 1,
    movies,
    visibleMoviesCount = MAX_VISIBLE_MOVIES_COUNT
) => {
  return [...movies].splice(0, visibleMoviesCount * collectionNumber);
};

export const checkVisibleMovies = (movies, movieCollectionNumber) => {
  return MAX_VISIBLE_MOVIES_COUNT * movieCollectionNumber < movies.length;
};

export const getStringTime = (secValue = 0) => {
  let hours = Math.floor(secValue / SECONDS_IN_MINUTE / MINUTES_IN_HOUR);
  let minutes = Math.floor(secValue / SECONDS_IN_MINUTE % MINUTES_IN_HOUR);
  let seconds = Math.floor(secValue % SECONDS_IN_MINUTE);

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: `smooth`
  });
};

export const getImgBgStyle = (bgColor) => ({
  display: `block`,
  backgroundColor: bgColor || DEFAULT_BG_COLOR,
});

export const shuffleArray = (array) => {
  const copiedArray = [...array];

  for (let i = copiedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copiedArray[j];
    copiedArray[j] = copiedArray[i];
    copiedArray[i] = temp;
  }
  return copiedArray;
};
