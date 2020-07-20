import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator as AppStateActionCreator} from "../../reducer/app-state/app-state";
import {getCurrentGenre} from "../../reducer/app-state/selectors";

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
            onGenreLinkClick(currentGenre, genre);
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
  currentGenre: getCurrentGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreLinkClick(currentGenre, genre) {
    if (currentGenre === genre) {
      return;
    }

    dispatch(AppStateActionCreator.changeGenre(genre));
    dispatch(AppStateActionCreator.resetCollectionNumber());
  },
});

export {GenresList};

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
