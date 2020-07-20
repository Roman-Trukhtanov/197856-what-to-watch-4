import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {getStringTime} from "../../utils";
import {connect} from "react-redux";
import {ScreenType} from "../../const";
import {ActionCreator as ScreenActionCreator} from "../../reducer/screen/screen";
import {getPrevScreen} from "../../reducer/screen/selectors";

const FullVideoPlayer = (props) => {
  const {
    prevScreen,
    children,
    title,
    isPlayingReal,
    onPlayBtnClick,
    onFullScreenBtnClick,
    onPlayerExitBtnClick,
    timeElapsed,
    percentProgress,
  } = props;

  const getVideoWrapStyles = () => ({
    width: `100%`,
    height: `100%`,
  });

  const exitPlayer = () => {
    if (!prevScreen) {
      return;
    }

    onPlayerExitBtnClick(prevScreen);
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
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </Fragment>
              : <Fragment>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Fragment>
            }
          </button>

          <div className="player__name">{title}</div>

          <button type="button" className="player__full-screen" onClick={onFullScreenBtnClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

FullVideoPlayer.propTypes = {
  prevScreen: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isPlayingReal: PropTypes.bool.isRequired,
  timeElapsed: PropTypes.number.isRequired,
  percentProgress: PropTypes.number.isRequired,
  onPlayBtnClick: PropTypes.func.isRequired,
  onPlayerExitBtnClick: PropTypes.func.isRequired,
  onFullScreenBtnClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  prevScreen: getPrevScreen(state),
});

const mapDispatchToProps = (dispatch) => ({
  onPlayerExitBtnClick(prevScreen = ScreenType.MAIN) {
    dispatch(ScreenActionCreator.changeScreen(prevScreen));
  }
});

export {FullVideoPlayer};

export default connect(mapStateToProps, mapDispatchToProps)(FullVideoPlayer);
