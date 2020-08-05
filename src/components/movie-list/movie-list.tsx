import React from "react";
import MovieCard from "../movie-card/movie-card";
import {Movie, PreviewVideo} from "../../types";

interface Props {
  onMovieCardTitleClick: (movieID: number) => void;
  movies: Movie[];
  renderVideo: (movie: Movie, previewVideo: PreviewVideo) => React.ReactNode;
  activePlayerId: number;
  onMouseEnter: (movie: Movie) => void;
  onMouseLeave: () => void;
}

const MovieList: React.FunctionComponent<Props> = (props: Props) => {
  const {
    movies,
    onMovieCardTitleClick,
    activePlayerId,
    renderVideo,
    onMouseEnter,
    onMouseLeave,
  } = props;

  return (
    <div className="catalog__movies-list" style={{width: `100%`}}>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={`movie_${movie.id}`}
            movie={movie}
            activePlayerId={activePlayerId}
            onMovieCardTitleClick={onMovieCardTitleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            renderVideo={renderVideo}
          />
        );
      })}
    </div>
  );
};

export default MovieList;
