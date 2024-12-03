'use client';

import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import VideoCard from './VideoCard';
import { EmptyState } from './Global/States';

const animation = { duration: 5000, easing: (t) => t }

const VideoList = ({ videos }) => {

    const [sliderRef] = useKeenSlider(
        {
            loop: false,
            renderMode: "performance",
            slides: {
                mode: 'center',
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
                        perView: 2,
                        spacing: 15,
                    },
                },
            }
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

    if (!videos || videos.length === 0) return <EmptyState height='100px' message='No Videos Found' />

    return (

        <div className='navigation-wrapper'>
            <div ref={sliderRef} className="keen-slider">
                {videos.map((item, idx) => (
                    <VideoCard key={idx} idx={idx} videoSrc={item?.video} />
                ))}
            </div>
        </div>
    );
};

export default VideoList;