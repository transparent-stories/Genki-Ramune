import React from 'react'
import parse from 'html-react-parser';
import FillButton from '@/components/Global/Buttons/FillButton';
import SwatchTabs from './SwatchTabs';

const Description = ({ product, colors }) => {

    if (!product || typeof product !== 'object') {
        throw Error("Invalid Product")
    }

    const { name, short_description: shortDescription, id } = product;

    if (!name || !id) {
        throw Error("Invalid Product")
    }

    return (
        <div className="my-0 basis-2/5 sticky top-10">
            <div className='mb-5'>
                <h1
                    className="text-3xl sm:text-5xl font-extrabold mb-4 text-green"
                    data-aos="zoom-in-right"
                    style={{ color: colors.primaryColor }}
                >{name}</h1>
                <div className="mb-4" data-aos="zoom-in-right" style={{ color: colors.primaryColor }}>
                    {shortDescription ? parse(shortDescription) : "No description available."}
                </div>
            </div>
            <SwatchTabs current={id} />
            <FillButton text="Shop All Flavours" color="bg-green" text_color="text-white" url="/about" />
        </div>
    )
}

export default Description