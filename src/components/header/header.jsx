import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AuthorizationStatus, ScreenType} from '../../const.js';
import {getAuthStatus, getUserData} from '../../reducer/user/selector.js';
import {getScreen} from "../../reducer/screen/selectors";
import {ActionCreator as ScreenActionCreator} from "../../reducer/screen/screen";

const Header = (props) => {
  const {
    authorizationStatus,
    movie,
    screen,
    user,
    onSignInClick,
    onBreadcrumbsClick,
    onMainLogoClick,
  } = props;

  const getUserItem = () => (
    <div className="user-block">
      <div className="user-block__avatar">
        <img src={user.avatarSrc} alt={user.name} width="63" height="63" />
      </div>
    </div>
  );

  const getSignInItem = () => (
    <div className="user-block">
      <a href="/sign-in" className="user-block__link"
        onClick={(evt) => {
          evt.preventDefault();
          onSignInClick();
        }}
      >Sign in</a>
    </div>
  );

  const getBreadCrumbs = () => (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <a href="#" className="breadcrumbs__link" onClick={(evt) => {
            evt.preventDefault();
            onBreadcrumbsClick();
          }}>{movie.title}</a>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );

  const linkOnMain = screen !== ScreenType.MAIN ? `/` : null;

  const isSignIn = authorizationStatus === AuthorizationStatus.AUTH ?
    getUserItem() : getSignInItem();

  const isReview = screen === ScreenType.ADD_REVIEW ? getBreadCrumbs(movie) : null;

  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <a href={linkOnMain} className="logo__link" onClick={(evt) => {
          evt.preventDefault();

          onMainLogoClick();
        }}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      {isReview}

      {isSignIn}
    </header>
  );
};

Header.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  authorizationStatus: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatarSrc: PropTypes.string.isRequired,
  }),
  onSignInClick: PropTypes.func.isRequired,
  onBreadcrumbsClick: PropTypes.func.isRequired,
  onMainLogoClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatus(state),
  screen: getScreen(state),
  user: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSignInClick() {
    dispatch(ScreenActionCreator.changeScreen(ScreenType.SIGN_IN));
  },
  onMainLogoClick() {
    dispatch(ScreenActionCreator.changeScreen(ScreenType.MAIN));
  },
  onBreadcrumbsClick() {
    dispatch(ScreenActionCreator.changeScreen(ScreenType.MOVIE));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
