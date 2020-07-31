import React from "react";
import MovieList from "../movie-list/movie-list";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";
import GenresList from "../genres-list/genres-list";
import {checkVisibleMovies, spliceMovies} from "../../utils";
import ShowMore from "../show-more/show-more";
import MainMovieCard from "../main-movie-card/main-movie-card";
import Footer from "../footer/footer";
import {Movie} from "../../types";

const MovieListWrapped = withVideoPlayer(MovieList);

interface Props {
  promoMovieData: Movie;
  movieCollectionNumber: number;
  genres: string[];
  filteredMovies: Movie[];
  onMovieCardTitleClick: (movieID: number) => void;
}

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {
    promoMovieData,
    filteredMovies,
    movieCollectionNumber,
    genres,
    onMovieCardTitleClick,
  } = props;

  return (
    <React.Fragment>
      <MainMovieCard
        promoMovieData={promoMovieData}
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

        <Footer
          isRootScreen={true}
        />
      </div>
    </React.Fragment>
  );
};

export default Main;
