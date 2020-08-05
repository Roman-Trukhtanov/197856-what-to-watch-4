import React, {PureComponent} from "react";
import VideoPlayer from "../../components/video-player/video-player";
import withVideo from "../with-video/with-video";
import {Subtract} from "utility-types";
import {FullVideo, Movie, PreviewVideo} from "../../types";

const VideoPlayerWrapped = withVideo(VideoPlayer);

interface State {
  activePlayerId: number;
}

interface InjectingProps {
  onMouseEnter: (movie: Movie) => void;
  onMouseLeave: () => void;
  activePlayerId: number;
  renderVideo: (movie: Movie, videoData: PreviewVideo | FullVideo) => React.ReactNode;
}


const withVideoPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;

  type T = Subtract<P, InjectingProps>;

  class WithVideoPlayer extends PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: -1,
      };

      this._handleMovieMouseEnter = this._handleMovieMouseEnter.bind(this);
      this._handleMovieMouseLeave = this._handleMovieMouseLeave.bind(this);
      this._renderVideo = this._renderVideo.bind(this);
    }

    _changeActivePlayer(id: number) {
      const {activePlayerId} = this.state;

      this.setState({
        activePlayerId: activePlayerId === id ? -1 : id
      });
    }

    _renderVideo(movie: Movie, videoData: PreviewVideo | FullVideo) {
      const {previewImgSrc} = movie;

      return (
        <VideoPlayerWrapped
          isStartPlaying={false}
          previewImgSrc={previewImgSrc}
          videoData={videoData}
        />
      );
    }

    _handleMovieMouseEnter(movie: Movie) {
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

  return WithVideoPlayer;
};

export default withVideoPlayer;
