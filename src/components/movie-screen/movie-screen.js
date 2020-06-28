import React from 'react';
import PropTypes from 'prop-types';

const MovieScreen = (props) => {
  const {
    movieInfo,
    movieOverview,
  } = props;

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={movieInfo.coverSrc} alt="The Grand Budapest Hotel"/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{movieInfo.title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{movieInfo.genre}</span>
              <span className="movie-card__year">{movieInfo.releaseYear}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              <a href="add-review.html" className="btn movie-card__button">Add review</a>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img
              src={movieInfo.bigPosterSrc}
              alt={movieInfo.title}
              width="218"
              height="327"
            />
          </div>

          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                <li className="movie-nav__item movie-nav__item--active">
                  <a href="#" className="movie-nav__link">Overview</a>
                </li>
                <li className="movie-nav__item">
                  <a href="#" className="movie-nav__link">Details</a>
                </li>
                <li className="movie-nav__item">
                  <a href="#" className="movie-nav__link">Reviews</a>
                </li>
              </ul>
            </nav>

            <div className="movie-rating">
              <div className="movie-rating__score">{movieOverview.score}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{movieOverview.level}</span>
                <span className="movie-rating__count">{`${movieOverview.ratingCount} ratings`}</span>
              </p>
            </div>

            <div className="movie-card__text">
              {movieOverview.description.map((item, index) => (
                <p key={`description-item__${index}`}>{item}</p>
              ))}

              <p className="movie-card__director"><strong>{`Director: ${movieOverview.director}`}</strong></p>

              <p className="movie-card__starring"><strong>{movieOverview.starring}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

MovieScreen.propTypes = {
  movieInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    coverSrc: PropTypes.string.isRequired,
    bigPosterSrc: PropTypes.string.isRequired,
  }).isRequired,
  movieOverview: PropTypes.shape({
    id: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    description: PropTypes.arrayOf(PropTypes.string).isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.string.isRequired
  }).isRequired,
};

export default MovieScreen;
