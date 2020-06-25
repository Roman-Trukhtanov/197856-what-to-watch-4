import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Main from '../main/main';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
    this._handleMovieCardTitleClick = this._handleMovieCardTitleClick.bind(this);
  }

  _handleMovieCardTitleClick(evt) {
    evt.preventDefault();
  }

  render() {
    const {
      promoMovieData,
      movies
    } = this.props;

    return (
      <Main
        promoMovieData={promoMovieData}
        movies={movies}
        onMovieCardTitleClick={this._handleMovieCardTitleClick}
      />
    );
  }
}

App.propTypes = {
  promoMovieData:
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
    }),
  movies: PropTypes.array.isRequired,
};

export default App;
