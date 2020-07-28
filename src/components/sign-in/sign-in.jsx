import React, {PureComponent, Fragment, createRef} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {AppRoute} from "../../const";
import {getAuthError} from "../../reducer/user/selector.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

import Footer from "../footer/footer";

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.emailRef = createRef();
    this.passwordRef = createRef();

    this._authSubmit = this._authSubmit.bind(this);
  }

  _getInvalidMessage() {
    return (
      <div className="sign-in__message">
        <p>Please enter a valid email address</p>
      </div>
    );
  }

  _authSubmit(evt) {
    const {onAuthSubmit} = this.props;

    evt.preventDefault();

    const email = this.emailRef.current.value;
    const password = this.passwordRef.current.value;

    onAuthSubmit({
      email,
      password,
    });
  }

  render() {
    const {authorizationError} = this.props;

    const isInvalidMessage = authorizationError ? this._getInvalidMessage() : ``;

    const emailClassNames = [`sign-in__field`];

    if (authorizationError) {
      emailClassNames.push(`sign-in__field--error`);
    }

    return (
      <Fragment>
        <div className="user-page">
          <header className="page-header user-page__head">
            <div className="logo">
              <Link to={AppRoute.ROOT} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <h1 className="page-title user-page__title">Sign in</h1>
          </header>

          <div className="sign-in user-page__content">
            <form action="#" className="sign-in__form"
              onSubmit={this._authSubmit}
            >
              {isInvalidMessage}

              <div className="sign-in__fields">
                <div className={emailClassNames.join(` `)}>
                  <input
                    className="sign-in__input"
                    type="email"
                    placeholder="Email address"
                    name="user-email"
                    id="user-email"
                    ref={this.emailRef}
                    required
                  />
                  <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
                </div>
                <div className="sign-in__field">
                  <input
                    className="sign-in__input"
                    type="password"
                    placeholder="Password"
                    name="user-password"
                    id="user-password"
                    ref={this.passwordRef}
                    required
                  />
                  <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
                </div>
              </div>
              <div className="sign-in__submit">
                <button className="sign-in__btn" type="submit">Sign in</button>
              </div>
            </form>
          </div>

          <Footer />
        </div>
      </Fragment>
    );
  }
}

SignIn.propTypes = {
  authorizationError: PropTypes.bool.isRequired,
  onAuthSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationError: getAuthError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAuthSubmit(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
