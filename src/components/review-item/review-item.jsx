import React from "react";
import PropTypes from "prop-types";

const ReviewItem = (props) => {
  const {comment} = props;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.description}</p>

        <footer className="review__details">
          <cite className="review__author">{comment.author}</cite>
          <time className="review__date" dateTime="2016-12-20">{comment.date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{comment.rate}</div>
    </div>
  );
};

ReviewItem.propTypes = {
  comment: PropTypes.shape({
    rate: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReviewItem;
