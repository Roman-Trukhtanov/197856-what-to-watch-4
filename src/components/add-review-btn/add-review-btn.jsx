import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {ScreenType} from "../../const";

const AddReviewBtn = (props) => {
  const {movie} = props;

  return (
    <Link to={`/${ScreenType.FILMS}/${movie.id}/${ScreenType.REVIEW}`} className="btn movie-card__button">Add review</Link>
  );
};

AddReviewBtn.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export {AddReviewBtn};

export default AddReviewBtn;
