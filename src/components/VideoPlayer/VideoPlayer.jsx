import React, { useContext, useRef, useState } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import "./VideoPlayer.css"; // Import styles
import { ThemeContext } from "../ThemeContext/ThemeContext";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const {theme} = useContext(ThemeContext);

  // Toggle Play/Pause
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className={`video-container ${theme === 'dark' ? "dark" : " "}`}>
      <video
        ref={videoRef}
        src={src}
        loop
        muted={isMuted}
        onClick={togglePlay} // Tap to play/pause
        className="video-element"
      ></video>

      {/* Play/Pause Button (Appears on Tap) */}
      <button className="play-pause-btn" onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      {/* Mute/Unmute Button */}
      <button className="mute-btn" onClick={toggleMute}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default VideoPlayer;
