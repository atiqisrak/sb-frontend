import React from "react";
import YouTube from "react-youtube";
const VideoGallery = ({ video, index }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        padding: "10px 30px",
        backgroundColor: "white",
        border: "1px solid #f0f0f0",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <YouTube
        videoId={video?.videoId}
        opts={{
          width: "100%",
          height: "400px",
          playerVars: {
            autoplay: 0,
          },
        }}
      />
      <h3>{video?.title}</h3>
    </div>
  );
};

export default VideoGallery;
