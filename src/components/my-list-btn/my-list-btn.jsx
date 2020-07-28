import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation as DataOperation} from "../../reducer/data/data";
import {AppRoute, AuthorizationStatus} from "../../const";
import {getAuthStatus} from "../../reducer/user/selector";
import history from "../../history";
import {getPromoMovie} from "../../reducer/data/selectors";

const MyListBtn = (props) => {
  const {
    movie,
    promoMovie,
    onMyListClick,
    authorizationStatus,
  } = props;

  const {isFavorite} = movie;

  const sendFavoriteStatus = (evt) => {
    evt.preventDefault();

    const isFavoriteStatus = Number(!isFavorite);

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.SIGN_IN);
      return;
    }

    const isPromoMovie = promoMovie.id === movie.id;

    onMyListClick(movie, isFavoriteStatus, Boolean(isPromoMovie));
  };

  const getBtnSvg = () => {
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

MyListBtn.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }),
  promoMovie: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  authorizationStatus: PropTypes.string.isRequired,
  onMyListClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovie: getPromoMovie(state),
  authorizationStatus: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMyListClick(filmID, status, isPromoMovie) {
    dispatch(DataOperation.postFavoriteMovie(filmID, status, isPromoMovie));
  }
});

export {MyListBtn};
export default connect(mapStateToProps, mapDispatchToProps)(MyListBtn);
