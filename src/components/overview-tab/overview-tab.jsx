import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {OVERVIEW_STARRING_COUNT} from "../../mocks/const";

const OverviewTab = (props) => {
  const {movie} = props;

  const {details} = movie;

  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{details.rate}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{details.level}</span>
          <span className="movie-rating__count">{`${details.ratingCount} ratings`}</span>
        </p>
      </div>

      <div className="movie-card__text">
        {details.description.map((item, index) => (
          <p key={`description-item__${index}`}>{item}</p>
        ))}

        <p className="movie-card__director"><strong>{`Director: ${details.director}`}</strong></p>

        <p className="movie-card__starring"><strong>{`Starring: ${details.starring.slice(0, OVERVIEW_STARRING_COUNT).join(`, `)} and other`}</strong></p>
      </div>
    </Fragment>
  );
};

OverviewTab.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    details: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      ratingCount: PropTypes.number.isRequired,
      description: PropTypes.arrayOf(PropTypes.string).isRequired,
      director: PropTypes.string.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }).isRequired,
};

export default OverviewTab;
