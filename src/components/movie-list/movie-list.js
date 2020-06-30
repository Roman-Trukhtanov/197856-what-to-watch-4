import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card";

class MovieList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCardIndex: -1,
    };

    this._handleMovieMouseEnter = this._handleMovieMouseEnter.bind(this);
    this._handleMovieMouseLeave = this._handleMovieMouseLeave.bind(this);
  }

  _handleMovieMouseEnter(movie) {
    this.setState({
      activeCardIndex: movie.id
    });
  }

  _handleMovieMouseLeave() {
    this.setState({
      activeCardIndex: -1
    });
  }

  render() {
    const {
      movies,
      onMovieCardTitleClick
    } = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => {
          return (
            <MovieCard
              key={`movie_${index}`}
              movie={movie}
              onMovieCardTitleClick={onMovieCardTitleClick}
              onMouseEnter={this._handleMovieMouseEnter}
              onMouseLeave={this._handleMovieMouseLeave}
            />
          );
        })}
      </div>
    );
  }
}

MovieList.propTypes = {
  onMovieCardTitleClick: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
};

export default MovieList;
