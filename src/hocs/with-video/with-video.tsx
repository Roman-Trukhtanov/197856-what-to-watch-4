import React, {
  PureComponent,
  createRef,
  ChangeEvent,
  FormEvent,
  CSSProperties,
  RefObject,
} from "react";

import {Subtract} from "utility-types";
import {FullVideo, PreviewVideo} from "../../types";

interface Props {
  isStartPlaying: boolean;
  previewImgSrc: string;
  videoData: PreviewVideo | FullVideo;
}

interface State {
  isPlaying: boolean;
  percentProgress: number;
  timeElapsed: number;
}

interface InjectingProps {
  rating: number;
  comment: string;
  isValidReview: boolean;
  onStarChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onReviewInput: (evt: FormEvent<HTMLTextAreaElement>) => void;
}

const withVideo = (Component) => {
  type P = React.ComponentProps<typeof Component>;

  type T = Props & Subtract<P, InjectingProps>;

  class WithVideo extends PureComponent<T, State> {
    public _videoRef: RefObject<HTMLVideoElement>;
    private START_TIMEOUT: number;
    private _timeout: ReturnType<typeof setTimeout>;

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

    _getVideoStyles(): CSSProperties {
      return {
        width: `100%`,
        height: `100%`,
        objectFit: `cover`,
      };
    }

    render() {
      const {
        previewImgSrc,
        videoData,
      } = this.props;

      const {
        className,
        src: videoSrc,
        type: videoType,
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

  return WithVideo;
};

export default withVideo;
