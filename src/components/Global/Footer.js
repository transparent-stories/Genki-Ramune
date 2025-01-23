import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-green text-white py-8">
            <div className="container mx-auto px-6">
                {/* Top Section */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-6 md:gap-8 py-8">
                    <div>
                        <p className="font-bold text-2xl md:text-lg mb-4">Shop</p>
                        <ul className="space-y-2">
                            <li>Flavours</li>
                            <li>Wholesale</li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-bold text-2xl md:text-lg mb-4">Help</p>
                        <ul className="space-y-2">
                            <li>FAQs</li>
                            <li><Link href='/contact'>Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-bold text-2xl md:text-lg mb-4">Genki Ramune</p>
                        <ul className="space-y-2">
                            <li><Link href='/about-us'>About Us</Link></li>
                            <li>Testimonials</li>
                            <li>Blog</li>
                        </ul>
                    </div>

                    <div className="col-span-2">
                        <p className="font-bold text-2xl md:text-lg mb-4">Subscribe</p>
                        <form className="flex flex-col md:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="flex-grow px-4 py-2 text-green rounded-full focus:outline-green"
                            />
                            <button
                                type="submit"
                                className="bg-orange text-white py-2 px-5 hover:bg-orange-600 rounded-full w-1/2 md:w-auto"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>


                {/* Bottom Section */}
                <div className="mt-4 pt-8 border-t border-white border-opacity-30 text-center md:text-left md:flex items-center justify-between">
                    <p>@ 2024 Genki Ramune, Inc. All Rights Reserved</p>
                    <div className="flex flex-wrap opacity-50 justify-center md:justify-between items-center space-x-10">
                        <a href="#" className="hover:underline">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:underline">
                            Private Policy
                        </a>
                        <a href="#" className="hover:underline">
                            Do Not Sell My Information
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
