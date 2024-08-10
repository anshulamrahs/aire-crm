// MultiVideoPlayer.js
import React, { useState, useEffect } from 'react';

const MultiVideoPlayer = ({ videos }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, videos[currentVideoIndex].duration * 1000); // Switch video after current video ends
    return () => clearInterval(interval);
  }, [currentVideoIndex, videos]);

  return (
    <div style={{ display: 'none' }}>
      {videos.map((video, index) => (
        <video
          key={index}
          autoPlay
          muted
          style={{ display: currentVideoIndex === index ? 'block' : 'none' }}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      ))}
    </div>
  );
};

export default MultiVideoPlayer;
