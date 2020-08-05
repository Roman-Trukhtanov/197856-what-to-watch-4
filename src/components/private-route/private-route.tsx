import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppRoute} from "../../const";
import {AuthorizationStatus} from "../../const";
import {getAuthStatus} from "../../reducer/user/selector";
import {RootState} from "../../reducer/reducer";

interface Props {
  authorizationStatus: string;
  exact: boolean;
  path: string;
  render: (props) => React.ReactNode;
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(routeProps)
            : <Redirect to={AppRoute.SIGN_IN} />
        );
      }}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  authorizationStatus: getAuthStatus(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
