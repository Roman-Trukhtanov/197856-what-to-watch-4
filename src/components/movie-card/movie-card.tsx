import React, {MouseEvent, memo} from "react";
import {getImgBgStyle, scrollToTop} from "../../utils";
import {Movie, PreviewVideo} from "../../types";

interface Props {
  onMovieCardTitleClick: (movieID: number) => void;
  onMouseEnter: (movie: Movie) => void;
  onMouseLeave: () => void;
  movie: Movie;
  renderVideo: (movie: Movie, previewVideo: PreviewVideo) => React.ReactNode;
  activePlayerId: number;
}

const MovieCard: React.FunctionComponent<Props> = (props: Props) => {
  const {
    onMovieCardTitleClick,
    onMouseEnter,
    onMouseLeave,
    movie,
    renderVideo,
    activePlayerId,
  } = props;

  const goToSelectedMovie = (evt: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    evt.preventDefault();

    scrollToTop();

    onMovieCardTitleClick(movie.id);
  };

  const {
    id,
    previewImgSrc,
    bgColor,
    title,
    previewVideo,
  } = movie;

  const getVideoOrImg = (): React.ReactNode => {
    if (activePlayerId === id) {
      return renderVideo(movie, previewVideo);
    }

    return (
      <img
        src={previewImgSrc}
        alt={title}
        width="280" height="175"
        style={getImgBgStyle(bgColor)}
      />
    );
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        onMouseEnter(movie);
      }}
      onMouseLeave={onMouseLeave}
    >
      <div className="small-movie-card__image" onClick={goToSelectedMovie}>
        {getVideoOrImg()}
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href={`/films/${id}`} onClick={goToSelectedMovie}>{movie.title}</a>
      </h3>
    </article>
  );
};

export default memo(MovieCard);
