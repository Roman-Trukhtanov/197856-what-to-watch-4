import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Tabs from "../tabs/tabs";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";
import MovieList from "../movie-list/movie-list";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import Header from "../header/header";
import Footer from "../footer/footer";
import {AuthorizationStatus, TabType} from "../../const";
import PlayBtn from "../play-btn/play-btn";
import {getImgBgStyle} from "../../utils";
import AddReviewBtn from "../add-review-btn/add-review-btn";

const MovieListWrapped = withVideoPlayer(MovieList);
const TabsWrapped = withActiveItem(Tabs);

const MovieScreen = (props) => {
  const {
    authorizationStatus,
    moreMovies,
    movie,
    movieComments,
    onMovieCardTitleClick,
  } = props;

  return (
    <Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={movie.coverSrc} alt={movie.title} style={getImgBgStyle(movie.bgColor)}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header/>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genre}</span>
                <span className="movie-card__year">{movie.details.releaseYear}</span>
              </p>

              <div className="movie-card__buttons">
                <PlayBtn/>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>

                {authorizationStatus === AuthorizationStatus.AUTH && <AddReviewBtn/>}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img
                src={movie.bigPosterSrc}
                alt={movie.title}
                width="218"
                height="327"
                style={getImgBgStyle(movie.bgColor)}
              />
            </div>

            <div className="movie-card__desc">
              <TabsWrapped
                movie={movie}
                movieComments={movieComments}
                defaultItem={TabType.OVERVIEW}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MovieListWrapped
            movies={moreMovies}
            onMovieCardTitleClick={onMovieCardTitleClick}
          />
        </section>

        <Footer/>
      </div>
    </Fragment>
  );
};

MovieScreen.propTypes = {
  moreMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    coverSrc: PropTypes.string.isRequired,
    bigPosterSrc: PropTypes.string.isRequired,
    bgColor: PropTypes.string,
    details: PropTypes.shape({
      releaseYear: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  movieComments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMovieCardTitleClick: PropTypes.func.isRequired,
};

export default MovieScreen;
