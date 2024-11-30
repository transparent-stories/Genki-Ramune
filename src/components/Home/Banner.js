import Link from "next/link";
import React from "react";

const Banner = ({ heading, text, button, desktopImage, mobileImage, url }) => {
    return (
        <div>
            <Link href="/about">
                <section className="m-0 p-0 relative bg-cover bg-center bg-no-repeat">
                    <picture>
                        <source srcSet={desktopImage} media="(min-width: 768px)" />
                        <img
                            src={mobileImage}
                            alt={heading}
                            className="w-full h-full object-cover"
                        />
                    </picture>
                    {/* <div className="absolute top-0 mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div className="max-w-xl text-left">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">{heading}</h1>

                    <p className="mt-4 max-w-lg sm:text-xl">{text}</p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <a
                            href={url}
                            className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                        >
                            {button}
                        </a>
                    </div>
                </div>
            </div> */}
                </section>
            </Link>
        </div>

    );
};

export default Banner;

