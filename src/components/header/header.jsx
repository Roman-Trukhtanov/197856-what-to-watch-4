import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {AppRoute, ScreenType, AuthorizationStatus} from "../../const";
import {getAuthStatus, getUserData} from "../../reducer/user/selector.js";
import history from "../../history";

const Header = (props) => {
  const {
    authorizationStatus,
    movie,
    isReview,
    user,
    isMyListScreen,
    isMovieScreen,
  } = props;

  const isRootScreen = history.location.pathname === AppRoute.ROOT;

  const getMyListTitle = () => {
    return (
      <h1 className="page-title user-page__title">My list</h1>
    );
  };

  const getUserAvatar = () => {
    const linkToScreen = isMyListScreen
      ? AppRoute.ROOT
      : AppRoute.MY_LIST;

    return (
      <Link to={linkToScreen} className="user-block__avatar-link">
        <img src={user.avatarSrc} alt={user.name} width="63" height="63" />
      </Link>
    );
  };

  const getUserItem = () => (
    <div className="user-block">
      <div className="user-block__avatar">
        {getUserAvatar()}
      </div>
    </div>
  );

  const getSignInItem = () => (
    <div className="user-block">
      <Link to={AppRoute.SIGN_IN} className="user-block__link">Sign in</Link>
    </div>
  );

  const getBreadCrumbs = () => (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link
            to={`/${ScreenType.FILMS}/${movie.id}`}
            className="breadcrumbs__link"
          >
            {movie.title}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );

  const getLogo = () => {
    const logoItems = (
      <Fragment>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Fragment>
    );

    if (isRootScreen) {
      return (
        <a className="logo__link">
          {logoItems}
        </a>
      );
    } else {
      return (
        <Link to={AppRoute.ROOT} className="logo__link">
          {logoItems}
        </Link>
      );
    }
  };

  const isSignIn = authorizationStatus === AuthorizationStatus.AUTH ?
    getUserItem() : getSignInItem();

  const getHeaderClassName = () => {
    if (isMovieScreen || isRootScreen) {
      return `movie-card__head`;
    } else {
      return `user-page__head`;
    }
  };

  return (
    <header className={`page-header ${getHeaderClassName()}`}>
      <div className="logo">
        {getLogo()}
      </div>

      {isReview ? getBreadCrumbs(movie) : null}

      {isMyListScreen ? getMyListTitle() : null}

      {isSignIn}
    </header>
  );
};

Header.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  isReview: PropTypes.bool,
  authorizationStatus: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatarSrc: PropTypes.string.isRequired,
  }),
  isMyListScreen: PropTypes.bool,
  isMovieScreen: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatus(state),
  user: getUserData(state),
});

export {Header};
export default connect(mapStateToProps)(Header);
