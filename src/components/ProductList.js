'use client';

import React, { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useKeenSlider } from "keen-slider/react";
import 'keen-slider/keen-slider.min.css';
import ProductCard from './ProductCard';
import { EmptyState, ErrorState, LoadingState } from './States';
import PaginatedDots from './PaginatedDots';
import SliderArrows from './SliderArrows';

const ProductList = (filterParams) => {
    const { allProducts, isLoading, error, setQueryParams } = useProducts();

    useEffect(() => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            ...filterParams,
        }));
    }, [filterParams, setQueryParams]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: true,
            slides: {
                origin: "center",
                perView: 5,
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
                        perView: 4,
                        spacing: 15,
                    },
                },
                "(max-width: 768px)": {
                    slides: {
                        perView: 2,
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

    if (isLoading) return <LoadingState />
    if (error) return <ErrorState />
    if (!allProducts || allProducts.length === 0) return <EmptyState />

    return (
        <div className="product-list">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="navigation-wrapper">
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
        </div>
    );
};

export default ProductList;
