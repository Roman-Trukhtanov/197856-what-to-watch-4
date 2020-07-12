import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {TabType} from "../../mocks/movies-data";
import OverviewTab from "../overview-tab/overview-tab";
import DetailsTab from "../details-tab/details-tab";
import ReviewsTab from "../reviews-tab/reviews-tab";
import MovieNav from "../movie-nav/movie-nav";

const Tabs = (props) => {
  const {
    movieOverview,
    movieDetails,
    movieComments,
    onItemClick,
    activeItem,
  } = props;

  const renderTab = () => {
    switch (activeItem) {
      case TabType.OVERVIEW:
        return (
          <OverviewTab
            movieOverview={movieOverview}
          />
        );
      case TabType.DETAILS:
        return (
          <DetailsTab
            movieDetails={movieDetails}
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
  movieOverview: PropTypes.object.isRequired,
  movieDetails: PropTypes.object.isRequired,
  movieComments: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
};

export default Tabs;
