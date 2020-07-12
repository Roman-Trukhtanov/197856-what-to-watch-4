import React from "react";
import PropTypes from "prop-types";
import MovieList from "../movie-list/movie-list";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";
import GenresList from "../genres-list/genres-list";
import {checkVisibleMovies, spliceMovies} from "../../utils";
import ShowMore from "../show-more/show-more";
import MainMovieCard from "../main-movie-card/main-movie-card";
import Footer from "../footer/footer";

const MovieListWrapped = withVideoPlayer(MovieList);

const Main = (props) => {
  const {filteredMovies, movieCollectionNumber, genres} = props;
  const {title, genre, year} = props.promoMovieData;
  const onMovieCardTitleClick = props.onMovieCardTitleClick;

  return (
    <React.Fragment>
      <MainMovieCard
        title={title}
        genre={genre}
        year={year}
      />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres}/>

          <MovieListWrapped
            movies={spliceMovies(movieCollectionNumber, filteredMovies)}
            onMovieCardTitleClick={onMovieCardTitleClick}
          />

          {checkVisibleMovies(filteredMovies, movieCollectionNumber) && <ShowMore/>}
        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
};

Main.propTypes = {
  promoMovieData:
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
    }),
  movieCollectionNumber: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  filteredMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMovieCardTitleClick: PropTypes.func.isRequired,
};

export default Main;
