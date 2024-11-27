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
            className="relative rounded-2xl p-4 overflow-hidden flex flex-col items-center justify-center"
            style={{ backgroundColor: secondaryColor, width: '300px', height: '400px' }}
            whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 250, damping: 20 },
            }}
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
                    scale: isHovered ? 0.9 : 1,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            ></motion.div>

            {/* Product Image */}
            <motion.img
                src={primaryImage}
                alt={product.name}
                className="w-64 h-64 object-contain z-10"
                animate={{
                    scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
            />

            {/* Product Name */}
            <motion.div
                className="absolute bottom-0 text-center font-semibold text-lg w-full overflow-hidden flex flex-col justify-end"
                style={{
                    color: primaryColor,
                    zIndex: 11,
                    padding: '25px 16px 8px 16px',
                }}
                animate={{
                    height: isHovered ? '40%' : '100%',
                    opacity: isHovered ? 1 : 0.9,
                    backgroundColor: isHovered ? secondaryColor : 'rgba(0, 0, 0, 0)',
                    paddingBottom: isHovered ? "40px" : "0px"
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
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
