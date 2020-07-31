import React, {PureComponent, Fragment, createRef, RefObject} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {AppRoute} from "../../const";
import {getAuthError} from "../../reducer/user/selector";
import {Operation as UserOperation} from "../../reducer/user/user";

import Footer from "../footer/footer";
import {RootState} from "../../reducer/reducer";
import {UserData} from "../../types";
import {AppDispatch} from "../../index";

interface Props {
  authorizationError: boolean;
  onAuthSubmit: (userData: UserData) => void;
}

class SignIn extends PureComponent<Props, {}> {
  private _emailRef: RefObject<HTMLInputElement>;
  private _passwordRef: RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this._emailRef = createRef();
    this._passwordRef = createRef();

    this._authSubmit = this._authSubmit.bind(this);
  }

  _getInvalidMessage(): React.ReactNode {
    return (
      <div className="sign-in__message">
        <p>Please enter a valid email address</p>
      </div>
    );
  }

  _authSubmit(evt): void {
    const {onAuthSubmit} = this.props;

    evt.preventDefault();

    const email = this._emailRef.current.value;
    const password = this._passwordRef.current.value;

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
                    ref={this._emailRef}
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
                    ref={this._passwordRef}
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

const mapStateToProps = (state: RootState) => ({
  authorizationError: getAuthError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onAuthSubmit(authData: UserData) {
    dispatch(UserOperation.login(authData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
