import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {AppRoute} from "../../const";
import {reloadPage} from "../../utils";

const ShowError = (props) => {
  const {
    isNotFound,
    errorMessage,
  } = props;

  const pageContentStyle = {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
  };

  const messageWrapStyle = {
    display: `flex`,
    justifyContent: `center`
  };

  const commonBtnStyle = {
    fontSize: `24px`,
    lineHeight: `26px`,
  };

  const getBtn = () => {
    if (!isNotFound) {
      return (
        <button
          className="btn"
          onClick={reloadPage}
          style={commonBtnStyle}
        >
          Click to reload!
        </button>
      );
    } else {
      return (
        <Link
          to={AppRoute.ROOT}
          className="btn"
          style={commonBtnStyle}
        >
          Go to main page!
        </Link>
      );
    }
  };

  const getMessage = () => {
    return (
      <Fragment>
        {
          !isNotFound &&
          <div className="sign-in__message">
            <p>Something went wrong, please try again...</p>
          </div>
        }

        <div className="sign-in__message">
          <p>{errorMessage.toString()}</p>
        </div>
        <div className="sign-in__message" style={messageWrapStyle}>
          {getBtn()}
        </div>
      </Fragment>
    );
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>
      </header>

      <div className="sign-in user-page__content" style={pageContentStyle}>
        {getMessage()}
      </div>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2020 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

ShowError.propTypes = {
  isNotFound: PropTypes.bool,
  errorMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

export default ShowError;
