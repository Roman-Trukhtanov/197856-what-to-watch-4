import React, {MouseEvent} from "react";
import {connect} from "react-redux";
import {Operation as DataOperation} from "../../reducer/data/data";
import {AppRoute, AuthorizationStatus} from "../../const";
import {getAuthStatus} from "../../reducer/user/selector";
import history from "../../history";
import {getPromoMovie} from "../../reducer/data/selectors";
import {FavoriteStatus, Movie} from "../../types";
import {RootState} from "../../reducer/reducer";
import {AppDispatch} from "../../index";

interface Props {
  movie: Movie;
  promoMovie: Movie;
  authorizationStatus: string;
  onMyListClick: (
    movie: Movie,
    isFavoriteStatus: number,
    isPromoMovie: boolean,
  ) => void;
}

const MyListBtn: React.FunctionComponent<Props> = (props: Props) => {
  const {
    movie,
    promoMovie,
    onMyListClick,
    authorizationStatus,
  } = props;

  const {isFavorite} = movie;

  const sendFavoriteStatus = (evt: MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();

    const isFavoriteStatus = Number(!isFavorite);

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.SIGN_IN);
      return;
    }

    const isPromoMovie = promoMovie.id === movie.id;

    onMyListClick(movie, isFavoriteStatus, Boolean(isPromoMovie));
  };

  const getBtnSvg = (): React.ReactNode => {
    if (isFavorite) {
      return (
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"/>
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"/>
        </svg>
      );
    }
  };

  return (
    <button className="btn btn--list movie-card__button" type="button" onClick={sendFavoriteStatus}>
      {getBtnSvg()}
      <span>My list</span>
    </button>
  );
};

const mapStateToProps = (state: RootState) => ({
  promoMovie: getPromoMovie(state),
  authorizationStatus: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onMyListClick(film: Movie, status: FavoriteStatus, isPromoMovie: boolean) {
    dispatch(DataOperation.postFavoriteMovie(film, status, isPromoMovie));
  }
});

export {MyListBtn};
export default connect(mapStateToProps, mapDispatchToProps)(MyListBtn);
