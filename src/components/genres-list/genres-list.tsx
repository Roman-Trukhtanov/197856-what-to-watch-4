import React from "react";
import {connect} from "react-redux";
import {ActionCreator as AppStateActionCreator} from "../../reducer/app-state/app-state";
import {getCurrentGenre} from "../../reducer/app-state/selectors";
import {AppDispatch} from "../../index";
import {RootState} from "../../reducer/reducer";

interface Props {
  genres: string[];
  currentGenre: string;
  onGenreLinkClick: (
    currentGenre: string,
    genre: string,
  ) => void;
}

const GenresList: React.FunctionComponent<Props> = (props: Props) => {
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

const mapStateToProps = (state: RootState) => ({
  currentGenre: getCurrentGenre(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onGenreLinkClick(currentGenre: string, genre: string) {
    if (currentGenre === genre) {
      return;
    }

    dispatch(AppStateActionCreator.changeGenre(genre));
    dispatch(AppStateActionCreator.resetCollectionNumber());
  },
});

export {GenresList};

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
