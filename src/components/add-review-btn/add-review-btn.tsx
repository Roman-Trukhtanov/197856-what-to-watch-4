import React from "react";
import {Link} from "react-router-dom";
import {ScreenType} from "../../const";
import {Movie} from "../../types";

interface Props {
  movie: Movie;
}

const AddReviewBtn: React.FunctionComponent<Props> = (props: Props) => {
  const {movie} = props;

  return (
    <Link to={`/${ScreenType.FILMS}/${movie.id}/${ScreenType.REVIEW}`} className="btn movie-card__button">Add review</Link>
  );
};

export {AddReviewBtn};

export default AddReviewBtn;
