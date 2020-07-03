import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
import {TabType} from "../../mocks/movies-data";
import OverviewTab from "../overview-tab/overview-tab";
import DetailsTab from "../details-tab/details-tab";
import ReviewsTab from "../reviews-tab/reviews-tab";
import MovieNav from "../movie-nav/movie-nav";

class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: TabType.OVERVIEW,
    };

    this._handleMovieNavItemClick = this._handleMovieNavItemClick.bind(this);
  }

  _changeTab(tabType) {
    this.setState({
      currentTab: tabType,
    });
  }

  _handleMovieNavItemClick(evt, tabType) {
    evt.preventDefault();

    this._changeTab(tabType);
  }

  _renderTab() {
    const {currentTab} = this.state;

    const {
      movieOverview,
      movieDetails,
      movieComments,
    } = this.props;

    switch (currentTab) {
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
  }

  render() {
    const {currentTab} = this.state;

    return (
      <Fragment>
        <MovieNav
          currentTab={currentTab}
          onNavItemClick={this._handleMovieNavItemClick}
        />

        {this._renderTab()}
      </Fragment>
    );
  }
}

Tabs.propTypes = {
  movieOverview: PropTypes.object.isRequired,
  movieDetails: PropTypes.object.isRequired,
  movieComments: PropTypes.object.isRequired,
};

export default Tabs;
