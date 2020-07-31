import React, {ChangeEvent, FormEvent, Fragment} from "react";
import {connect} from "react-redux";
import {
  RATING_MULTIPLIER,
  REVIEW_STARS_AMOUNT,
  ReviewMessage,
  ReviewTextLimit
} from "../../const";
import {Operation as ReviewOperation} from "../../reducer/review/review";
import {
  getSendingReview,
  getSendReviewError,
  getSendReviewSuccess,
} from "../../reducer/review/selector";
import Header from "../header/header";

import {Movie} from "../../types";

interface Props {
  movie: Movie;
  rating: number;
  comment: string;
  onReviewSubmit: (
    id: number,
    {rating, comment}: {
      rating: number;
      comment: string;
    }
  ) => void;
  onStarChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onReviewInput: (evt: FormEvent<HTMLTextAreaElement>) => void;
  isValidReview: boolean;
  isSendingReview: boolean;
  isSendReviewError: boolean;
  isSendReviewSuccess: boolean;
}

const AddReview: React.FunctionComponent<Props> = (props: Props) => {
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

  const submitReview = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    onReviewSubmit(
        movie.id,
        {
          rating: rating * RATING_MULTIPLIER,
          comment,
        }
    );
  };

  const getMessage = (): React.ReactNode | string | void => {
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

  const getRatingInput = (index: number): React.ReactFragment => {
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
