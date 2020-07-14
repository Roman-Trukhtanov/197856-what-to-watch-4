import React, {PureComponent} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer";
import Main from '../main/main';
import MovieScreen from "../movie-screen/movie-screen";
import {GenreType, ScreenType} from "../../mocks/const";
import {getFilteredMovies, getGenresList} from "../../utils";

const MAX_FILTERED_MOVIES = 4;

class App extends PureComponent {
  _renderScreen() {
    const {
      screen,
      promoMovieData,
      movies,
      movieComments,
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
            movie={movies[0]}
            movieComments={movieComments[0]}
            onMovieCardTitleClick={onMovieCardTitleClick}
          />
        );
    }

    return null;
  }

  render() {
    const {
      movies,
      movieComments,
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
              movie={movies[0]}
              movieComments={movieComments[0]}
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
  movieComments: PropTypes.arrayOf(PropTypes.object).isRequired,
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
