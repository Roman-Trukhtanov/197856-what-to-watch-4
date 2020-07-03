import React, {PureComponent} from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from "prop-types";
import Main from '../main/main';
import MovieScreen from "../movie-screen/movie-screen";
import {ScreenType} from "../../data";
import {GenreType} from "../../mocks/movies";

const MAX_FILTERED_MOVIES = 4;

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
    this._handleMovieCardTitleClick = this._handleMovieCardTitleClick.bind(this);

    this.state = {
      screen: ScreenType.MAIN,
    };
  }

  _changeScreen(screenType) {
    this.setState({
      screen: screenType,
    });
  }

  _handleMovieCardTitleClick(evt) {
    evt.preventDefault();

    this._changeScreen(ScreenType.MOVIE);
  }

  _getFilteredMovies(movies, genre) {
    return movies.filter((movie) => movie.genre === genre).slice(0, MAX_FILTERED_MOVIES);
  }

  _renderScreen() {
    const {screen} = this.state;
    const {
      promoMovieData,
      movies,
      movieInfo,
      moviesOverview,
      moviesDetails,
      moviesComments,
    } = this.props;

    switch (screen) {
      case ScreenType.MAIN:
        return (
          <Main
            promoMovieData={promoMovieData}
            movies={movies}
            onMovieCardTitleClick={this._handleMovieCardTitleClick}
          />
        );
      case ScreenType.MOVIE:
        return (
          <MovieScreen
            movies={this._getFilteredMovies(movies, GenreType.THRILLER)}
            movieInfo={movieInfo[0]}
            movieOverview={moviesOverview[0]}
            movieDetails={moviesDetails[0]}
            movieComments={moviesComments[0]}
            onMovieCardTitleClick={this._handleMovieCardTitleClick}
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
    } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderScreen()}
          </Route>
          <Route exact path="/dev-component">
            <MovieScreen
              movies={this._getFilteredMovies(movies, GenreType.FANTASY)}
              movieInfo={movieInfo[0]}
              movieOverview={moviesOverview[0]}
              movieDetails={moviesDetails[0]}
              movieComments={moviesComments[0]}
              onMovieCardTitleClick={this._handleMovieCardTitleClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
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
};

export default App;
