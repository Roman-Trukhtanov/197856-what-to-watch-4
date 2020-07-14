import React from "react";
import PropTypes from "prop-types";
import {TabType} from "../../mocks/const";

const MovieNav = (props) => {
  const {
    currentTab,
    onNavItemClick,
  } = props;

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {Object.values(TabType).map((tabType, index) => (
          <li
            key={`tab-type-${index}`}
            className={`movie-nav__item ${
              currentTab === tabType ? `movie-nav__item--active` : ``
            }`}>
            <a href="#" className="movie-nav__link" onClick={(evt) => {
              onNavItemClick(evt, tabType);
            }}>
              {tabType[0].toUpperCase() + tabType.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

MovieNav.propTypes = {
  currentTab: PropTypes.string.isRequired,
  onNavItemClick: PropTypes.func.isRequired,
};

export default MovieNav;
