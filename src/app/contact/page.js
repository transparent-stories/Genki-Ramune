
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
            section_2_text
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
        text: section_2_text || "section 2 text"
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

const Section2 = ({ heading, text }) => {
    return (
        <div className='my-10 mt-20 mx-4 text-center'>
            <h1 className="text-4xl sm:text-6xl font-extrabold mb-16 text-green" data-aos="zoom-in-up">{heading}</h1>
            <div className="" data-aos="fade-in-left">
                {text ? parse(text) : "No description available."}
            </div>
        </div>
    )
}

export default page