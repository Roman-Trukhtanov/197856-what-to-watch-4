import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {
  RATING_MULTIPLIER,
  REVIEW_STARS_AMOUNT,
  ReviewMessage,
  ReviewTextLimit
} from "../../const";
import {connect} from "react-redux";
import Header from "../header/header";
import {Operation as ReviewOperation} from "../../reducer/review/review";
import {
  getSendingReview,
  getSendReviewError,
  getSendReviewSuccess,
} from "../../reducer/review/selector";

const AddReview = (props) => {
  const {
    rating,
    comment,
    movie,
    onReviewSubmit,
    onReviewInput,
    onStarChange,
    isValidReview,
    isSendingReview,
    isSendReviewError,
    isSendReviewSuccess,
  } = props;

  const isDisabled = !!(isSendingReview && !isSendReviewError);

  const submitReview = (evt) => {
    evt.preventDefault();

    onReviewSubmit(
        movie.id,
        {
          rating: rating * RATING_MULTIPLIER,
          comment,
        }
    );
  };

  const getMessage = () => {
    if (isSendingReview && !isSendReviewError) {
      return ``;
    }

    if (isSendReviewError) {
      return (
        <p className="movie-card__text">{ReviewMessage.ERROR}</p>
      );
    }

    if (isSendReviewSuccess) {
      return (
        <p className="movie-card__text">{ReviewMessage.SUCCESS}</p>
      );
    }

    return null;
  };

  const getRatingInput = (index) => {
    const iterator = index + 1;

    return (
      <Fragment key={`rating-star-${iterator}`}>
        <input
          id={`star-${iterator}`}
          className="rating__input"
          type="radio"
          name="rating"
          value={iterator}
          disabled={isDisabled}
          defaultChecked={(rating) === iterator}
        />
        <label
          className="rating__label"
          htmlFor={`star-${iterator}`}>Rating {`star-${iterator}`}
        </label>
      </Fragment>
    );
  };

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={movie.coverSrc} alt={movie.title}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          isReview={true}
          movie={movie}
        />

        <div className="movie-card__poster movie-card__poster--small">
          <img src={movie.bigPosterSrc} alt={movie.title} width="218"
            height="327"/>
        </div>
      </div>

      <div className="add-review">
        <form
          action="#"
          className="add-review__form"
          onSubmit={submitReview}
        >
          <div className="rating">
            <div className="rating__stars" onChange={onStarChange}>
              {Array(REVIEW_STARS_AMOUNT).fill(``).map((item, index) => {
                return getRatingInput(index);
              })}
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              minLength={ReviewTextLimit.MIN}
              maxLength={ReviewTextLimit.MAX}
              disabled={isDisabled}
              onInput={onReviewInput}
              required
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={!isValidReview || isDisabled}>Post</button>
            </div>

          </div>
        </form>

        {getMessage()}
      </div>
    </section>
  );
};

AddReview.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    coverSrc: PropTypes.string.isRequired,
    bigPosterSrc: PropTypes.string.isRequired,
  }).isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
  onStarChange: PropTypes.func.isRequired,
  onReviewInput: PropTypes.func.isRequired,
  isValidReview: PropTypes.bool.isRequired,
  isSendingReview: PropTypes.bool.isRequired,
  isSendReviewError: PropTypes.bool.isRequired,
  isSendReviewSuccess: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isSendingReview: getSendingReview(state),
  isSendReviewError: getSendReviewError(state),
  isSendReviewSuccess: getSendReviewSuccess(state),
});

const mapDispatchToProps = (dispatch) => ({
  onReviewSubmit(movieID, reviewData) {
    dispatch(ReviewOperation.sendReview(movieID, reviewData));
  }
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
