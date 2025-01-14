'use client';
import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import VideoCard from '@/components/Video/VideoCard';
import { EmptyState } from '@/components/Global/States';

const VideoList = ({ videos }) => {
    const [activeVideo, setActiveVideo] = useState(null); // Tracks the active video index

    const handlePlay = (idx) => {
        setActiveVideo(idx); // Update active video when a video starts playing
    };

    const [sliderRef] = useKeenSlider(
        {
            loop: false,
            renderMode: "performance",
            slides: {
                mode: 'free-snap',
                perView: 4,
                spacing: 15,
            },
            breakpoints: {
                "(max-width: 1024px)": {
                    slides: {
                        perView: 3,
                        spacing: 15,
                    },
                },
                "(max-width: 768px)": {
                    slides: {
                        perView: 1.5,
                        spacing: 15,
                    },
                },
            },
        },
        [
            (slider) => {
                let timeout;
                let mouseOver = false;
                function clearNextTimeout() {
                    clearTimeout(timeout);
                }
                function nextTimeout() {
                    clearTimeout(timeout);
                    if (mouseOver) return;
                    timeout = setTimeout(() => {
                        slider.next();
                    }, 5000);
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false;
                        nextTimeout();
                    });
                    nextTimeout();
                });
                slider.on("dragStarted", clearNextTimeout);
                slider.on("animationEnded", nextTimeout);
                slider.on("updated", nextTimeout);
            },
        ]
    );

    if (!videos || videos.length === 0) return <EmptyState height="100px" message="No Videos Found" />;

    return (
        <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
                {videos.map((item, idx) => (
                    <VideoCard
                        key={idx}
                        idx={idx}
                        videoSrc={item?.video}
                        activeVideo={activeVideo} // Pass active video index
                        onAudioPlay={handlePlay} // Pass callback to update active video
                    />
                ))}
            </div>
        </div>
    );
};

export default VideoList;
