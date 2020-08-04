import React, {ChangeEvent, FormEvent, PureComponent} from "react";
import {DEFAULT_RATING, ReviewTextLimit} from "../../const";
import {Subtract} from "utility-types";

interface State {
  isValidReview: boolean;
  rating: number;
  comment: string;
}

interface InjectingProps {
  rating: number;
  comment: string;
  isValidReview: boolean;
  onStarChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onReviewInput: (evt: FormEvent<HTMLTextAreaElement>) => void;
}

const withReview = (Component) => {
  type P = React.ComponentProps<typeof Component>;

  type T = Subtract<P, InjectingProps>;

  class WithReview extends PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        isValidReview: false,
        rating: DEFAULT_RATING,
        comment: ``,
      };

      this._handleStarChange = this._handleStarChange.bind(this);
      this._handleReviewInput = this._handleReviewInput.bind(this);
    }

    _checkFormValid(rating: number, comment: string) {
      const isValidReview = !!(
        rating &&
        comment.length >= ReviewTextLimit.MIN &&
        comment.length <= ReviewTextLimit.MAX
      );

      this.setState({
        isValidReview,
      });
    }

    _handleStarChange(evt: ChangeEvent<HTMLInputElement>) {
      const {comment} = this.state;

      const rating = +evt.target.value;

      this.setState({
        rating,
      });

      this._checkFormValid(rating, comment);
    }

    _handleReviewInput(evt: FormEvent<HTMLTextAreaElement>) {
      const {rating} = this.state;

      const target = evt.target as HTMLTextAreaElement;

      const comment = target.value;

      this.setState({
        comment,
      });

      this._checkFormValid(rating, comment);
    }

    render() {
      const {
        isValidReview,
        rating,
        comment,
      } = this.state;

      return (
        <Component
          {...this.props}
          rating={rating}
          comment={comment}
          isValidReview={isValidReview}
          onStarChange={this._handleStarChange}
          onReviewInput={this._handleReviewInput}
        />
      );
    }
  }

  return WithReview;
};

export default withReview;
