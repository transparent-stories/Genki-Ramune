import React from "react";
import FillButton from "../Global/Buttons/FillButton";
import Image from "next/image";
import InteractiveSection from "../Global/InteractiveSection";

const Banner = ({
    heading = "BlissFul Blueberry",
    text = "Soda that’s always a surprise",
    button = "View Now",
    desktopImage,
    mobileImage,
    url = "#"
}) => {
    return (
        <InteractiveSection targetUrl={"/about"}>
            <section className="relative bg-cover bg-center sm:aspect-[16/8] overflow-hidden">
                {/* Replace <picture> with <Image> */}
                <picture>
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
                        className="w-full h-auto"
                        priority // Load the image early as it's above-the-fold
                    />
                </picture>

                <div className="absolute inset-0 flex items-end lg:items-center px-8 lg:p-32 lg:w-1/2">
                    <div className="max-w-lg flex flex-col">
                        <h1 className="text-purple text-4xl font-bold sm:text-8xl">{heading}</h1>
                        <p className="mt-4 text-lg text-purple">{text}</p>
                        <FillButton text={button} color="bg-white" text_color="text-purple" url={url} />
                    </div>
                </div>
            </section>
        </InteractiveSection>
    );
};

export default Banner;
