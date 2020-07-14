import React, {PureComponent} from "react";
import VideoPlayer from "../../components/video-player/video-player";
import withVideo from "../with-video/with-video";

const VideoPlayerWrapped = withVideo(VideoPlayer);

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: -1,
      };

      this._handleMovieMouseEnter = this._handleMovieMouseEnter.bind(this);
      this._handleMovieMouseLeave = this._handleMovieMouseLeave.bind(this);
      this._renderVideo = this._renderVideo.bind(this);
    }

    _changeActivePlayer(id) {
      const {activePlayerId} = this.state;

      this.setState({
        activePlayerId: activePlayerId === id ? -1 : id
      });
    }

    _renderVideo(movie, videoData) {
      const {activePlayerId} = this.state;

      const {id, previewImgSrc} = movie;

      const {type: videoType, src: videoSrc, isLoop, isMute} = videoData;

      return (
        <VideoPlayerWrapped
          isPlaying={id === activePlayerId}
          videoType={videoType}
          videoSrc={videoSrc}
          previewImgSrc={previewImgSrc}
          isLoop={isLoop}
          isMute={isMute}
        />
      );
    }

    _handleMovieMouseEnter(movie) {
      this._changeActivePlayer(movie.id);
    }

    _handleMovieMouseLeave() {
      this._changeActivePlayer(-1);
    }

    render() {
      const {activePlayerId} = this.state;

      return (
        <Component
          {...this.props}

          onMouseEnter={this._handleMovieMouseEnter}
          onMouseLeave={this._handleMovieMouseLeave}
          activePlayerId={activePlayerId}

          renderVideo={this._renderVideo}
        />
      );
    }
  }

  WithVideoPlayer.propTypes = {};

  return WithVideoPlayer;
};

export default withVideoPlayer;
