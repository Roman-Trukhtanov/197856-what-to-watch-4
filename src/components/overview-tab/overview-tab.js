import React, {Fragment} from "react";
import PropTypes from "prop-types";

const OverviewTab = (props) => {
  const {movieOverview} = props;

  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{movieOverview.rate}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{movieOverview.level}</span>
          <span className="movie-rating__count">{`${movieOverview.ratingCount} ratings`}</span>
        </p>
      </div>

      <div className="movie-card__text">
        {movieOverview.description.map((item, index) => (
          <p key={`description-item__${index}`}>{item}</p>
        ))}

        <p className="movie-card__director"><strong>{`Director: ${movieOverview.director}`}</strong></p>

        <p className="movie-card__starring"><strong>{movieOverview.starring}</strong></p>
      </div>
    </Fragment>
  );
};

OverviewTab.propTypes = {
  movieOverview: PropTypes.shape({
    id: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    description: PropTypes.arrayOf(PropTypes.string).isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.string.isRequired
  }).isRequired,
};

export default OverviewTab;
