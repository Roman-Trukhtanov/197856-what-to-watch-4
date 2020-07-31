import React, {PureComponent, MouseEvent} from "react";
import {Subtract} from "utility-types";

interface State {
  activeItem: string;
}

interface InjectingProps {
  activeItem: string;
  onItemClick: (evt: MouseEvent, newActiveItem: string) => void;
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;

  type T = Subtract<P, InjectingProps>;

  class WithActiveItem extends PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.defaultItem,
      };

      this._handleItemClick = this._handleItemClick.bind(this);
    }

    _handleItemClick(evt: MouseEvent, newActiveItem: string) {
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

  return WithActiveItem;
};

export default withActiveItem;
