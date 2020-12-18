import React, { useRef, useState } from "react";

import "./style.scss";

function formatTime(current) {
  if (!current) {
    return "00:00:00";
  }
  var minutes = Math.floor(current / 60);
  var hours = Math.floor(minutes / 60);
  hours = hours >= 10 ? hours : "0" + hours;
  if (minutes >= 60) {
    minutes = minutes - 60 * Math.floor(minutes / 60);
  }
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  var seconds = Math.floor(current % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return hours + ":" + minutes + ":" + seconds;
}

function VideoPlayer(props) {
  const video = useRef(null);
  const boxVideo = useRef(null);
  const progress = useRef(null);
  const currentTime = useRef(null);
  const durationVideo = useRef("");
  const cursor = useRef(null);
  const [valueVolum, setValueVolum] = useState(50);
  let mouseDown = false;
  let timeOut = null;
  let istrue = true;
  let innerVideo = useRef(false);
  const { link } = props;
  const [control, setControl] = useState({
    onPlay: true,
    onLoading: false,
    muted: false,
    fullScreen: false,
  });

  const { onPlay, onLoading, muted, fullScreen } = control;

  const handleOnplay = () => {
    setControl({
      ...control,
      onPlay: !control.onPlay,
    });
    const a = control.onPlay ? "play" : "pause";
    video.current[a]();
    // innerVideo.current = true;
  };

  const handleLoading = () => {
    setControl({
      ...control,
      onLoading: true,
    });
  };

  const handleLoaded = () => {
    setControl({
      ...control,
      onLoading: false,
    });
    if (istrue) {
      durationVideo.current = formatTime(video.current.duration);
      istrue = false;
    }
  };
  const handleVolum = (e) => {
    setValueVolum(e.target.value);
    video.current.volume = valueVolum / 100;

    if (e.target.value === "0") {
      setControl({
        ...control,
        muted: true,
      });
    } else {
      if (muted) {
        setControl({
          ...control,
          muted: false,
        });
      }
    }
  };
  const hanhdleSkip = (timeSkip) => {
    video.current.currentTime += timeSkip;
  };
  const handleMuted = () => {
    setControl({
      ...control,
      muted: !muted,
    });
  };

  const handleFullScreen = (e) => {
    setControl({
      ...control,
      fullScreen: !fullScreen,
    });

    fullScreen
      ? document
          .exitFullscreen()
          .then()
          .catch((err) => {
            boxVideo.current.requestFullscreen();
          })
      : boxVideo.current.requestFullscreen();
  };

  const handleProgress = () => {
    let percent = (video.current.currentTime / video.current.duration) * 100;

    progress.current.childNodes[0].style.flexBasis = percent + "%";

    video.current.currentTime === video.current.duration && handleOnplay();
    currentTime.current.innerText = formatTime(video.current.currentTime);
  };

  const handleSlideProgress = (e) => {
    let slideTime =
      (e.nativeEvent.offsetX / progress.current.offsetWidth) *
      video.current.duration;
    progress.current.childNodes[0].style.flexBasis =
      (slideTime / video.current.duration) * 100 + "%";
    video.current.currentTime = slideTime || 0;
  };

  const handeHideCursor = (e) => {
    if (fullScreen) {
      if (cursor.current.classList[1] === "test") {
        cursor.current.classList.remove("test");
        video.current.style.cursor = "auto";
      }
      timeOut && clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        video.current.style.cursor = "none";
        cursor.current.classList.add("test");
      }, 3000);
      return;
    } else {
      video.current.style.cursor = "auto";
    }
    if (cursor.current.classList[1] === "test") {
      cursor.current.classList.remove("test");
    }
  };

  document.onkeydown = (e) => {
    if (innerVideo.current) {
      switch (e.key) {
        case "ArrowRight":
          hanhdleSkip(20);
          break;

        case "ArrowLeft":
          hanhdleSkip(-15);
          break;
        case "ArrowUp":
          if (valueVolum === 100) {
            return;
          }
          setControl({
            ...control,
            muted: false,
          });
          setValueVolum(valueVolum + 10);
          video.current.volume = (valueVolum + 10) / 100;
          e.preventDefault();
          break;
        case "ArrowDown":
          if (valueVolum === 0) {
            setControl({
              ...control,
              muted: true,
            });
            return;
          }
          setValueVolum(valueVolum - 10);
          video.current.volume = (valueVolum - 10) / 100;
          e.preventDefault();

          break;
        case " ":
          handleOnplay();
          e.preventDefault();
          break;
        default:
      }
    }
  };
  document.onmousedown = (e) => {
    innerVideo.current = false;
  };

  return (
    <div
      className="container-player"
      onClick={() => {
        innerVideo.current = true;
      }}
    >
      <div className="box-video" ref={boxVideo} onMouseMove={handeHideCursor}>
        <video
          width="100%"
          ref={video}
          height="100%"
          className="video"
          src={link}
          type="video/mp4"
          muted={muted}
          onTimeUpdate={handleProgress}
          onClick={(e) => {
            handleOnplay(e);
          }}
          onLoadStart={() => {
            handleOnplay();
          }}
          playsInline
          preload="metadata"
          onMouseUp={() => (mouseDown = false)}
          onMouseMove={(e) => {
            mouseDown && handleSlideProgress(e);
          }}
          onCanPlay={handleLoaded}
          onWaiting={handleLoading}
        ></video>
        <div
          className="dashed-loading"
          style={{ display: onLoading ? "block" : "none" }}
        ></div>

        <div
          className="controls"
          style={{ bottom: onPlay && "0" }}
          ref={cursor}
          onMouseUp={() => (mouseDown = false)}
          onMouseMove={(e) => {
            mouseDown && handleSlideProgress(e);
          }}
        >
          <div
            className="container-progress "
            onClick={handleSlideProgress}
            onMouseMove={(e) => {
              mouseDown && handleSlideProgress(e);
            }}
            onMouseDown={() => (mouseDown = true)}
            onMouseUp={() => (mouseDown = false)}
            ref={progress}
          >
            <div className="progress"></div>
          </div>
          <div className="btn-container">
            <div className="btn-volum">
              <div className="icon-volum">
                <i
                  className={muted ? "fas fa-volume-mute" : "fas fa-volume-up"}
                  onClick={handleMuted}
                ></i>
              </div>
              <div className="custom-volume">
                <div className="progress-volume">
                  <span
                    className="fill"
                    style={{ width: valueVolum + "%" }}
                  ></span>
                </div>
                <input
                  className="input"
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={valueVolum}
                  onChange={handleVolum}
                  onClick={handleVolum}
                />
              </div>
            </div>

            <div className="btn-play">
              <p className="current-time" ref={currentTime}>
                00:00:00
              </p>
              <div
                className="icon-backward"
                onClick={() => {
                  hanhdleSkip(-15);
                  handleProgress();
                }}
              >
                <i className="fas fa-backward"></i>
              </div>
              <div className="icon-play">
                <i
                  className={
                    onPlay ? " far fa-play-circle" : "far fa-pause-circle"
                  }
                  onClick={handleOnplay}
                ></i>
              </div>
              <div
                className="icon-forward"
                onClick={() => {
                  hanhdleSkip(20);
                  handleProgress();
                }}
              >
                <i className="fas fa-forward"></i>
              </div>
              <p className="duration-time">
                {durationVideo.current || "00:00:00"}
              </p>
            </div>

            <div className="fullsceen">
              <i className="fas fa-expand" onClick={handleFullScreen}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
