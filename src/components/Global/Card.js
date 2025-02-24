import Image from 'next/image';
import React from 'react'
import Link from 'next/link';

const Card = ({ post_image, post_title, post_text, post_link }) => {

    const link = post_link === "" ? "/#" : post_link
    return (
        <Link
            href={link}
            passHref
            legacyBehavior // Add this if you're using an older Next.js version
        >
            <div
                className="block rounded-xl bg-white overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
            >
                {post_image && (
                    <div className="relative w-full aspect-square">
                        <Image
                            src={post_image}
                            alt={post_title || 'Post Image'}
                            layout="fill"
                            // width={1080}
                            // height={1080}
                            objectFit="cover"
                        />
                    </div>
                )}
                <div className="text-left p-5 flex flex-col gap-6">
                    {post_title && (
                        <h2 className="text-xl sm:text-2xl text-green font-semibold">{post_title}</h2>
                    )}
                    {post_text && <p className="text-gray-600 text-xs sm:text-sm">{post_text}</p>}
                    <div className="flex items-center gap-2 cursor-pointer text-green text-sm font-bold">
                        <span>Read More</span>
                        <svg width="20px" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card