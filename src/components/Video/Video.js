import { useRef, useState, useEffect } from "react";
import film from "../../assets/dance.mp4";
import "./video.css";
import playIcon from "../../assets/play.png";
import pauseIcon from "../../assets/pause.png";
import volumeIcon from "../../assets/volume.png";
import fullIcon from "../../assets/fullfill.png";
import muteIcon from "../../assets/mute.png";
import backIcon from "../../assets/back.png";
import pupIcon from "../../assets/popup.png";
import LiveStream from "../../pages/Livestream/client/LiveStream";

const Video = (props) => {
  const { onStart, videoRef, poster, onPopUp, viewStatue } = props;

  const videoBx = useRef();
  const [isPlay, setIsPlay] = useState(true);
  const [isVolume, setIsVolume] = useState(true);
  const [volumeChange, setVolumeChange] = useState(50);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControl, setShowControl] = useState(true);
  const [controlHover, setControlHover] = useState(false);
  const [isMove, setIsMove] = useState(0);
  const controlClass = `control ${showControl ? "" : "hide"}`;

  useEffect(() => {
    setShowControl(true);
    if (!controlHover) {
      const displayTimer = setTimeout(() => setShowControl(false), 3000);
      return () => {
        clearTimeout(displayTimer);
      };
    }
  }, [isMove, controlHover]);

  const moveHandler = (e) => {
    setIsMove(e.clientX);
  };

  const fullScreen = () => {
    videoBx.current
      .requestFullscreen()
      .then(() => {
        console.log("all");
        setIsFullScreen(true);
      })
      .catch(() => {
        console.log("false");
      });
  };
  const exitFullScreenHandler = () => {
    window.document
      .exitFullscreen()
      .then(() => {
        setIsFullScreen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //video function-------------------------

  const play = () => {
    onStart();
    // onFlvStart();
    videoRef.current.play();
    setIsPlay(false);
  };
  const pause = () => {
    videoRef.current.pause();
    setIsPlay(true);
  };
  const setVolume = (value) => {
    videoRef.current.volume = value;
  };

  // -----------------------------------
  const volumeHandler = (e) => {
    const curValue = Number(e.target.value);
    const value = curValue / 100;
    videoRef.current.volume = value;
    if (curValue === 0) {
      setIsVolume(false);
    } else {
      setIsVolume(true);
    }
    setVolumeChange(e.target.value);
  };
  useEffect(() => {
    if (viewStatue === "hide") {
      setIsVolume(false);
    } else {
      setIsVolume(true);
    }
    const newVolume = videoRef.current.volume * 100;
    setVolumeChange(newVolume);
  }, [viewStatue, videoRef]);

  return (
    <div className="container">
      <div className="videoBx" ref={videoBx} onMouseMove={moveHandler}>
        <video ref={videoRef} preload="true" poster={poster} src={film}></video>

        <div
          className={controlClass}
          onMouseOver={() => {
            setControlHover(true);
          }}
          onMouseLeave={() => {
            setControlHover(false);
          }}
        >
          {isPlay ? (
            <div className="play" onClick={play}>
              <div className="imgBx">
                <img src={playIcon} />
              </div>
            </div>
          ) : (
            <div className="pause" onClick={pause}>
              <div className="imgBx">
                <img src={pauseIcon} />
              </div>
            </div>
          )}
          <div className="volume">
            {isVolume ? (
              <div
                className="volumeBx"
                onClick={() => {
                  setVolume(0);
                  setIsVolume((pre) => !pre);
                  setVolumeChange(0);
                }}
              >
                <div className="imgBx">
                  <img src={volumeIcon} />
                </div>
              </div>
            ) : (
              <div
                className="volumeBx"
                onClick={() => {
                  setVolume(0.5);
                  setIsVolume((pre) => !pre);
                  setVolumeChange(50);
                }}
              >
                <div className="imgBx">
                  <img src={muteIcon} />
                </div>
              </div>
            )}
            <input
              type="range"
              className="curVolume"
              value={volumeChange}
              onChange={volumeHandler}
              min="0"
              max="100"
            />
          </div>
          <div className="popUpBx" onClick={onPopUp}>
            <div className="imgBx">
              <img src={pupIcon} />
            </div>
          </div>
          {isFullScreen ? (
            <div className="screen" onClick={exitFullScreenHandler}>
              <div className="imgBx">
                <img src={backIcon} />
              </div>
            </div>
          ) : (
            <div className="screen" onClick={fullScreen}>
              <div className="imgBx">
                <img src={fullIcon} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Video;
