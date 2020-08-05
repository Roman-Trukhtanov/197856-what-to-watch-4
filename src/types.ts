export type Time = number | string;

export type VideoTypes = {
  [key: string]: string;
}

export type Action = {
  [key: string]: string;
}

export type ActionObject<T> = {
  type: string;
  payload: T;
}

export type Noop = () => void;

export type FavoriteStatus = 0 | 1;

export interface Review {
  rating: number;
  comment: string;
}

export interface PreviewVideo {
  className?: string;
  src: string;
  type: string;
  isAutoPlay?: boolean;
  isLoop: boolean;
  isMute: boolean;
}
export interface FullVideo {
  className: string;
  src: string;
  type: string;
  isAutoPlay?: boolean;
  isLoop: boolean;
  isMute: boolean;
}

export interface Movie {
  id: number;
  title: string;
  genre: string;
  coverSrc: string;
  bgColor: string;
  bigPosterSrc: string;
  previewImgSrc: string;
  isFavorite: boolean;
  fullVideo: FullVideo;
  previewVideo: PreviewVideo;
  details: {
    rate: number;
    releaseYear: number;
    ratingCount: number;
    level: string;
    director: string;
    runTime: number;
    description: string;
    starring: string[];
  };
}

export interface Comment {
  id: number;
  user: {
    id: number;
    name: string;
  };
  rating: number;
  comment: string;
  date: string;
  dateText: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatarSrc: string;
}

export interface UserData {
  email: string;
  password: string;
}

export interface ImgBgStyle {
  display: string;
  backgroundColor: string;
}
