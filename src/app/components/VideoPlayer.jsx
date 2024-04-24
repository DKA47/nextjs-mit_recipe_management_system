// components/VideoPlayer.js
import React from 'react';

const VideoPlayer = ({ src }) => {
    return (
        <video controls width="100%">
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoPlayer;
