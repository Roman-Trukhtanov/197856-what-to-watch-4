import React from "react";
import PropTypes from "prop-types";

const ReviewItem = (props) => {
  const {comment} = props;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime="2016-12-20">{comment.dateText}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{comment.rating.toFixed(1)}</div>
    </div>
  );
};

ReviewItem.propTypes = {
  comment: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    comment: PropTypes.string.isRequired,
    dateText: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReviewItem;
