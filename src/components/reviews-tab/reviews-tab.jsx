import React from "react";
import PropTypes from "prop-types";
import ReviewItem from "../review-item/review-item";

const ReviewsTab = (props) => {
  const {movieComments} = props;

  const getReviewItem = (comment, index) => (
    <ReviewItem
      key={`comment_${movieComments.id}_${index}`}
      comment={comment}
    />
  );

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {movieComments.comments.map((comment, index) => {
          if (index % 2 !== 0) {
            return null;
          }

          return getReviewItem(comment, index);
        })}
      </div>

      <div className="movie-card__reviews-col">
        {movieComments.comments.map((comment, index) => {
          if (index % 2 === 0) {
            return null;
          }

          return getReviewItem(comment, index);
        })}
      </div>
    </div>
  );
};

ReviewsTab.propTypes = {
  movieComments: PropTypes.shape({
    id: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default ReviewsTab;
