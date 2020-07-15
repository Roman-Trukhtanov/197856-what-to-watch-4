import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card";

const MovieList = (props) => {
  const {
    movies,
    onMovieCardTitleClick,
    activePlayerId,
    renderVideo,
    onMouseEnter,
    onMouseLeave,
  } = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie) => {
        return (
          <MovieCard
            key={`movie_${movie.id}`}
            movie={movie}
            activePlayerId={activePlayerId}
            onMovieCardTitleClick={onMovieCardTitleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            renderVideo={renderVideo}
          />
        );
      })}
    </div>
  );
};

MovieList.propTypes = {
  onMovieCardTitleClick: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  renderVideo: PropTypes.func.isRequired,
  activePlayerId: PropTypes.number.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default MovieList;
