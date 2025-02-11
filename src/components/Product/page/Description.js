import React from 'react'
import parse from 'html-react-parser';
import FillButton from '@/components/Global/Buttons/FillButton';
import SwatchTabs from './SwatchTabs';

const Description = ({ product, colors }) => {

    if (!product || typeof product !== 'object') {
        throw Error("Invalid Product")
    }

    const { name, short_description: shortDescription, id, tags } = product;
    const firstTagId = tags?.length > 0 ? tags[0].id : "16";

    if (!name || !id) {
        throw Error("Invalid Product")
    }

    return (
        <div className="my-0 basis-2/5 sticky top-10">
            <div className='mb-5'>
                <h1
                    className="text-3xl sm:text-5xl font-extrabold mb-4 text-green"
                    style={{ color: colors.primaryColor }}
                >{name}</h1>
                <div className="mb-4 text-sm text-black">
                    {shortDescription ? parse(shortDescription) : "No description available."}
                </div>
            </div>
            <SwatchTabs currentTag={firstTagId} current={id} color={colors.primaryColor} />
            <FillButton text="Contact Us" color="bg-green" text_color="text-white" url="/contact" />
        </div>
    )
}

export default Description