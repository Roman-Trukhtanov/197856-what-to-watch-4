import React, {Fragment, MouseEvent} from "react";
import OverviewTab from "../overview-tab/overview-tab";
import DetailsTab from "../details-tab/details-tab";
import ReviewsTab from "../reviews-tab/reviews-tab";
import MovieNav from "../movie-nav/movie-nav";
import {TabType} from "../../const";
import {Movie} from "../../types";

interface Props {
  movie: Movie;
  onItemClick: (evt: MouseEvent<HTMLAnchorElement>, tabType: string) => void;
  activeItem: string;
}

const Tabs: React.FunctionComponent<Props> = (props: Props) => {
  const {
    movie,
    onItemClick,
    activeItem,
  } = props;

  const renderTab = (): React.ReactNode => {
    switch (activeItem) {
      case TabType.OVERVIEW:
        return (
          <OverviewTab
            movie={movie}
          />
        );
      case TabType.DETAILS:
        return (
          <DetailsTab
            movie={movie}
          />
        );
      case TabType.REVIEWS:
        return (
          <ReviewsTab/>
        );
    }

    return null;
  };

  return (
    <Fragment>
      <MovieNav
        currentTab={activeItem}
        onNavItemClick={onItemClick}
      />

      {renderTab()}
    </Fragment>
  );
};

export default Tabs;
