import React from "react";
import PropTypes from "prop-types";
import {ActionCreator as ScreenActionCreator} from "../../reducer/screen/screen";
import {ScreenType} from "../../const";
import {connect} from "react-redux";

const AddReviewBtn = (props) => {
  const {
    onAddReviewBtnClick,
  } = props;

  return (
    <a href="/" className="btn movie-card__button" onClick={(evt) => {
      evt.preventDefault();
      onAddReviewBtnClick();
    }}>Add review</a>
  );
};

AddReviewBtn.propTypes = {
  onAddReviewBtnClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onAddReviewBtnClick() {
    dispatch(ScreenActionCreator.changeScreen(ScreenType.ADD_REVIEW));
  }
});

export {AddReviewBtn};

export default connect(null, mapDispatchToProps)(AddReviewBtn);
