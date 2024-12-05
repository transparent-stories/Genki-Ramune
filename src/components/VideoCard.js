'use client';

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const VideoCard = ({ videoSrc, idx, activeVideo, onAudioPlay }) => {
    const videoRef = useRef(null);
    const [muted, setMuted] = useState(true);

    const toggleMute = () => {
        const newMutedState = !muted;
        setMuted(newMutedState);
        onAudioPlay(idx)
        if (videoRef.current) {
            videoRef.current.muted = newMutedState;
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = idx !== activeVideo;
            setMuted(idx !== activeVideo);
        }
    }, [activeVideo, idx]);

    return (
        <div
            className="relative video-card border-4 m-4 border-red keen-slider__slide"
            data-aos="fade-in-left"
        >
            <video
                ref={videoRef}
                className="w-full h-auto"
                preload="auto"
                muted={muted}
                autoPlay
                playsInline
                loop
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* Custom mute/unmute button */}
            <motion.div
                onClick={toggleMute}
                className="absolute bottom-4 right-4 flex items-center justify-center p-3 cursor-pointer bg-gray-100 text-red shadow-lg rounded-full hover:bg-pink transition-colors duration-300"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
                <span className="material-icons text-xl">{muted ? "volume_off" : "volume_up"}</span>
            </motion.div>
        </div>
    );
};

VideoCard.propTypes = {
    videoSrc: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
    activeVideo: PropTypes.number, // Index of the currently active video
    onAudioPlay: PropTypes.func, // Callback to notify parent of play event
};

export default VideoCard;
