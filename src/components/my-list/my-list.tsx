import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import MovieList from "../movie-list/movie-list";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";
import {Movie} from "../../types";

const MovieListWrapped = withVideoPlayer(MovieList);

interface Props {
  favoriteMovies: Movie[];
  onMovieCardTitleClick: (movieID: number) => void;
}

const MyList: React.FunctionComponent<Props> = (props: Props) => {
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

export default MyList;
