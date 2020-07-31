import React, {PureComponent} from "react";
import {Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import {
  AppRoute,
  PAGE_NOT_FOUND_TEXT,
  ScreenType,
  AuthorizationStatus,
} from "../../const";

import {getFavoriteMovies, getMovies, getPromoMovie} from "../../reducer/data/selectors";
import {getAuthStatus} from "../../reducer/user/selector";
import {
  getFilteredMovies,
  getMovieCollectionNumber,
  getGenresList, getSelectedMovieID, getRandomMovies,
} from "../../reducer/app-state/selectors";

import {ActionCreator as AppStateActionCreator} from "../../reducer/app-state/app-state";
import {Operation as DataOperation} from "../../reducer/data/data";
import history from "../../history";

import withReview from "../../hocs/with-review/with-review";
import withVideo from "../../hocs/with-video/with-video";

import PrivateRoute from "../private-route/private-route";
import Main from "../main/main";
import MovieScreen from "../movie-screen/movie-screen";
import FullVideoPlayer from "../full-video-player/full-video-player";
import AddReview from "../add-review/add-review";
import SignIn from "../sign-in/sign-in";
import MyList from "../my-list/my-list";
import ShowError from "../show-error/show-error";
import {Movie} from "../../types";
import {AppDispatch} from "../../index";
import {RootState} from "../../reducer/reducer";

const FullVideoPlayerWrapped = withVideo(FullVideoPlayer);

const AddReviewWrapped = withReview(AddReview);

interface Props {
  selectedMovieID: number;
  promoMovieData: Movie;
  movies: Movie[];
  randomMovies: Movie[];
  genres: string[];
  filteredMovies: Movie[];
  favoriteMovies: Movie[];
  movieCollectionNumber: number;
  authorizationStatus: string;
  onMovieCardTitleClick: (movieID: number) => void;
  loadAllMovieComments: (movieID: number) => void;
}

class App extends PureComponent<Props, {}> {
  constructor(props) {
    super(props);

    this._renderMainScreen = this._renderMainScreen.bind(this);
    this._renderMovieScreen = this._renderMovieScreen.bind(this);
    this._renderFullVideoPlayer = this._renderFullVideoPlayer.bind(this);
    this._renderSignInScreen = this._renderSignInScreen.bind(this);
    this._renderAddReviewScreen = this._renderAddReviewScreen.bind(this);
    this._renderErrorScreen = this._renderErrorScreen.bind(this);
    this._renderMyListScreen = this._renderMyListScreen.bind(this);
  }

  _getCurrentMovie(movieID: number) {
    const {movies} = this.props;

    return movies.find((movie) => movie.id === movieID);
  }

  _renderErrorScreen(): React.ReactNode {
    return (
      <ShowError
        isNotFound={true}
        errorMessage={PAGE_NOT_FOUND_TEXT}
      />
    );
  }

  _renderMainScreen(): React.ReactNode {
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

  _renderMovieScreen(props): React.ReactNode {
    const {
      authorizationStatus,
      randomMovies,
      onMovieCardTitleClick,
      loadAllMovieComments,
    } = this.props;

    const movieID = +props.match.params.id;

    const currentMovie = this._getCurrentMovie(movieID);

    if (!currentMovie) {
      return this._renderErrorScreen();
    }

    loadAllMovieComments(movieID);

    return (
      <MovieScreen
        authorizationStatus={authorizationStatus}
        moreMovies={randomMovies}
        movie={currentMovie}
        onMovieCardTitleClick={onMovieCardTitleClick}
      />
    );
  }

  _renderFullVideoPlayer({match}): React.ReactNode {
    const movieID = +match.params.id;

    const currentMovie = this._getCurrentMovie(movieID);

    if (!currentMovie) {
      return this._renderErrorScreen();
    }

    return (
      <FullVideoPlayerWrapped
        isStartPlaying={false}
        title={currentMovie.title}
        previewImgSrc={currentMovie.previewImgSrc}
        videoData={currentMovie.fullVideo}
      />
    );
  }

  _renderSignInScreen(): React.ReactNode {
    const {authorizationStatus} = this.props;

    return authorizationStatus === AuthorizationStatus.NO_AUTH
      ? <SignIn/>
      : this._renderMainScreen();
  }

  _renderAddReviewScreen({match}): React.ReactNode {
    const movieID = +match.params.id;

    const currentMovie = this._getCurrentMovie(movieID);

    if (!currentMovie) {
      return this._renderErrorScreen();
    }

    return (
      <AddReviewWrapped
        movie={currentMovie}
      />
    );
  }

  _renderMyListScreen(): React.ReactNode {
    const {
      favoriteMovies,
      onMovieCardTitleClick,
    } = this.props;

    return (
      <MyList
        favoriteMovies={favoriteMovies}
        onMovieCardTitleClick={onMovieCardTitleClick}
      />
    );
  }

  render() {
    return (
      <Router
        history={history}
      >
        <Switch>
          <Route path={AppRoute.ROOT} exact render={this._renderMainScreen}/>
          <Route path={AppRoute.MOVIE} exact render={this._renderMovieScreen}>
          </Route>
          <Route exact path={AppRoute.PLAYER} render={this._renderFullVideoPlayer}/>
          <PrivateRoute exact path={AppRoute.REVIEW} render={this._renderAddReviewScreen}/>
          <Route exact path={AppRoute.SIGN_IN} render={this._renderSignInScreen}/>
          <PrivateRoute exact path={AppRoute.MY_LIST} render={this._renderMyListScreen}/>
          <Route render={this._renderErrorScreen}/>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  selectedMovieID: getSelectedMovieID(state),
  randomMovies: getRandomMovies(state),
  movies: getMovies(state),
  genres: getGenresList(state),
  promoMovieData: getPromoMovie(state),
  filteredMovies: getFilteredMovies(state),
  favoriteMovies: getFavoriteMovies(state),
  movieCollectionNumber: getMovieCollectionNumber(state),
  authorizationStatus: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loadAllMovieComments(movieID: number) {
    dispatch(DataOperation.loadMovieComments(movieID));
  },
  loadFavoriteMovies() {
    dispatch(DataOperation.loadFavoriteMovies());
  },
  onMovieCardTitleClick(movieID: number) {
    history.push(`/${ScreenType.FILMS}/${movieID}`);
    dispatch(AppStateActionCreator.setSelectedMovieID(movieID));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
