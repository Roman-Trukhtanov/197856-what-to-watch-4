import {DEFAULT_VIDEO_TYPE, VideoType} from "../const";
import {Movie} from "../types";

const VIDEO_TYPE_REGEXP = /webm|mp4$/;

export default class ModelMovie implements Movie {
  readonly id: number;
  readonly title: string;
  readonly genre: string;
  readonly coverSrc: string;
  readonly bgColor: string;
  readonly bigPosterSrc: string;
  readonly previewImgSrc: string;
  readonly isFavorite: boolean;
  readonly fullVideo: {
    className: string;
    src: string;
    type: string;
    isAutoPlay: boolean;
    isLoop: boolean;
    isMute: boolean;
  };
  readonly previewVideo: {
    src: string;
    type: string;
    isAutoPlay: boolean;
    isLoop: boolean;
    isMute: boolean;
  };
  readonly details: {
    rate: number;
    releaseYear: number;
    ratingCount: number;
    level: string;
    director: string;
    runTime: number;
    description: string;
    starring: string[];
  };

  constructor(data) {
    if (data[`id`]) {
      this.id = data[`id`];
    }
    this.title = data[`name`];
    this.genre = data[`genre`];
    this.coverSrc = data[`background_image`];
    this.bgColor = data[`background_color`];
    this.bigPosterSrc = data[`poster_image`];
    this.previewImgSrc = data[`preview_image`];
    this.isFavorite = data[`is_favorite`];
    this.fullVideo = {
      className: `player__video`,
      src: data[`video_link`],
      type: ModelMovie.getVideoType(data[`video_link`]),
      isAutoPlay: true,
      isLoop: false,
      isMute: false,
    };
    this.previewVideo = {
      src: data[`preview_video_link`],
      type: ModelMovie.getVideoType(data[`video_link`]),
      isAutoPlay: true,
      isLoop: true,
      isMute: true,
    };
    this.details = {
      rate: data[`rating`],
      releaseYear: data[`released`],
      ratingCount: data[`scores_count`],
      level: ModelMovie.getRatingText(data[`rating`]),
      director: data[`director`],
      runTime: data[`run_time`],
      description: data[`description`],
      starring: data[`starring`],
    };
  }

  static getRatingText(rating: number): string {
    if (rating >= 0 && rating < 3) {
      return `Bad`;
    } else if (rating >= 3 && rating < 5) {
      return `Normal`;
    } else if (rating >= 5 && rating < 8) {
      return `Good`;
    } else if (rating >= 8 && rating < 10) {
      return `Very good`;
    } else if (rating >= 10) {
      return `Awesome`;
    }

    return `Bad`;
  }

  static getVideoType(link: string): string {
    const matchedVideoType = link.match(VIDEO_TYPE_REGEXP);

    if (matchedVideoType) {
      return VideoType[matchedVideoType[0].toUpperCase()];
    }

    return DEFAULT_VIDEO_TYPE;
  }

  static parseMovie(data): Movie {
    return new ModelMovie(data);
  }

  static parseMovies(data): Movie[] {
    return data.map(ModelMovie.parseMovie);
  }
}
