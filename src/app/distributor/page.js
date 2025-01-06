
import Banner from '@/components/Home/Banner';
import { fetchFromApi } from '@/utils/api';
import React, { cache } from 'react'
import parse from 'html-react-parser';
import DistributorPerks from '@/components/Distributor Page/DistributorPerks';
import Image from 'next/image';
import DistributorForm from '@/components/Distributor Page/DistributorForm';

const queryParams = { _fields: "id,title,acf", acf_format: "standard", status: "publish" };

// Server-side function to fetch product data
const getPageData = cache(async (id = "161") => {
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
            section_2_distributor_perks,
            section_3_title,
            section_3_distributor_list,
            section_4_title
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

    const perkSectionProps = {
        heading: section_2_title,
        perks: section_2_distributor_perks
    }

    const distributorListSectionProps = {
        heading: section_3_title,
        distributor_list: section_3_distributor_list
    }

    const distributorFormProps = {
        heading: section_4_title || "Ready to join us?"
    }

    return (
        <div>
            <Banner {...bannerProps} />
            <div className='my-10 mt-20 mx-4 text-center'>
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-16 text-green" data-aos="zoom-in-up">{section_1_title}</h1>
                <div className="" data-aos="fade-in-left">
                    {section_1_text ? parse(section_1_text) : "No description available."}
                </div>
            </div>
            <DistributorPerks {...perkSectionProps} />
            <DistributorList {...distributorListSectionProps} />
            <div className='mb-16 md:m-0 mx-4 text-center'>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-green" data-aos="zoom-in-up">{section_4_title}</h1>
            </div>
            <DistributorForm {...distributorFormProps} />
        </div>
    )
}

const DistributorList = ({ heading, distributor_list }) => {
    return (
        <div className="py-10 px-8 sm:pt-10 text-center flex flex-col items-center">
            <div className='mb-10'>
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-green" data-aos="zoom-in-up">{heading}</h1>
            </div>

            <div className='flex flex-col md:w-1/2'>
                {distributor_list.map((distributor, idx) => (
                    <div className='flex justify-center items-center gap-10 md:gap-20 h-[20%]' key={idx}>
                        <picture className='object-contain mb-4 w-1/2 ' data-aos="fade-in-left">
                            <Image
                                src={distributor.icon}
                                alt={heading}
                                width={1920}
                                height={1080}
                                className="h-auto"
                                priority
                            />
                        </picture>
                        <div className="mb-4 w-[70%] text-xs md:text-sm font-thin text-gray-600" data-aos="fade-in-left">
                            {distributor.content ? parse(distributor.content) : "No description available."}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page