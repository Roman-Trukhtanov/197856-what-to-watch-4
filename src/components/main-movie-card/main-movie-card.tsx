import React from "react";
import Header from "../header/header";
import PlayBtn from "../play-btn/play-btn";
import MyListBtn from "../my-list-btn/my-list-btn";
import {getImgBgStyle} from "../../utils";
import {Movie} from "../../types";

interface Props {
  promoMovieData: Movie;
}

const MainMovieCard: React.FunctionComponent<Props> = (props: Props) => {
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

      <Header
        movie={promoMovieData}
      />

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
              <MyListBtn movie={promoMovieData}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainMovieCard;
