import React, {Component} from 'react';
import Main from "../main/main";

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {promoMovieData} = this.props;

    return (
      <Main promoMovieData={promoMovieData}/>
    );
  }
}

export default App;
