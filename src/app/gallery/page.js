
import Banner from '@/components/Home/Banner';
import { fetchFromApiWp } from '@/utils/api';
import React, { cache } from 'react'
import parse from 'html-react-parser';
import Image from 'next/image';
import ContactForm from '@/components/Contact Page/ContactForm';
import Card from '@/components/Global/Card';
import FillButton from '@/components/Global/Buttons/FillButton';

const queryParams = { _fields: "id,title,acf", acf_format: "standard", status: "publish" };

// Server-side function to fetch product data
const getPageData = cache(async (id = "267") => {
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
            section_1_cards,
            section_2_title,
            section_2_cards,
            section_3_title,
            section_3_text,
            section_3_image
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

    const section1Props = {
        heading: section_1_title || "section 2 title",
        social_posts: section_1_cards || []
    }

    const section2Props = {
        heading: section_2_title || "section 2 title",
        social_posts: section_2_cards || []
    }

    const section3Props = {
        heading: section_3_title || "section 3 title",
        text: section_3_text || "Section 3 text",
        image: section_3_image || "https://picsum.photos/800"
    }

    return (
        <div className='bg-cream'>
            <Banner {...bannerProps} />
            <Section1 {...section1Props} />
            <Section2 {...section2Props} />
            <Section3 {...section3Props} />
        </div>
    )
}


const Section1 = ({ heading, social_posts }) => {
    return (
        <div className='pt-10 pb-0 m-10 sm:my-5 sm:mx-20 text-center'>
            <h1 className="text-4xl sm:text-6xl font-extrabold mb-10 sm:mb-20 text-green" data-aos="zoom-in-up">{heading}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {social_posts.map((post, idx) => (
                    <Card key={idx} {...post} />
                ))}
            </div>
            <div className='flex justify-center items-center'>
                <FillButton text="See More" color="bg-green" text_color="text-white" url="https://www.instagram.com/genkiramune_japan/" />
            </div>
        </div>
    )
}

const Section2 = ({ heading, social_posts }) => {

    return (
        <div className='relative pt-32 pb-10 p-10 sm:px-20 text-center bg-[#5b955a]'>

            <div className="absolute right-10 top-[-60px] w-20 h-auto z-10">
                <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 400 400"
                    fill="#fff0b4"
                    className='fill-[#5b955a]'
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
                viewBox="0 0 1440 100"
            >
                <path
                    fill="#fffbeb"
                    fillOpacity="1"
                    d="M0,64C120,72,240,80,360,78C480,76,600,68,720,64C840,60,960,64,1080,68C1200,72,1320,76,1440,80L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,0,0Z"
                ></path>
            </svg>


            <h1 className="text-4xl sm:text-6xl font-extrabold mb-10 sm:mb-20 text-white" data-aos="zoom-in-up">{heading}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {social_posts.map((post, idx) => (
                    <Card key={idx} {...post} />
                ))}
            </div>
            <div className='flex justify-center items-center'>
                <FillButton text="See More" color="bg-white" text_color="text-green" url="https://www.instagram.com/genkiramune_japan/" />
            </div>

            {/* Wave Top SVG */}
            <svg
                className="absolute bottom-[-10] left-0 w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 100"
            >
                <path
                    fill="#5b955a"
                    fillOpacity="1"
                    d="M0,64C120,72,240,80,360,78C480,76,600,68,720,64C840,60,960,64,1080,68C1200,72,1320,76,1440,80L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,0,0Z"
                ></path>
            </svg>

        </div>
    )
}

const Section3 = ({ heading, text, image }) => {


    return (
        <section className="bg-cover bg-center sm:aspect-[16/9] overflow-hidden flex flex-col sm:flex-row">

            <div className="inset-0 flex items-top px-8 lg:p-32 lg:w-2/3">
                <div className="max-w-lg mt-20 flex flex-col text-black">
                    <h1 className="text-green text-5xl font-bold sm:text-7xl mb-10">{heading}</h1>
                    {text ? parse(text) : "No description available."}
                    {/* {button && <FillButton text={button} color="bg-white" text_color="text-purple" url={url} />} */}
                </div>
            </div>

            {/* Replace <picture> with <Image> */}
            <picture className="p-10 ">
                {/* Desktop image for larger screens */}
                {/* <source srcSet={image} media="(min-width: 768px)" /> */}
                {/* Mobile image for smaller screens */}
                <Image
                    src={image} // Mobile image source
                    alt={heading}
                    // layout="responsive" // Ensures the image is responsive
                    width={1920} // Specify the width of the desktop image
                    height={1080} // Specify the height of the desktop image
                    sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizes for better loading
                    className="w-full h-full object-contain"
                    priority // Load the image early as it's above-the-fold
                />
            </picture>


        </section>
    )
}

export default page