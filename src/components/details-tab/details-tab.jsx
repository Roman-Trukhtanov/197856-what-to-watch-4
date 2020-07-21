import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {MINUTES_IN_HOUR} from "../../const";

const DetailsTab = (props) => {
  const {movie} = props;

  const {details} = movie;

  const getRunTime = () => {
    const runTime = details.runTime;

    const hours = Math.floor(runTime / MINUTES_IN_HOUR);
    const minutes = runTime % MINUTES_IN_HOUR;

    if (hours < 1) {
      return `${minutes}m`;
    }

    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{details.director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {details.starring.map((item, index) => (
              <Fragment key={`starring_${movie.id}_${index}`}>
                {item.trim()}
                {index !== details.starring.length - 1 && <br/>}
              </Fragment>
            ))}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{getRunTime()}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{movie.genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{details.releaseYear}</span>
        </p>
      </div>
    </div>
  );
};

DetailsTab.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    details: PropTypes.shape({
      director: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string).isRequired,
      runTime: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DetailsTab;
