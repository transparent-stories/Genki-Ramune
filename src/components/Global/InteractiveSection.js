"use client";
import { useRouter } from "next/navigation";
import React from "react";

const InteractiveSection = ({ targetUrl, children }) => {
    const router = useRouter();
    targetUrl = targetUrl[0] === '/' ? targetUrl : `/${targetUrl}`

    const handleClick = () => {
        router.push(targetUrl);
    };

    return (
        <div
            className="cursor-pointer"
            onClick={handleClick}
        >
            {children}
        </div>
    );
};

export default InteractiveSection;
