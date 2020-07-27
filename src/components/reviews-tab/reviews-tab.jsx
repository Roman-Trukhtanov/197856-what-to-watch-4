import React from "react";
import PropTypes from "prop-types";
import ReviewItem from "../review-item/review-item";
import {connect} from "react-redux";
import {getMovieComments} from "../../reducer/data/selectors";

const ReviewsTab = (props) => {
  const {movieComments} = props;

  const getReviewItem = (comment, index) => (
    <ReviewItem
      key={`comment_${index}_${Math.floor(Math.random() * 1000)}`}
      comment={comment}
    />
  );

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {movieComments.map((comment, index) => {
          if (index % 2 !== 0 || !comment.id) {
            return null;
          }

          return getReviewItem(comment, index);
        })}
      </div>

      <div className="movie-card__reviews-col">
        {movieComments.map((comment, index) => {
          if (index % 2 === 0 || !comment.id) {
            return null;
          }

          return getReviewItem(comment, index);
        })}
      </div>
    </div>
  );
};

ReviewsTab.propTypes = {
  movieComments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  movieComments: getMovieComments(state),
});

export {ReviewsTab};
export default connect(mapStateToProps)(ReviewsTab);
