import React from "react";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer";
import {ScreenType} from "../../mocks/const";
import {connect} from "react-redux";

const PlayBtn = (props) => {
  const {onPlayBtnClick} = props;

  return (
    <button className="btn btn--play movie-card__button" type="button" onClick={onPlayBtnClick}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"/>
      </svg>
      <span>Play</span>
    </button>
  );
};

PlayBtn.propTypes = {
  onPlayBtnClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onPlayBtnClick() {
    dispatch(ActionCreator.changeScreen(ScreenType.PLAYER));
  }
});

export {PlayBtn};

export default connect(null, mapDispatchToProps)(PlayBtn);
