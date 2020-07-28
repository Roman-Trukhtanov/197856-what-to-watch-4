import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header";
import Footer from "../footer/footer";
import MovieList from "../movie-list/movie-list";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";

const MovieListWrapped = withVideoPlayer(MovieList);

const MyList = (props) => {
  const {
    favoriteMovies,
    onMovieCardTitleClick,
  } = props;

  return (
    <div className="user-page">
      <Header
        isMyListScreen={true}
      />

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__movies-list">
          <MovieListWrapped
            movies={favoriteMovies}
            onMovieCardTitleClick={onMovieCardTitleClick}
          />
        </div>
      </section>

      <Footer/>
    </div>
  );
};

MyList.propTypes = {
  favoriteMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMovieCardTitleClick: PropTypes.func.isRequired,
};

export default MyList;
