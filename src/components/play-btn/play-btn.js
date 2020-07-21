import React from "react";
import PropTypes from "prop-types";
import {ActionCreator as ScreenActionCreator} from "../../reducer/screen/screen";
import {ActionCreator as AppStateActionCreator} from "../../reducer/app-state/app-state";
import {ScreenType} from "../../const";
import {connect} from "react-redux";

const PlayBtn = (props) => {
  const {
    onPlayBtnClick,
    movieData,
  } = props;

  const playMovie = (evt) => {
    evt.preventDefault();

    if (movieData) {
      onPlayBtnClick(movieData.id);
      return;
    }

    onPlayBtnClick();
  };

  return (
    <button className="btn btn--play movie-card__button" type="button" onClick={playMovie}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"/>
      </svg>
      <span>Play</span>
    </button>
  );
};

PlayBtn.propTypes = {
  movieData: PropTypes.object,
  onPlayBtnClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onPlayBtnClick(movieID) {
    if (movieID) {
      dispatch(AppStateActionCreator.setSelectedMovieID(movieID));
    }

    dispatch(ScreenActionCreator.changeScreen(ScreenType.PLAYER));
  }
});

export {PlayBtn};

export default connect(null, mapDispatchToProps)(PlayBtn);
