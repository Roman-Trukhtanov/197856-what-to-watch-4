import React from "react";
import {connect} from "react-redux";
import ReviewItem from "../review-item/review-item";
import {getMovieComments} from "../../reducer/data/selectors";
import {Comment} from "../../types";
import {RootState} from "../../reducer/reducer";

interface Props {
  movieComments: Comment[];
}

const ReviewsTab: React.FunctionComponent<Props> = (props: Props) => {
  const {movieComments} = props;

  const getReviewItem = (comment, index): React.ReactNode => (
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

const mapStateToProps = (state: RootState) => ({
  movieComments: getMovieComments(state),
});

export {ReviewsTab};
export default connect(mapStateToProps)(ReviewsTab);
