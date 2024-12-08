'use client';

import React, { useEffect, useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { useKeenSlider } from "keen-slider/react";
import 'keen-slider/keen-slider.min.css';
import ProductCard from '@/components/Product/ProductCard';
import { EmptyState, ErrorState, LoadingState } from '@/components/Global/States';
import PaginatedDots from '@/components/Global/PaginatedDots';
import SliderArrows from '@/components/Global/SliderArrows';
import 'animate.css'
import FillButton from '@/components/Global/Buttons/FillButton';

const ProductList = ({ title, subtitle, ...filterParams }) => {
    const { allProducts, isLoading, error, setQueryParams } = useProducts();

    useEffect(() => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            ...filterParams
        }));
    }, [setQueryParams]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: true,
            slides: {
                origin: "center",
                perView: 4.5,
                spacing: 25,
            },
            created() {
                setLoaded(true);
            },
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel);
            },
            drag: true,
            breakpoints: {
                "(max-width: 1024px)": {
                    slides: {
                        origin: "center",
                        perView: 3.5,
                        spacing: 15,
                    },
                },
                "(max-width: 768px)": {
                    slides: {
                        origin: "center",
                        perView: 1.5,
                        spacing: 15,
                    },
                },
            },
        },
        [
            (slider) => {
                let timeout;
                let mouseOver = false;

                const clearNextTimeout = () => clearTimeout(timeout);

                const nextTimeout = () => {
                    clearTimeout(timeout);
                    if (mouseOver) return; // Don't auto-scroll if mouse is hovering
                    timeout = setTimeout(() => {
                        slider.next(); // Move to the next slide
                    }, 3000); // Adjust auto-scroll interval
                };

                slider.on('created', () => {
                    // Add event listeners for hover
                    slider.container.addEventListener('mouseover', () => {
                        mouseOver = true;
                        clearNextTimeout(); // Stop auto-scrolling on hover
                    });
                    slider.container.addEventListener('mouseout', () => {
                        mouseOver = false;
                        nextTimeout(); // Resume auto-scrolling on mouse out
                    });
                    nextTimeout(); // Start auto-scrolling initially
                });

                slider.on('dragStarted', clearNextTimeout); // Stop auto-scrolling while dragging
                slider.on('animationEnded', nextTimeout); // Resume auto-scrolling after animation
                slider.on('updated', nextTimeout); // Ensure auto-scrolling works after updates
            },
        ]
    );

    if (isLoading) return <LoadingState height="50vh" />
    if (error) return <ErrorState message="Error fetching product." height="50vh" />
    if (!allProducts || allProducts.length === 0) return <EmptyState message="No Products Found" height="50vh" />

    return (
        <>
            <div className="product-list py-20 text-center">
                <div className='mb-10 mx-8'>
                    <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-green" data-aos="zoom-in-up">{title}</h1>
                    <p className="mb-4" data-aos="fade-in-left">{subtitle}</p>
                </div>
                <div className="navigation-wrapper mb-5">
                    <div ref={sliderRef} className="keen-slider">
                        {allProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    {loaded && instanceRef.current && (
                        <>
                            <SliderArrows
                                direction='left'
                                onClick={(e) =>
                                    e.stopPropagation() || instanceRef.current?.prev()
                                }
                                disabled={currentSlide === 0}
                            />
                            <SliderArrows
                                onClick={(e) =>
                                    e.stopPropagation() || instanceRef.current?.next()
                                }
                                disabled={
                                    currentSlide ===
                                    instanceRef.current.track.details.slides.length - 1
                                }
                            />
                        </>
                    )}
                </div>
                {loaded && instanceRef.current && <PaginatedDots currentSlide={currentSlide} instanceRef={instanceRef} />}
                <div className='flex justify-center items-center'>
                    <FillButton text="Shop All Flavours" color="bg-green" text_color="text-white" url="/about" />
                </div>
            </div>
        </>

    );
};

export default ProductList;
