
import Banner from '@/components/Home/Banner';
import { fetchFromApi } from '@/utils/api';
import React, { cache } from 'react'
import parse from 'html-react-parser';
import Image from 'next/image';
import ContactForm from '@/components/Contact Page/ContactForm';

const queryParams = { _fields: "id,title,acf", acf_format: "standard", status: "publish" };

// Server-side function to fetch product data
const getPageData = cache(async (id = "231") => {
    try {
        // Fetch product data from WooCommerce API
        const product = await fetchFromApi(`/pages/${id}`, queryParams, "wp");
        return product;
    } catch (error) {
        console.error(`Error fetching page data for distributor`, error);
        throw new Error("page not found");
    }
})

export async function generateMetadata() {

    try {
        const page = await getPageData();

        if (!page) {
            throw new Error("Page not found");
        }

        const title = page.title.rendered || "Distributors";

        return {
            title,
            // description,
            openGraph: {
                title,
                // description
            },
        };
    } catch (error) {
        console.error(`Error generating metadata for page`, error);
        return {
            title: "Page Not Found",
            description: "The page you are looking for could not be found.",
        };
    }
}

const page = async () => {

    const page = await getPageData();

    const {
        title: { rendered: title },
        acf: {
            banner_desktop,
            banner_mobile,
            section_1_title,
            section_1_text,
            section_2_title,
            section_2_text,
            section_2_contact_list,
            section_2_social_links
        }
    } = page

    const bannerProps = {
        heading: "",
        text: "",
        button: undefined,
        desktopImage: banner_desktop,
        mobileImage: banner_mobile,
        url: undefined,
    };

    const section2Props = {
        heading: section_2_title || "section 2 title",
        text: section_2_text || "section 2 text",
        contacts: section_2_contact_list,
        socials: section_2_social_links
    }

    return (
        <div className='bg-cream pb-10'>
            <Banner {...bannerProps} />
            <div className='py-10 mt-20 mx-4 text-center'>
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-16 text-green" data-aos="zoom-in-up">{section_1_title}</h1>
                <div className="" data-aos="fade-in-left">
                    {section_1_text ? parse(section_1_text) : "No description available."}
                </div>
            </div>
            <ContactForm />
            <Section2 {...section2Props} />
        </div>
    )
}

const Section2 = ({ text, contacts, socials }) => {

    return (
        <div className="relative w-full bg-[#fff0b4]">
            {/* Decorative SVG (Right-aligned) */}
            <div className="absolute right-10 top-[-40px] sm:top-20 w-20 h-auto z-10">
                <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 400 400"
                    fill="#fff0b4"
                >
                    <path
                        className="cls-1"
                        d="m116.27,332.94s247.83,0,253.73-159.32c4.37-117.93-153.42-129.81-153.42-35.4s-76.71,182.92-100.31,194.72Z"
                    />
                    <path
                        className="cls-1"
                        d="m59.96,319.24s77.05-64.96,37.13-116.03c-29.55-37.81-81.72-.15-56.98,29.2,24.75,29.35,24.09,76.98,19.85,86.83Z"
                    />
                </svg>
            </div>

            {/* Wave Top SVG */}
            <svg
                className="absolute top-0 left-0 w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
            >
                <path
                    fill="#fffbeb"
                    fillOpacity="1"
                    d="M0,96C120,144,240,192,360,186.7C480,181,600,123,720,101.3C840,80,960,96,1080,122.7C1200,149,1320,181,1440,192L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,0,0Z"
                ></path>
            </svg>

            {/* Content Section */}
            <div
                className="relative pt-[25%] z-20 mx-auto max-w-screen-lg px-6 sm:px-12 py-16"
                data-aos="fade-in-left"
            >
                <div className="text-left">
                    {/* Rendered text content */}
                    {text ? parse(text) : "No description available."}
                </div>

                <div className='flex flex-col sm:flex-row py-16 gap-10 sm:gap-0'>

                    {/* Contact info */}
                    <div className='flex flex-1 flex-col gap-5'>
                        {
                            contacts.map(({ contact_icon, contact_info }, idx) =>
                                <div key={idx} className='flex gap-5 items-start '>
                                    <Image
                                        src={contact_icon}
                                        alt={contact_info}
                                        width={25}
                                        height={25}
                                        className="ransition-transform duration-500 transform hover:scale-110 fill-green"
                                    />
                                    {contact_info ? parse(contact_info) : "No contact available."}
                                </div>
                            )
                        }
                    </div>

                    {/* Social Media Links */}
                    <div className='sm:border-l-2 flex-1 content-center sm:pl-10 border-t-amber-950'>
                        <p>Follow Us:</p>
                        <div className='flex gap-5 my-5 items-start '>
                            {
                                socials.map(({ social_icon, social_link }, idx) =>
                                    <a href={social_link} key={idx}>
                                        <Image
                                            src={social_icon}
                                            alt="social"
                                            width={40}
                                            height={40}
                                            className="ransition-transform duration-500 transform hover:scale-110 fill-green"
                                        />
                                    </a>
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default page