import React from 'react';
import Link from 'next/link'; // Import Next.js Link
import Image from 'next/image';

const PostCard = ({ image, title, slug }) => {
    return (
        <Link href={`/posts/${slug}`} passHref>
            <article
                data-aos="zoom-in-up"
                className="relative rounded-2xl text-left overflow-hidden cursor-pointer min-h-52 sm:h-[25vh] aspect-[16/10] transform transition-transform duration-300 hover:scale-105"
            >

                {/* Background Image */}
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={350}
                    className="w-full h-auto transition-transform duration-500 transform hover:scale-110"
                />

                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 transition-opacity duration-300 hover:opacity-80"></div>

                {/* Title */}
                <div className='absolute bottom-4 left-4 text-white z-10 h-1/5 px-2 pb-2'>
                    <h3 className="text-xl font-semibold">
                        {title}
                    </h3>
                </div>

            </article>
        </Link>
    );
};

export default PostCard;
