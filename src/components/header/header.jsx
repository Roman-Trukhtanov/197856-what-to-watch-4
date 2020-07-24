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
    screen,
    onSignInClick,
    user,
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

  const linkOnMain = screen !== ScreenType.MAIN ? `/` : null;

  const isSignIn = authorizationStatus === AuthorizationStatus.AUTH ?
    getUserItem() : getSignInItem();

  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <a href={linkOnMain} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      {isSignIn}
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatarSrc: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatus(state),
  screen: getScreen(state),
  user: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSignInClick() {
    dispatch(ScreenActionCreator.changeScreen(ScreenType.SIGN_IN));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
