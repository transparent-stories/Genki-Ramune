
import Banner from '@/components/Home/Banner';
import { fetchFromApiWp } from '@/utils/api';
import React, { cache } from 'react'
import parse from 'html-react-parser';
import Image from 'next/image';
import AboutBanner from '@/components/About Page/AboutBanner';

const queryParams = { _fields: "id,title,acf", acf_format: "standard", status: "publish", id: '199' };

// Server-side function to fetch product data
const getPageData = cache(async (id = "199") => {
    try {
        // Fetch product data from WooCommerce API
        const product = await fetchFromApiWp(`/pages/${id}`, queryParams, "wp");
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
            banner_2_desktop,
            banner_2_mobile
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

    const banner2Props = {
        heading: section_2_title,
        text: section_2_text,
        button: undefined,
        desktopImage: banner_2_desktop,
        mobileImage: banner_2_mobile,
        url: undefined,
    }

    return (
        <div className='bg-cream'>
            <Banner {...bannerProps} />
            <div className='mt-24 mb-32 mx-8 text-center flex flex-col items-center'>
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-10 text-green" data-aos="zoom-in-up">{section_1_title}</h1>
                <div className="font-extralight text-base text-justify sm:max-w-[50%]" data-aos="fade-in-left">
                    {section_1_text ? parse(section_1_text) : "No description available."}
                </div>
            </div>
            <AboutBanner {...banner2Props} />
        </div>
    )
}

export default page