import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const {
    onMovieCardTitleClick,
    onMouseEnter,
    onMouseLeave,
    movie,
  } = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        onMouseEnter(movie);
      }}
      onMouseLeave={onMouseLeave}
    >
      <div className="small-movie-card__image">
        <img src={movie.preview}
          alt={movie.title} width="280" height="175"/>
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
    preview: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
