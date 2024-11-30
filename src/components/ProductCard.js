'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';

const ProductCard = ({ product }) => {
    const primaryColor = product.meta_data.find((meta) => meta.key === 'primary_color')?.value || '#ccc';
    const secondaryColor = product.meta_data.find((meta) => meta.key === 'secondary_color')?.value || '#f5f5f5';
    const secondaryImage = product.images[1]?.src || 'https://placehold.co/600x800/orange/white';
    const primaryImage = product.images[0]?.src || 'https://placehold.co/600x800/orange/white';

    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative rounded-2xl p-4 overflow-hidden flex flex-col items-center justify-center keen-slider__slide"
            style={{ backgroundColor: secondaryColor, width: '300px', height: '400px' }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Background Change on Hover */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${secondaryImage})`, aspectRatio: 1 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
            />

            {/* Circle */}
            <motion.div
                className="absolute"
                style={{
                    backgroundColor: primaryColor,
                    borderRadius: '50%',
                    width: '200px',
                    height: '200px',
                    top: '25%',
                    zIndex: 2,
                }}
                initial={{ scale: 1 }}
                animate={{
                    opacity: isHovered ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            ></motion.div>

            {/* Product Image */}
            <motion.img
                src={primaryImage}
                alt={product.name}
                className="w-64 h-64 object-contain z-10"
                animate={{
                    opacity: isHovered ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            />

            {/* Product Name */}
            <motion.div
                className="absolute bottom-0 text-center font-semibold text-lg w-full overflow-hidden flex flex-col justify-end"
                style={{
                    color: primaryColor,
                    zIndex: 11,
                    paddingRight: '16px',
                    paddingLeft: '16px',
                    clipPath: "polygon(100% 100%, 0% 100%, 0% 50%, 2% 48.97%, 4% 48.04%, 6% 47.31%, 8% 46.83%, 10% 46.67%, 12% 46.83%, 14% 47.31%, 16% 48.04%, 18% 48.97%, 20% 50%, 22% 51.03%, 24% 51.96%, 26% 52.69%, 28% 53.17%, 30% 53.33%, 32% 53.17%, 34% 52.69%, 36% 51.96%, 38% 51.03%, 40% 50%, 42% 48.97%, 44% 48.04%, 46% 47.31%, 48% 46.83%, 50% 46.67%, 52% 46.83%, 54% 47.31%, 56% 48.04%, 58% 48.97%, 60% 50%, 62% 51.03%, 64% 51.96%, 66% 52.69%, 68% 53.17%, 70% 53.33%, 72% 53.17%, 74% 52.69%, 76% 51.96%, 78% 51.03%, 80% 50%, 82% 48.97%, 84% 48.04%, 86% 47.31%, 88% 46.83%, 90% 46.67%, 92% 46.83%, 94% 47.31%, 96% 48.04%, 98% 48.97%, 100% 50%)"
                }}
                animate={{
                    height: isHovered ? '80%' : '100%',
                    opacity: isHovered ? 1 : 0.9,
                    backgroundColor: isHovered ? secondaryColor : 'rgba(0, 0, 0, 0)',
                    paddingBottom: isHovered ? "40px" : "0px",
                    paddingTop: isHovered ? "100px" : "0px"
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
                {/* Product Name */}
                <h3 className="text-2xl">{product.name}</h3>

                {/* Short Description and Button */}
                <motion.div
                    className="text-center flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                    {/* Short Description */}
                    <div
                        className="text-xs mb-2 font-light"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(product.short_description ?? ''),
                        }}
                    ></div>

                    {/* View Now Button */}
                    <motion.a
                        href={product.permalink}
                        className="relative text-black text-sm mb-2 font-light transition-colors duration-300 hover:text-black underline underline-offset-4"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        View Now
                    </motion.a>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ProductCard;
