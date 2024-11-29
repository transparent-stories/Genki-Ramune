import React from "react";

// General Arrow component
const SliderArrows = ({ direction = "right", onClick, disabled = false, className = "" }) => {
    const arrowClassNames = `arrow ${direction === "left" ? "arrow--left" : "arrow--right"} ${disabled ? "arrow--disabled" : ""} ${className}`;

    const getArrowPath = () => {
        if (direction === "left") {
            return (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            );
        } else {
            return (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            );
        }
    };

    return (
        <svg
            onClick={onClick}
            className={arrowClassNames}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {getArrowPath()}
        </svg>
    );
};

export default SliderArrows;
