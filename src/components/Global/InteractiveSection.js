"use client";
import { useRouter } from "next/navigation";
import React from "react";

const InteractiveSection = ({ targetUrl, children }) => {
    const router = useRouter();

    // Ensure targetUrl starts with '/' if defined, otherwise leave it undefined
    const normalizedUrl = targetUrl ? (targetUrl[0] === '/' ? targetUrl : `/${targetUrl}`) : undefined;

    const handleClick = () => {
        if (normalizedUrl) {
            router.push(normalizedUrl);
        }
    };

    return (
        <div
            className={normalizedUrl ? "cursor-pointer" : ""}
            onClick={normalizedUrl ? handleClick : undefined}
        >
            {children}
        </div>
    );
};

export default InteractiveSection;
