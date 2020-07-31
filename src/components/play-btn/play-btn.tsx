import React, {MouseEvent} from "react";
import history from "../../history";
import {ScreenType} from "../../const";
import {Movie} from "../../types";

interface Props {
  movieData: Movie;
}

const PlayBtn: React.FunctionComponent<Props> = (props: Props) => {
  const {
    movieData,
  } = props;

  const playMovie = (evt: MouseEvent<HTMLButtonElement>): void => {
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

export {PlayBtn};

export default PlayBtn;
