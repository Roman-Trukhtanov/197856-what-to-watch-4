import React, {PureComponent} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Main from '../main/main';
import MovieScreen from "../movie-screen/movie-screen";
import {ScreenType} from "../../const";
import FullVideoPlayer from "../full-video-player/full-video-player";
import withVideo from "../../hocs/with-video/with-video";
import {getMovieComments, getMovies, getPromoMovie} from "../../reducer/data/selectors";
import {
  getFilteredMovies,
  getMovieCollectionNumber,
  getGenresList, getSelectedMovieID, getRandomMovies,
} from "../../reducer/app-state/selectors";
import {getScreen} from "../../reducer/screen/selectors";
import {ActionCreator as AppStateActionCreator} from "../../reducer/app-state/app-state";
import {ActionCreator as ScreenActionCreator} from "../../reducer/screen/screen";
import {Operation as DataOperation} from "../../reducer/data/data";

const FullVideoPlayerWrapped = withVideo(FullVideoPlayer);

class App extends PureComponent {
  _renderScreen() {
    const {
      screen,
      promoMovieData,
      selectedMovieID,
      randomMovies,
      movies,
      genres,
      movieComments,
      filteredMovies,
      movieCollectionNumber,
      onMovieCardTitleClick,
    } = this.props;

    const currentMovie = movies.find((movie) => movie.id === selectedMovieID);

    switch (screen) {
      case ScreenType.MAIN:
        return (
          <Main
            promoMovieData={promoMovieData}
            genres={genres}
            filteredMovies={filteredMovies}
            movieCollectionNumber={movieCollectionNumber}
            onMovieCardTitleClick={onMovieCardTitleClick}
          />
        );
      case ScreenType.MOVIE:
        return (
          <MovieScreen
            moreMovies={randomMovies}
            movie={currentMovie}
            movieComments={movieComments}
            onMovieCardTitleClick={onMovieCardTitleClick}
          />
        );
      case ScreenType.PLAYER:
        return (
          <FullVideoPlayerWrapped
            isStartPlaying={false}
            title={currentMovie.title}
            previewImgSrc={currentMovie.previewImgSrc}
            videoData={currentMovie.fullVideo}
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
              moreMovies={movies.slice(0, 4)}
              movie={movies[0]}
              movieComments={movieComments}
              onMovieCardTitleClick={onMovieCardTitleClick}
            />
          </Route>
          <Route exact path="/dev-player">
            <FullVideoPlayerWrapped
              isStartPlaying={true}
              title={movies[0].title}
              previewImgSrc={movies[0].previewImgSrc}
              videoData={movies[0].fullVideo}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  selectedMovieID: PropTypes.number.isRequired,
  screen: PropTypes.string.isRequired,
  promoMovieData: PropTypes.object.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  randomMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  movieComments: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  movieCollectionNumber: PropTypes.number.isRequired,
  onMovieCardTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedMovieID: getSelectedMovieID(state),
  screen: getScreen(state),
  randomMovies: getRandomMovies(state),
  movies: getMovies(state),
  genres: getGenresList(state),
  promoMovieData: getPromoMovie(state),
  filteredMovies: getFilteredMovies(state),
  movieCollectionNumber: getMovieCollectionNumber(state),
  movieComments: getMovieComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMovieCardTitleClick(movieID) {
    dispatch(AppStateActionCreator.setSelectedMovieID(movieID));
    dispatch(ScreenActionCreator.changeScreen(ScreenType.MOVIE));
    dispatch(DataOperation.loadMovieComments(movieID));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
