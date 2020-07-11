import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";

const GenresList = (props) => {
  const {
    genres,
    currentGenre,
    onGenreLinkClick,
  } = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, index) => (
        <li key={`genre_${index}`} className={`catalog__genres-item ${genre === currentGenre
          ? `catalog__genres-item--active`
          : ``
        }`}>
          <a href="#" className="catalog__genres-link" onClick={(evt) => {
            evt.preventDefault();
            onGenreLinkClick(genre);
          }}>{genre}</a>
        </li>
      ))}
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onGenreLinkClick: PropTypes.func.isRequired,
};

GenresList.propTypes = {};

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreLinkClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.setFilteredMovies(genre));
  },
});

export {GenresList};

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
