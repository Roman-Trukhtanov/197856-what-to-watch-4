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
        isPlaying: props.isStartPlaying || false,
        percentProgress: 0,
        timeElapsed: 0,
      };

      this._handlePlay = this._handlePlay.bind(this);
      this._handlePause = this._handlePause.bind(this);
      this._handlePlayBtnClick = this._handlePlayBtnClick.bind(this);
      this._handleTimeUpdate = this._handleTimeUpdate.bind(this);
      this._setFullScreen = this._setFullScreen.bind(this);
    }

    _handlePlay() {
      this.setState({
        isPlaying: true,
      });
    }

    _handlePause() {
      this.setState({
        isPlaying: false,
      });
    }

    _setTimeElapsed() {
      const currentVideo = this._videoRef.current;

      const duration = currentVideo.duration;
      const currentTimeValue = currentVideo.currentTime;
      const percentProgress = +(currentTimeValue * 100 / duration).toFixed(2);

      this.setState({
        timeElapsed: Math.floor(duration - currentTimeValue),
        percentProgress,
      });
    }

    _handlePlayBtnClick() {
      this.setState((prevState) => ({
        isPlaying: !prevState.isPlaying,
      }));
    }

    _handleTimeUpdate() {
      this._setTimeElapsed();
    }

    _setFullScreen() {
      const video = this._videoRef.current;

      video.requestFullscreen();
    }

    _getVideoStyles() {
      return {
        width: `100%`,
        height: `100%`,
        objectFit: `cover`,
      };
    }

    componentDidMount() {
      const {isStartPlaying, videoData} = this.props;
      const {isMute, isAutoPlay} = videoData;

      const video = this._videoRef.current;

      video.muted = isMute || false;

      video.addEventListener(`play`, this._handlePlay);
      video.addEventListener(`pause`, this._handlePause);
      video.addEventListener(`timeupdate`, this._handleTimeUpdate);

      if (isStartPlaying) {
        video.play();

        return;
      }

      if (isAutoPlay) {
        this._timeout = setTimeout(() => {
          video.play();
        }, this.START_TIMEOUT);
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.removeEventListener(`play`, this._handlePlay);
      video.removeEventListener(`pause`, this._handlePause);
      video.removeEventListener(`timeupdate`, this._handleTimeUpdate);

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
        previewImgSrc,
        videoData,
      } = this.props;

      const {
        src: videoSrc,
        type: videoType,
        className,
        isLoop,
      } = videoData;

      const {
        isPlaying: isPlayingReal,
        timeElapsed,
        percentProgress,
      } = this.state;

      return (
        <Component
          {...this.props}
          onPlayBtnClick={this._handlePlayBtnClick}
          onFullScreenBtnClick={this._setFullScreen}
          isPlayingReal={isPlayingReal}
          timeElapsed={timeElapsed}
          percentProgress={percentProgress}
        >
          <video
            className={className || ``}
            playsInline
            preload={`auto`}
            poster={previewImgSrc}
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
    videoData: PropTypes.shape({
      src: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      isAutoPlay: PropTypes.bool.isRequired,
      isLoop: PropTypes.bool.isRequired,
      isMute: PropTypes.bool.isRequired,
      className: PropTypes.string,
    }).isRequired,
    isStartPlaying: PropTypes.bool.isRequired,
    previewImgSrc: PropTypes.string.isRequired,
  };

  return WithVideo;
};

export default withVideo;
