import {
  DEFAULT_BG_COLOR,
  MAX_VISIBLE_MOVIES_COUNT,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE
} from "./const";
import {ImgBgStyle, Movie, Time} from "./types";

export const extend = (currentObject: object, newObject: object): object => {
  return Object.assign({}, currentObject, newObject);
};

export const noop = () => {
  return;
};

export const spliceMovies = (
    collectionNumber = 1,
    movies: Movie[],
    visibleMoviesCount: number = MAX_VISIBLE_MOVIES_COUNT
): Movie[] => {
  return [...movies].splice(0, visibleMoviesCount * collectionNumber);
};

export const checkVisibleMovies = (
    movies: Movie[],
    movieCollectionNumber: number
): boolean => {
  return MAX_VISIBLE_MOVIES_COUNT * movieCollectionNumber < movies.length;
};

export const getStringTime = (secValue = 0): string => {
  let hours: Time = Math.floor(secValue / SECONDS_IN_MINUTE / MINUTES_IN_HOUR);
  let minutes: Time = Math.floor(secValue / SECONDS_IN_MINUTE % MINUTES_IN_HOUR);
  let seconds: Time = Math.floor(secValue % SECONDS_IN_MINUTE);

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

export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: `smooth`
  });
};

export const getImgBgStyle = (bgColor: string): ImgBgStyle => ({
  display: `block`,
  backgroundColor: bgColor || DEFAULT_BG_COLOR,
});

export const shuffleMovies = (Movies: Movie[]): Movie[] => {
  const copiedArray: Movie[] = [...Movies];

  for (let i = copiedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copiedArray[j];
    copiedArray[j] = copiedArray[i];
    copiedArray[i] = temp;
  }

  return copiedArray;
};

export const reloadPage = (): void => {
  window.location.reload();
};
