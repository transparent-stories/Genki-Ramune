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
                    <div className="relative w-full h-96">
                        <Image
                            src={post_image}
                            alt={post_title || 'Post Image'}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                )}
                <div className="text-left p-5 flex flex-col gap-6">
                    {post_title && (
                        <h2 className="text-2xl text-green font-semibold">{post_title}</h2>
                    )}
                    {post_text && <p className="text-gray-600 text-sm">{post_text}</p>}
                </div>
            </div>
        </Link>
    );
};

export default Card