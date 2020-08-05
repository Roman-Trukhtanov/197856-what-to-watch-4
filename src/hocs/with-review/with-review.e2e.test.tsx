import React, {ChangeEvent, FormEvent} from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withReview from './with-review';

Enzyme.configure({
  adapter: new Adapter()
});

interface Props {
  rating: number;
  comment: string;
  isValidReview: boolean;
  onReviewSubmit: (
    rating: number,
    comment: string,
  ) => void;
  onStarChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onReviewInput: (evt: FormEvent<HTMLTextAreaElement>) => void;
}

const mockComponent = (props: Props): React.ReactNode => {
  const {
    rating,
    comment,
    isValidReview,
    onReviewInput,
    onStarChange,
    onReviewSubmit,
  } = props;

  const handleSubmit = (): void => {
    if (!isValidReview) {
      return;
    }

    onReviewSubmit(rating, comment);
  };

  return (
    <div className="review">
      <form
        className="review__form"
        onSubmit={handleSubmit}
      >
        <div className="review__stars-wrap" onChange={onStarChange}>
          <input
            className="review__star-item"
            type="radio"
          />
        </div>
        <textarea
          className="review__textarea"
          onInput={onReviewInput}
        />
      </form>
    </div>
  );
};

interface LocalEvent {
  target: {
    value: number | string ;
  };
}

const getReviewEvent = (reviewText: string): LocalEvent => ({
  target: {
    value: reviewText,
  }
});

const getChangeStarEvent = (starValue: number): LocalEvent => ({
  target: {
    value: starValue,
  }
});

describe(`HOC withReview`, () => {
  it(`Should submit review with correct and valid props`, () => {
    const ComponentWrapped = withReview(mockComponent);
    const onReviewSubmit = jest.fn();

    const reviewWrapper = mount(
        <ComponentWrapped
          onReviewSubmit={onReviewSubmit}
        />
    );

    const reviewText = `It was well acted, directed, and the music was good. But the story is yawn. Not trying to rip anybody but I checked my watch a dozen times during this movie.`;

    const starValue = 4;

    const starsWrap = reviewWrapper.find(`.review__stars-wrap`);
    starsWrap.simulate(`change`, getChangeStarEvent(starValue));

    const textArea = reviewWrapper.find(`.review__textarea`);
    textArea.simulate(`input`, getReviewEvent(reviewText));

    const reviewForm = reviewWrapper.find(`.review__form`);

    reviewForm.simulate(`submit`);

    expect(onReviewSubmit).toHaveBeenCalledTimes(1);
    expect(onReviewSubmit).toHaveBeenCalledWith(starValue, reviewText);
  });

  it(`shouldn't send review (invalid props)`, () => {
    const ComponentWrapped = withReview(mockComponent);
    const onReviewSubmit = jest.fn();

    const reviewWrapper = mount(
        <ComponentWrapped
          onReviewSubmit={onReviewSubmit}
        />
    );

    const reviewText = `review text`;
    const starValue = 5;

    const starsWrap = reviewWrapper.find(`.review__stars-wrap`);
    starsWrap.simulate(`change`, getChangeStarEvent(starValue));

    const textArea = reviewWrapper.find(`.review__textarea`);
    textArea.simulate(`input`, getReviewEvent(reviewText));

    const reviewForm = reviewWrapper.find(`.review__form`);

    reviewForm.simulate(`submit`);

    expect(onReviewSubmit).toHaveBeenCalledTimes(0);
  });

  it(`shouldn't send review`, () => {
    const ComponentWrapped = withReview(mockComponent);
    const onReviewSubmit = jest.fn();

    const reviewWrapper = mount(
        <ComponentWrapped
          onReviewSubmit={onReviewSubmit}
        />
    );

    const reviewForm = reviewWrapper.find(`.review__form`);

    reviewForm.simulate(`submit`);

    expect(onReviewSubmit).toHaveBeenCalledTimes(0);
  });
});
