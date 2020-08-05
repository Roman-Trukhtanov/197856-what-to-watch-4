import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

interface Props {
  isRootScreen?: boolean;
}

const Footer: React.FunctionComponent<Props> = (props: Props) => {
  const {isRootScreen} = props;

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
        <a className="logo__link logo__link--light">
          {logoItems}
        </a>
      );
    } else {
      return (
        <Link to={AppRoute.ROOT} className="logo__link logo__link--light">
          {logoItems}
        </Link>
      );
    }
  };

  return (
    <footer className="page-footer">
      <div className="logo">
        {getLogo()}
      </div>

      <div className="copyright">
        <p>© 2020 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
