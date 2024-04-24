"use client"

import React, { useState, useEffect } from "react";
import { message } from "antd";

export default function WatchVideo() {
    const [loading, setLoading] = useState(false);
    const [videoSrc, setVideoSrc] = useState(null);

    useEffect(() => {
        // Function to parse URL parameters
        const getUrlParams = () => {
            const searchParams = new URLSearchParams(window.location.search);
            return searchParams.get("src");
        };

        // Get video source from URL parameters
        const src = getUrlParams();
        console.log("Video Source:", src); // Log video source

        if (src) {
            setVideoSrc(src);
        } else {
            // Show error message if video source is not provided
            console.log("Video source not found!");
            message.error("Video source not found!");
        }
    }, []);

    return (
        <div>
            {videoSrc && (
                <div>
                    <h1>Watch Video</h1>
                    <video controls width="600" height="400">
                        <source src={`${videoSrc}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
}
