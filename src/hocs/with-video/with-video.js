import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
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

      video.muted = true;

      video.addEventListener(`play`, this._onPlay);
      video.addEventListener(`pause`, this._onPause);

      if (isPlaying) {
        this._timeout = setTimeout(() => {
          video.play();
        }, this.START_TIMEOUT);
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.removeEventListener(`play`, this._onPlay);
      video.removeEventListener(`pause`, this._onPause);

      clearTimeout(this._timeout);
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    render() {
      const {
        videoSrc,
        videoType,
        preview,
        isLoop,
      } = this.props;

      return (
        <Component
          {...this.props}
        >
          <video
            playsInline
            preload={`auto`}
            poster={preview}
            loop={isLoop ? isLoop : false}
            controls={false}
            style={this._getVideoStyles()}
            ref={this._videoRef}
          >
            <source src={videoSrc} type={videoType ? videoType : `video/mp4`}/>
          </video>
        </Component>
      );
    }
  }

  WithVideo.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    videoType: PropTypes.string.isRequired,
    videoSrc: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    isLoop: PropTypes.bool.isRequired,
  };

  return WithVideo;
};

export default withVideo;
