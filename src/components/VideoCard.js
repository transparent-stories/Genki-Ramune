'use client';

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const VideoCard = ({ videoSrc, idx }) => {
    const videoRef = useRef(null);
    const [muted, setMuted] = useState(true);

    const toggleMute = () => {
        const newMutedState = !muted;
        setMuted(newMutedState);
        if (videoRef.current) {
            videoRef.current.muted = newMutedState;
        }
    };

    return (
        <div
            className="relative video-card border-4 m-4 border-red keen-slider__slide"
            data-aos="fade-in-left"
            style={{
                marginBlockEnd: `${idx % 2 === 0 ? "0px" : "20px"}`,
                marginBlockStart: `${idx % 2 !== 0 ? "-20px" : "0px"}`,
            }}
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
};

export default VideoCard;
