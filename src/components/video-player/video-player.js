import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.START_TIMEOUT = 1000;
    this._timeout = null;

    this._videoRef = createRef();

    this.state = {
      isPlaying: props.isPlaying,
    };

    this._onPlay = this._onPlay.bind(this);
    this._onPause = this._onPause.bind(this);
  }

  _onPlay() {
    this.setState({
      isPlaying: true,
    });
  }

  _onPause() {
    this.setState({
      isPlaying: false,
    });
  }

  _getVideoStyles() {
    return {
      width: `100%`,
      height: `100%`,
      objectFit: `cover`,
    };
  }

  componentDidMount() {
    const {isPlaying} = this.props;
    const video = this._videoRef.current;

    video.addEventListener(`play`, this._onPlay);
    video.addEventListener(`pause`, this._onPause);

    if (isPlaying) {
      this._timeout = setTimeout(() => {
        video.play();
      }, this.START_TIMEOUT);
    }
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.removeEventListener(`play`, this._onPlay);
    video.removeEventListener(`pause`, this._onPause);

    clearTimeout(this._timeout);
  }

  render() {
    const {
      videoSrc,
      videoType,
      preview
    } = this.props;

    return (
      <video
        muted
        playsInline
        preload={`auto`}
        poster={preview}
        loop={true}
        controls={false}
        style={this._getVideoStyles()}
        ref={this._videoRef}
      >
        <source src={videoSrc} type={videoType}/>
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  videoType: PropTypes.string.isRequired,
  videoSrc: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};

export default VideoPlayer;
