import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.defaultItem,
      };

      this._handleItemClick = this._handleItemClick.bind(this);
    }

    _handleItemClick(evt, newActiveItem) {
      evt.preventDefault();

      const {activeItem} = this.state;

      if (activeItem === newActiveItem) {
        return;
      }

      this.setState({
        activeItem: newActiveItem,
      });
    }

    render() {
      const {activeItem} = this.state;

      return (
        <Component
          {...this.props}
          activeItem={activeItem}
          onItemClick={this._handleItemClick}
        >
        </Component>
      );
    }
  }

  WithActiveItem.propTypes = {
    defaultItem: PropTypes.string.isRequired,
  };

  return WithActiveItem;
};

export default withActiveItem;
