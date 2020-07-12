import React, {Fragment} from "react";
import PropTypes from "prop-types";

const VideoPlayer = (props) => {
  const {
    children,
  } = props;

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

VideoPlayer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

export default VideoPlayer;
