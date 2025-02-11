'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { useProducts } from '@/context/ProductContext';
import InteractiveSection from '@/components/Global/InteractiveSection';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { EmptyState, ErrorState, LoadingState } from '@/components/Global/States';
import PropTypes from 'prop-types';


const SwatchTabs = ({ currentTag, current, color }) => {
    const { allProducts, isLoading, error, setQueryParams } = useProducts();
    const [activeTag, setActiveTag] = useState(currentTag.toString()); // Initial active tag

    // Update query params only when the active tag changes
    useEffect(() => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            tag: activeTag,
        }));

    }, [activeTag, allProducts, setQueryParams]);

    const handleTabSwitch = (tag) => {
        setActiveTag(tag); // Update the active tag
    };

    return (
        <div>
            <div className="sm:w-[36vw] text-sm">
                {/* Tab buttons */}
                <button
                    onClick={() => handleTabSwitch("16")}
                    className={`p-4 rounded-tl-xl rounded-tr-xl border-[1px] border-b-0 ${activeTag === "16" ? `bg-white text-green` : "bg-gray-200 text-gray-400 opacity-70 border-gray-200"} w-1/2`}
                >
                    Our Flavours
                </button>
                <button
                    onClick={() => handleTabSwitch("37")}
                    className={`p-4 rounded-tl-xl rounded-tr-xl border-[1px] border-b-0  ${activeTag === "37" ? "bg-white text-green" : "bg-gray-200 text-gray-400 opacity-70 border-gray-200"} w-1/2`}
                >
                    500ml Bottle Cans
                </button>
            </div>

            {/* Display fetched products or loading/error states */}
            <AnimatePresence mode="wait">
                <motion.div className='px-4 py-4 border-[1px] border-gray-200 border-t-0 bg-white rounded-bl-xl rounded-br-xl'
                >

                    {isLoading ? (
                        <LoadingState height='20vh' message='Loading Variants' />
                    ) : error ? (
                        <ErrorState height='20vh' message='Error fetching variants' />
                    ) : allProducts.length === 0 ? (
                        <EmptyState height='20vh' message='No Variants Found' />
                    ) : (
                        <motion.ul className="grid grid-cols-2 gap-4"
                            // initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 }, // Stagger each swatch animation by 0.1s
                                },
                                exit: { opacity: 0 },
                            }}
                        >
                            {allProducts.map((product) => {
                                const { primary_color: primaryColor = '#ccc' } = product?.meta_data?.reduce((acc, meta) => {
                                    acc[meta.key] = meta.value;
                                    return acc;
                                }, {});
                                return (
                                    <Swatch
                                        key={product.id}
                                        id={product.id}
                                        url={`/product/${product.slug}`}
                                        current={current}
                                        name={product.name}
                                        color={primaryColor}
                                        img={product?.images?.[0]?.src || "https://placehold.co/400x600.jpg"}
                                    />
                                );
                            })}
                        </motion.ul>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const Swatch = ({ id, name, color, current, url, img }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.li className="flex items-center rounded-xl overflow-hidden bg-white border-[1px] hover:border-green"
            animate={{
                borderColor: current === id || isHovered ? "green" : "lightgrey",
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.01 }}
            variants={{
                hidden: { opacity: 0, scale: 0.95, y: 20 }, // Start hidden, scaled down, and slightly below
                visible: { opacity: 1, scale: 1, y: 0 },    // Fade in, scale up, and move to position
                exit: { opacity: 0, scale: 0.95, y: 20 },   // Optional exit animation
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            <InteractiveSection targetUrl={url}>
                <div
                    className="flex items-center space-x-2 bg-white"
                >
                    {/* Swatch Image */}
                    <div
                        className="w-auto h-16 aspect-square flex items-center justify-center"
                        style={{
                            backgroundColor: color,
                        }}
                    >
                        <Image
                            src={img}
                            width={50}
                            height={50}
                            alt={name}
                            className="object-contain w-4/5 h-4/5"
                        />
                    </div>

                    {/* Swatch Name */}
                    <div className="text-gray-800 font-normal text-xs px-5 w-full">{name}</div>
                </div>
            </InteractiveSection>
        </motion.li>
    );
};

export default SwatchTabs;

SwatchTabs.propTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Swatch.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    url: PropTypes.string.isRequired,
    img: PropTypes.string,
};