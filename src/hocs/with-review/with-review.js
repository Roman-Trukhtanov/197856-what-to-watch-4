import React, {PureComponent} from "react";
import {DEFAULT_RATING, ReviewTextLimit} from "../../const";
// import PropTypes from "prop-types";

const withReview = (Component) => {
  class WithReview extends PureComponent {
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

    _checkFormValid() {
      const {
        rating,
        comment,
      } = this.state;

      const isValidReview = !!(
        rating &&
        comment.length >= ReviewTextLimit.MIN &&
        comment.length <= ReviewTextLimit.MAX
      );

      this.setState({
        isValidReview,
      });
    }

    _handleStarChange(evt) {
      const rating = +evt.target.value;

      this._checkFormValid();

      this.setState({
        rating,
      });
    }

    _handleReviewInput(evt) {
      const comment = evt.target.value;

      this._checkFormValid();

      this.setState({
        comment,
      });
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

  WithReview.propTypes = {};

  return WithReview;
};

withReview.propTypes = {};

export default withReview;
