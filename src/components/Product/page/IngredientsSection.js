import React from 'react'
import IngredientsTable from './IngredientsTable'
import parse from 'html-react-parser';

const IngredientsSection = ({ product, colors }) => {

    if (!product || typeof product !== 'object') {
        throw Error("Invalid Product")
    }

    const { name, description, id, meta_data } = product;
    const { primaryColor, secondaryColor } = colors;


    if (!name || !id) {
        throw Error("Invalid Product")
    }

    const ingredientTable = extractIngredientTable(meta_data);

    return (
        <>
            <div className='w-20 -mt-10 sm:mt-20 z-10 absolute right-10 h-auto'>
                {/* Decoration svg */}
                {
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill={secondaryColor}>
                        <path className="cls-1" d="m116.27,332.94s247.83,0,253.73-159.32c4.37-117.93-153.42-129.81-153.42-35.4s-76.71,182.92-100.31,194.72Z" />
                        <path className="cls-1" d="m59.96,319.24s77.05-64.96,37.13-116.03c-29.55-37.81-81.72-.15-56.98,29.2,24.75,29.35,24.09,76.98,19.85,86.83Z" />
                    </svg>
                }
            </div>

            <div className="w-full relative overflow-hidden" style={{ backgroundColor: secondaryColor }}>
                <svg className="wave-top absolute top-0 left-0 w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="white" fillOpacity="1" d="M0,96C120,144,240,192,360,186.7C480,181,600,123,720,101.3C840,80,960,96,1080,122.7C1200,149,1320,181,1440,192L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,0,0Z"></path>
                </svg>
                <div className='flex flex-col md:flex-row justify-evenly px-5 md:px-20 mt-[10%] mb-[5%] items-top'>

                    <div className="max-w-lg text-sm flex flex-col mt-32 gap-5" style={{ color: primaryColor }} >
                        <h1 className="text-4xl font-bold sm:text-7xl">{name}</h1>
                        {description ? parse(description) : "No description available."}
                    </div>

                    <IngredientsTable data={ingredientTable} colors={colors} />
                </div>
            </div>
        </>
    )
}

function extractIngredientTable(metadata) {
    const ingredientData = {};

    metadata.forEach(({ key, value }) => {
        const match = key.match(/^ingredient_table_(\d+)_(name|quantity)$/);

        if (match) {
            const [, index, type] = match;

            if (!ingredientData[index]) {
                ingredientData[index] = {};
            }
            ingredientData[index][type] = value;
        }
    });

    // Convert grouped data to an array
    return Object.values(ingredientData).map(({ name, quantity }) => ({
        name,
        quantity,
    }));
}

export default IngredientsSection