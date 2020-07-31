import React, {MouseEvent} from "react";
import {TabType} from "../../const";

interface Props {
  currentTab: string;
  onNavItemClick: (evt: MouseEvent<HTMLAnchorElement>, tabType: string) => void;
}

const MovieNav: React.FunctionComponent<Props> = (props: Props) => {
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

export default MovieNav;
