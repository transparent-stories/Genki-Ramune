import React from 'react'

const PaginatedDots = ({ currentSlide, instanceRef }) => {
    return (
        <div className="dots">
            {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
                <button
                    key={idx}
                    onClick={() => {
                        instanceRef.current?.moveToIdx(idx);
                    }}
                    className={"dot" + (currentSlide === idx ? " active" : "")}
                ></button>
            ))}
        </div>
    );
};

export default PaginatedDots