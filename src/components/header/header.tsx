import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {AppRoute, ScreenType, AuthorizationStatus} from "../../const";
import {getAuthStatus, getUserData} from "../../reducer/user/selector";
import history from "../../history";
import {RootState} from "../../reducer/reducer";
import {Movie, User} from "../../types";

interface Props {
  movie?: Movie;
  isReview?: boolean;
  authorizationStatus?: string;
  user?: User;
  isMyListScreen?: boolean;
  isMovieScreen?: boolean;
}

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const {
    authorizationStatus,
    movie,
    isReview,
    user,
    isMyListScreen,
    isMovieScreen,
  } = props;

  const isRootScreen: boolean = history.location.pathname === AppRoute.ROOT;

  const getMyListTitle = (): React.ReactNode => {
    return (
      <h1 className="page-title user-page__title">My list</h1>
    );
  };

  const getUserAvatar = (userData: User): React.ReactNode => {
    const linkToScreen = isMyListScreen
      ? AppRoute.ROOT
      : AppRoute.MY_LIST;

    return (
      <Link to={linkToScreen} className="user-block__avatar-link">
        <img src={userData.avatarSrc} alt={userData.name} width="63" height="63" />
      </Link>
    );
  };

  const getUserItem = (): React.ReactNode => (
    <div className="user-block">
      <div className="user-block__avatar">
        {getUserAvatar(user)}
      </div>
    </div>
  );

  const getSignInItem = (): React.ReactNode => (
    <div className="user-block">
      <Link to={AppRoute.SIGN_IN} className="user-block__link">Sign in</Link>
    </div>
  );

  const getBreadCrumbs = (movieData: Movie): React.ReactNode => (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link
            to={`/${ScreenType.FILMS}/${movieData.id}`}
            className="breadcrumbs__link"
          >
            {movieData.title}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );

  const getLogo = (): React.ReactNode => {
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

  const isSignIn: React.ReactNode = authorizationStatus === AuthorizationStatus.AUTH ?
    getUserItem() : getSignInItem();

  const getHeaderClassName = (): string => {
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

const mapStateToProps = (state: RootState) => ({
  authorizationStatus: getAuthStatus(state),
  user: getUserData(state),
});

export {Header};
export default connect(mapStateToProps)(Header);
