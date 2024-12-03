import Link from "next/link";
import React from "react";
import FillButton from "../Global/Buttons/FillButton";

const Banner = ({
    heading = "BlissFul Blueberry",
    text = "Soda that’s always a surprise",
    button = "View Now",
    desktopImage,
    mobileImage,
    url = "#" }) => {
    return (
        <div>
            <Link href="/about">
                <section className="relative bg-cover bg-center sm:aspect-[16/8] overflow-hidden">
                    <picture>
                        <source srcSet={desktopImage} media="(min-width: 768px)" />
                        <img
                            src={mobileImage}
                            alt={heading}
                            className="w-full h-auto"
                        />
                    </picture>
                    <div className="absolute inset-0 flex items-end lg:items-center px-8 py-8 lg:p-32 lg:w-1/2">
                        <div className="max-w-lg flex flex-col gap-4" data-aos="zoom-in-right">
                            <h1 className="text-purple text-4xl font-bold sm:text-8xl">{heading}</h1>
                            <p className="mt-4 text-lg text-purple">{text}</p>
                            <FillButton text={button} color="bg-white" text_color="text-purple" url={url} />
                        </div>
                    </div>
                </section>
            </Link>

        </div>

    );
};

export default Banner;

