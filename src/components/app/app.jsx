import React, {Component} from "react";
import PropTypes from "prop-types";
import Main from '../main/main';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const {promoMovieData, movieTitles} = this.props;

    return (
      <Main promoMovieData={promoMovieData} movieTitles={movieTitles}/>
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
  movieTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
