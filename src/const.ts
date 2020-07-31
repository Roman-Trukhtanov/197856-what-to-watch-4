import {VideoTypes} from "./types";

export const MAX_GENRES_AMOUNT = 10;

export const MAX_VISIBLE_MOVIES_COUNT = 8;

export const OVERVIEW_STARRING_COUNT = 4;

export const MAX_SLICED_MOVIES = 4;

export const DEFAULT_SELECTED_MOVIE_ID = 1;

export const DEFAULT_COLLECTION_NUMBER = 1;

export const MINUTES_IN_HOUR = 60;
export const SECONDS_IN_MINUTE = 60;

export const REVIEW_STARS_AMOUNT = 5;

export const DEFAULT_RATING = 3;

export const RATING_MULTIPLIER = 2;

export const DEFAULT_BG_COLOR = `#250505`;

export enum ScreenType {
  FILMS = `films`,
  PLAYER =`player`,
  REVIEW = `review`,
}

export enum AppRoute {
  ROOT = `/`,
  SIGN_IN = `/login`,
  PLAYER = `/player/:id`,
  MOVIE = `/films/:id`,
  REVIEW = `/films/:id/review`,
  MY_LIST = `/mylist`,
}

export enum HistoryAction {
  PUSH = `PUSH`,
}

export enum AuthorizationStatus {
  AUTH = `AUTH`,
  NO_AUTH = `NO_AUTH`,
}

export const DEFAULT_GENRE = `All Genres`;

export enum TabType {
  OVERVIEW = `overview`,
  DETAILS = `details`,
  REVIEWS = `reviews`,
}

export const monthsNames: Array<string> = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

export const DEFAULT_VIDEO_TYPE = `video/mp4`;

export const VideoType: VideoTypes = {
  MP4: `video/mp4`,
  WEBM: `video/webm`,
};

export enum ReviewTextLimit {
  MIN = 50,
  MAX = 400,
}

export enum ReviewMessage {
  SUCCESS = `Your comment has been posted successfully`,
  ERROR = `An error occurred while posting a comment, please try again ...`,
}

export const PAGE_NOT_FOUND_TEXT = `404: Page not found...`;
