import React from "react";
import PropTypes from "prop-types";
import history from "../../history";
import {ScreenType} from "../../const";

const PlayBtn = (props) => {
  const {
    movieData,
  } = props;

  const playMovie = (evt) => {
    evt.preventDefault();

    history.push(`/${ScreenType.PLAYER}/${movieData.id}`);
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
  movieData: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export {PlayBtn};

export default PlayBtn;
