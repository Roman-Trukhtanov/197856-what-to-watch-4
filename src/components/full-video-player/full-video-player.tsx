import React, {CSSProperties, Fragment} from "react";
import {getStringTime} from "../../utils";
import {historyGoBack} from "../../history";

interface Props {
  title: string;
  isPlayingReal: boolean;
  timeElapsed: number;
  percentProgress: number;
  onPlayBtnClick: () => void;
  onFullScreenBtnClick: () => void;
  children: React.ReactNode | React.ReactNodeArray;
}

const FullVideoPlayer: React.FunctionComponent<Props> = (props: Props) => {
  const {
    children,
    title,
    isPlayingReal,
    onPlayBtnClick,
    onFullScreenBtnClick,
    timeElapsed,
    percentProgress,
  } = props;

  const getVideoWrapStyles = (): CSSProperties => ({
    width: `100%`,
    height: `100%`,
  });

  const exitPlayer = (): void => {
    historyGoBack();
  };

  return (
    <div className="player">
      <div className="player__video-wrap" onClick={onPlayBtnClick} style={getVideoWrapStyles()}>
        {children}
      </div>

      <button type="button" className="player__exit" onClick={exitPlayer}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={percentProgress} max="100"/>
            <div className="player__toggler" style={{left: `${percentProgress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getStringTime(timeElapsed)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={onPlayBtnClick}>
            {isPlayingReal
              ? <Fragment>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"/>
                </svg>
                <span>Pause</span>
              </Fragment>
              : <Fragment>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
                </svg>
                <span>Play</span>
              </Fragment>
            }
          </button>

          <div className="player__name">{title}</div>

          <button type="button" className="player__full-screen" onClick={onFullScreenBtnClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullVideoPlayer;
