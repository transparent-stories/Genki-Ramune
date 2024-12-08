import React from 'react';
import PropTypes from 'prop-types';
import 'animate.css';
import VideoList from '@/components/Video/VideoList';

const VideoFeed = ({ title, subtitle, videos }) => {
    return (
        <div className="py-20 sm:p-20 text-center bg-pink">
            <div className="flex flex-col items-center mx-8">
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-red w-full sm:w-2/3" data-aos="zoom-in-up">
                    {title}
                </h1>
                <p className="mb-4 text-base sm:text-lg" data-aos="fade-in-left">{subtitle}</p>
            </div>
            <VideoList videos={videos} />
        </div>
    );
};

VideoFeed.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    videos: PropTypes.arrayOf(
        PropTypes.shape({
            video: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default VideoFeed;
