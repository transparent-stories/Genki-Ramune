import React from 'react';
import Link from 'next/link'; // Import Next.js Link
import Image from 'next/image';

const PostCard = ({ image, title, slug, date }) => {
    return (
        <Link href={`/post/${slug}`} passHref>
            <article
                data-aos="fade"
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
                <div className='absolute bottom-4 left-4 text-white z-10 h-auto px-1 pb-2'>
                    <h3 className="text-l font-semibold">
                        {title}
                    </h3>
                    <p className="text-white text-sm">
                        {new Date(date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                </div>

            </article>
        </Link>
    );
};

export default PostCard;
