import React, {Fragment} from "react";
import PropTypes from "prop-types";
import OverviewTab from "../overview-tab/overview-tab";
import DetailsTab from "../details-tab/details-tab";
import ReviewsTab from "../reviews-tab/reviews-tab";
import MovieNav from "../movie-nav/movie-nav";
import {TabType} from "../../mocks/const";

const Tabs = (props) => {
  const {
    movie,
    movieComments,
    onItemClick,
    activeItem,
  } = props;

  const renderTab = () => {
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
          <ReviewsTab
            movieComments={movieComments}
          />
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

Tabs.propTypes = {
  movie: PropTypes.object.isRequired,
  movieComments: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
};

export default Tabs;
