import React from "react";
import FillButton from "../Global/Buttons/FillButton";
import Image from "next/image";
import InteractiveSection from "../Global/InteractiveSection";
import parse from 'html-react-parser';

const AboutBanner = ({
    heading = "BlissFul Blueberry",
    text = "Soda that’s always a surprise",
    button,
    desktopImage,
    mobileImage,
    url
}) => {
    return (
        <InteractiveSection targetUrl={url}>
            <section className="relative bg-cover bg-center aspect-[4/5] sm:aspect-[16/9] overflow-hidden mt-20">
                {/* Replace <picture> with <Image> */}
                <picture className="">
                    {/* Desktop image for larger screens */}
                    <source srcSet={desktopImage} media="(min-width: 768px)" />
                    {/* Mobile image for smaller screens */}
                    <Image
                        src={mobileImage} // Mobile image source
                        alt={heading}
                        // layout="responsive" // Ensures the image is responsive
                        width={1920} // Specify the width of the desktop image
                        height={1080} // Specify the height of the desktop image
                        sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizes for better loading
                        className="w-full h-full object-cover"
                        priority // Load the image early as it's above-the-fold
                    />
                </picture>

                <div className="absolute inset-0 flex items-top px-8 lg:p-32 w-8/12 lg:w-1/2">
                    <div className="max-w-lg mt-20 flex flex-col text-black">
                        <h1 className="text-green mb-6 text-4xl font-bold sm:text-7xl">{heading}</h1>
                        {text ? parse(text) : "No description available."}
                        {button && <FillButton text={button} color="bg-white" text_color="text-purple" url={url} />}
                    </div>
                </div>
            </section>
        </InteractiveSection>
    );
};

export default AboutBanner;
