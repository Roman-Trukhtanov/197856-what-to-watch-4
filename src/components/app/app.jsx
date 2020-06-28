import React, {PureComponent} from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from "prop-types";
import Main from '../main/main';
import MovieScreen from "../movie-screen/movie-screen";
import {ScreenType} from "../../data";

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

  _renderScreen() {
    const {screen} = this.state;
    const {
      promoMovieData,
      movies,
      movieInfo,
      movieOverview,
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
            movieInfo={movieInfo[0]}
            movieOverview={movieOverview[0]}
          />
        );
    }

    return null;
  }

  render() {
    const {
      movieInfo,
      movieOverview,
    } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderScreen()}
          </Route>
          <Route exact path="/dev-component">
            <MovieScreen
              movieInfo={movieInfo[0]}
              movieOverview={movieOverview[0]}
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
  movieInfo: PropTypes.object.isRequired,
  movieOverview: PropTypes.object.isRequired,
};

export default App;
