import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import HeaderBurgerMenu from './HeaderBurgerMenu';

const Header = () => {
    return (
        <header className="sm:px-20 py-2 font-bold flex justify-normal sm:justify-between items-center bg-cream text-green sticky top-0 z-20">
            {/* Drawer Icon and Menu for Mobile */}
            <HeaderBurgerMenu />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex gap-10">
                <Link href="/about-us" className="hover:underline">About Us</Link>
                <Link href="/#product-list-section" className="hover:underline">Products</Link>
                <Link href="/distributor" className="hover:underline">Distributor</Link>

            </nav>

            {/* Logo */}
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Genki Ramune logo"
                    width={100}
                    height={125}
                    className="transition-transform translate-x-24 sm:translate-x-0 duration-500 transform hover:scale-110 fill-green"
                />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex gap-10">
                <Link href="/gallery" className="hover:underline">Gallery</Link>
                <Link href="gallery/#stories" className="hover:underline">Stories</Link>
                <Link href="/contact" className="hover:underline">Contact Us</Link>
            </nav>
        </header>
    );
};

export default Header;
