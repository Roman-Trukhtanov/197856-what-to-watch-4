import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";

const ShowMore = (props) => {
  const {onShowMoreBtnClick} = props;

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onShowMoreBtnClick}>Show more</button>
    </div>
  );
};

ShowMore.propTypes = {
  onShowMoreBtnClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onShowMoreBtnClick(evt) {
    evt.preventDefault();

    dispatch(ActionCreator.incrementCollection());
  },
});

export {ShowMore};

export default connect(null, mapDispatchToProps)(ShowMore);
