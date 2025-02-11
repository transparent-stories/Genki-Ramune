'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HeaderBurgerMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Ensures the component is rendered on the client side
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const navigateTo = () => {
        setIsMenuOpen(false);
    };

    if (!isClient) {
        return null; // Prevent rendering the component on the server
    }

    return (
        <div className="lg:hidden relative">
            {/* Burger Icon */}
            <button
                onClick={toggleMenu}
                id="menu-button"
                className="cursor-pointer px-6"
                data-menu-open={isMenuOpen ? "true" : "false"}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Drawer Menu */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: isMenuOpen ? 'auto' : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute top-18 px-6 left-0 w-[100vw] bg-cream shadow-lg overflow-hidden"
            >
                <nav className="flex flex-col gap-6">
                    <Link href="/about-us" onClick={() => navigateTo()} className="hover:underline pt-6">
                        About Us
                    </Link>
                    <Link href="/#product-list-section" onClick={() => navigateTo()} className="hover:underline">
                        Products
                    </Link>
                    <Link href="/distributor" onClick={() => navigateTo()} className="hover:underline">
                        Distributor
                    </Link>
                    <Link href="/gallery" onClick={() => navigateTo()} className="hover:underline">
                        Gallery
                    </Link>
                    <Link href="/gallery/#stories" onClick={() => navigateTo()} className="hover:underline">
                        Stories
                    </Link>
                    <Link href="/contact" onClick={() => navigateTo()} className="hover:underline pb-6">
                        Contact Us
                    </Link>
                </nav>
            </motion.div>
        </div>
    );
};

export default HeaderBurgerMenu;
