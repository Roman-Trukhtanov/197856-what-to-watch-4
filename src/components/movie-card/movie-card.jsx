import React, {memo} from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const {
    onMovieCardTitleClick,
    onMouseEnter,
    onMouseLeave,
    movie,
    renderVideo,
    activePlayerId,
  } = props;

  const {previewVideo} = movie;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        onMouseEnter(movie);
      }}
      onMouseLeave={onMouseLeave}
    >
      <div className="small-movie-card__image" onClick={onMovieCardTitleClick}>
        {activePlayerId === movie.id
          ? renderVideo(movie, previewVideo)
          : <img src={movie.previewImgSrc} alt={movie.title} width="280" height="175"/>
        }
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" onClick={onMovieCardTitleClick}>{movie.title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  onMovieCardTitleClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    previewImgSrc: PropTypes.string.isRequired,
    previewVideo: PropTypes.object.isRequired,
  }).isRequired,
  renderVideo: PropTypes.func.isRequired,
  activePlayerId: PropTypes.number.isRequired,
};

export default memo(MovieCard);