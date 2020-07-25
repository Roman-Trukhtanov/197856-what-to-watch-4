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
import SignIn from "../sign-in/sign-in";
import {AuthorizationStatus} from "../../const";
import {getAuthStatus} from "../../reducer/user/selector";
import AddReview from "../add-review/add-review";
import withReview from "../../hocs/with-review/with-review";

const FullVideoPlayerWrapped = withVideo(FullVideoPlayer);

const AddReviewWrapped = withReview(AddReview);

class App extends PureComponent {
  _renderScreen() {
    const {screen} = this.props;

    switch (screen) {
      case ScreenType.MAIN:
        return this._renderMainScreen();
      case ScreenType.MOVIE:
        return this._renderMovieScreen();
      case ScreenType.PLAYER:
        return this._renderFullVideoPlayer();
      case ScreenType.ADD_REVIEW:
        return this._renderAddReviewScreen();
      case ScreenType.SIGN_IN:
        return this._renderSignInScreen();
    }

    return null;
  }

  _getCurrentMovie() {
    const {
      movies,
      selectedMovieID
    } = this.props;

    return movies.find((movie) => movie.id === selectedMovieID);
  }

  _renderMainScreen() {
    const {
      promoMovieData,
      genres,
      filteredMovies,
      movieCollectionNumber,
      onMovieCardTitleClick,
    } = this.props;

    return (
      <Main
        promoMovieData={promoMovieData}
        genres={genres}
        filteredMovies={filteredMovies}
        movieCollectionNumber={movieCollectionNumber}
        onMovieCardTitleClick={onMovieCardTitleClick}
      />
    );
  }

  _renderMovieScreen() {
    const {
      authorizationStatus,
      randomMovies,
      movieComments,
      onMovieCardTitleClick,
    } = this.props;

    return (
      <MovieScreen
        authorizationStatus={authorizationStatus}
        moreMovies={randomMovies}
        movie={this._getCurrentMovie()}
        movieComments={movieComments}
        onMovieCardTitleClick={onMovieCardTitleClick}
      />
    );
  }

  _renderFullVideoPlayer() {
    const currentMovie = this._getCurrentMovie();

    return (
      <FullVideoPlayerWrapped
        isStartPlaying={false}
        title={currentMovie.title}
        previewImgSrc={currentMovie.previewImgSrc}
        videoData={currentMovie.fullVideo}
      />
    );
  }

  _renderSignInScreen() {
    const {authorizationStatus} = this.props;

    return authorizationStatus === AuthorizationStatus.NO_AUTH
      ? <SignIn/>
      : this._renderMainScreen();
  }
  _renderAddReviewScreen() {
    return (
      <AddReviewWrapped
        movie={this._getCurrentMovie()}
      />
    );
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
              authorizationStatus={AuthorizationStatus.AUTH}
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
          <Route exact path="/dev-review">
            <AddReviewWrapped
              movie={movies[0]}
            />
          </Route>
          <Route exact path="/sign-in">
            <SignIn/>
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
  authorizationStatus: PropTypes.string.isRequired,
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
  authorizationStatus: getAuthStatus(state),
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
