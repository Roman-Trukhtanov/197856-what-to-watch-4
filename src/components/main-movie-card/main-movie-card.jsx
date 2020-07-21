import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header";
import PlayBtn from "../play-btn/play-btn";
import {getImgBgStyle} from "../../utils";

const MainMovieCard = (props) => {
  const {promoMovieData} = props;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img
          src={promoMovieData.coverSrc}
          alt={promoMovieData.title}
          style={getImgBgStyle(promoMovieData.bgColor)}
        />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header/>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img
              src={promoMovieData.bigPosterSrc}
              alt={promoMovieData.title}
              width="218" height="327"
              style={getImgBgStyle(promoMovieData.bgColor)}
            />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promoMovieData.title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoMovieData.genre}</span>
              <span className="movie-card__year">{promoMovieData.details.releaseYear}</span>
            </p>

            <div className="movie-card__buttons">
              <PlayBtn movieData={promoMovieData}/>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"/>
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

MainMovieCard.propTypes = {
  promoMovieData: PropTypes.shape({
    bgColor: PropTypes.string,
    coverSrc: PropTypes.string.isRequired,
    bigPosterSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    details: PropTypes.shape({
      releaseYear: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default MainMovieCard;
