import React, {Fragment} from "react";
import {connect} from "react-redux";
import ReviewItem from "../review-item/review-item";
import {getMovieComments} from "../../reducer/data/selectors";
import {NO_REVIEWS_TEXT} from "../../const";
import {Comment} from "../../types";
import {RootState} from "../../reducer/reducer";
import {checkEven, checkOdd} from "../../utils";

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

  const getReviewEvenCol = (comments: Comment[]): React.ReactNode => (
    <div className="movie-card__reviews-col">
      {comments.map((comment, index) => {
        if (checkOdd(index) || !comment.id) {
          return null;
        }

        return getReviewItem(comment, index);
      })}
    </div>
  );

  const getReviewOddCol = (comments: Comment[]): React.ReactNode => (
    <div className="movie-card__reviews-col">
      {comments.map((comment, index) => {
        if (checkEven(index) || !comment.id) {
          return null;
        }

        return getReviewItem(comment, index);
      })}
    </div>
  );

  const getMovieCommentsList = (comments: Comment[]): React.ReactNode => {
    if (!comments.length) {
      return (
        <p className="movie-card__text">{NO_REVIEWS_TEXT}</p>
      );
    }

    return (
      <Fragment>
        {getReviewEvenCol(comments)}
        {getReviewOddCol(comments)}
      </Fragment>
    );
  };

  return (
    <div className="movie-card__reviews movie-card__row">
      {getMovieCommentsList(movieComments)}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  movieComments: getMovieComments(state),
});

export {ReviewsTab};
export default connect(mapStateToProps)(ReviewsTab);
