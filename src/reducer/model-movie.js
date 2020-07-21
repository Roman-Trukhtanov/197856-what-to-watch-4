import {DEFAULT_VIDEO_TYPE, VideoType} from "../const";

const VIDEO_TYPE_REGEXP = /webm|mp4$/;

export default class ModelMovie {
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

  static getRatingText(rating) {
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

  static getVideoType(link) {
    const matchedVideoType = link.match(VIDEO_TYPE_REGEXP);

    if (matchedVideoType) {
      return VideoType[matchedVideoType[0].toUpperCase()];
    }

    return DEFAULT_VIDEO_TYPE;
  }

  static parseMovie(data) {
    return new ModelMovie(data);
  }

  static parseMovies(data) {
    return data.map(ModelMovie.parseMovie);
  }

  toRAW() {
    const dataRAW = {
      "name": this.title,
      "genre": this.genre,
      "poster_image": this.bigPosterSrc,
      "preview_image": this.previewImgSrc,
      "background_image": this.coverSrc,
      "background_color": this.bgColor,
      "is_favorite": this.isFavorite,
      "video_link": this.fullVideo.src,
      "preview_video_link": this.previewVideo.src,
      "description": this.details.description,
      "rating": this.details.rate,
      "scores_count": this.details.ratingCount,
      "director": this.details.director,
      "starring": this.details.starring,
      "run_time": this.details.runTime,
      "released": this.genre,
    };

    if (this.id) {
      dataRAW[`id`] = this.id;
    }

    return dataRAW;
  }
}
