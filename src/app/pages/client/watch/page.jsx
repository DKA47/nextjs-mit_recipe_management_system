"use client"

import React, { useState, useEffect } from "react";
import { message, Modal, Button } from "antd";
import { VideoCameraOutlined } from '@ant-design/icons';

export default function WatchVideo() {
    const [videoSrc, setVideoSrc] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // State for controlling modal visibility

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

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Click to Watch</h1>
            <div className="video-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                {videoSrc && (
                    <Button
                        icon={<VideoCameraOutlined />}
                        size="large" // Set button size to large
                        style={{ fontSize: '36px' }} // Increase button font size
                        onClick={openModal}
                    />
                )}
                <Modal
                    title="Watch Video"
                    visible={modalVisible}
                    onCancel={closeModal}
                    footer={null}
                    centered
                >
                    <video controls width="600" height="400">
                        <source src={`${videoSrc}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Modal>
            </div>
        </div>
    );
}
