import React from "react";
import ReactPlayer from "react-player/youtube";

import "./videoPopup.scss";

const VideoPopup = ({ show, setShow, videoKey, setVideoKey }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoKey(null);
  };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={() => hidePopup()}></div>
      <div className="videoPlayer">
        <span className="closeBtn" onClick={() => hidePopup()}>
          Close
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoKey}`}
          controls
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default VideoPopup;
