import React, {PureComponent} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer";
import Main from '../main/main';
import MovieScreen from "../movie-screen/movie-screen";
import {ScreenType} from "../../mocks/data";
import {GenreType} from "../../mocks/movies";
import {getFilteredMovies, getGenresList} from "../../utils";

const MAX_FILTERED_MOVIES = 4;

class App extends PureComponent {
  _renderScreen() {
    const {
      screen,
      promoMovieData,
      movies,
      movieInfo,
      moviesOverview,
      moviesDetails,
      moviesComments,
      filteredMovies,
      movieCollectionNumber,
      onMovieCardTitleClick,
    } = this.props;

    switch (screen) {
      case ScreenType.MAIN:
        return (
          <Main
            promoMovieData={promoMovieData}
            genres={getGenresList(movies)}
            filteredMovies={filteredMovies}
            movieCollectionNumber={movieCollectionNumber}
            onMovieCardTitleClick={onMovieCardTitleClick}
          />
        );
      case ScreenType.MOVIE:
        return (
          <MovieScreen
            movies={getFilteredMovies(GenreType.THRILLERS, movies, MAX_FILTERED_MOVIES)}
            movieInfo={movieInfo[0]}
            movieOverview={moviesOverview[0]}
            movieDetails={moviesDetails[0]}
            movieComments={moviesComments[0]}
            onMovieCardTitleClick={onMovieCardTitleClick}
          />
        );
    }

    return null;
  }

  render() {
    const {
      movies,
      movieInfo,
      moviesOverview,
      moviesDetails,
      moviesComments,
      onMovieCardTitleClick,
    } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderScreen()}
          </Route>
          <Route exact path="/dev-component">
            <MovieScreen
              movies={getFilteredMovies(GenreType.FANTASY, movies, MAX_FILTERED_MOVIES)}
              movieInfo={movieInfo[0]}
              movieOverview={moviesOverview[0]}
              movieDetails={moviesDetails[0]}
              movieComments={moviesComments[0]}
              onMovieCardTitleClick={onMovieCardTitleClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  screen: PropTypes.string.isRequired,
  promoMovieData:
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
    }),
  movies: PropTypes.array.isRequired,
  movieInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
  moviesOverview: PropTypes.arrayOf(PropTypes.object).isRequired,
  moviesDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
  moviesComments: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  movieCollectionNumber: PropTypes.number.isRequired,
  onMovieCardTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  screen: state.screen,
  filteredMovies: state.filteredMovies,
  movieCollectionNumber: state.movieCollectionNumber,
});

const mapDispatchToProps = (dispatch) => ({
  onMovieCardTitleClick() {
    dispatch(ActionCreator.changeScreen(ScreenType.MOVIE));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
