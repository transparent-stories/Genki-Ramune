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
        <div className="w-full relative overflow-hidden" style={{ backgroundColor: primaryColor }}>
            <svg className="wave-top absolute top-0 left-0 w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="white" fillOpacity="1" d="M0,96C120,144,240,192,360,186.7C480,181,600,123,720,101.3C840,80,960,96,1080,122.7C1200,149,1320,181,1440,192L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,0,0Z"></path>
            </svg>
            <div className='flex flex-col md:flex-row px-5 md:px-20 my-[10%] items-top'>

                <div className="max-w-lg text-sm flex flex-col mt-32 gap-5" style={{ color: secondaryColor }} >
                    <h1 className="text-4xl font-bold sm:text-7xl">{name}</h1>
                    {description ? parse(description) : "No description available."}
                </div>

                <IngredientsTable data={ingredientTable} colors={colors} />
            </div>
        </div>
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