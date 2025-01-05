import React from 'react';

const IngredientsTable = ({ data, colors }) => {
    if (!data || data.length === 0) {
        return <div className="max-w-3xl mx-auto mt-32">No nutritional information available.</div>;
    }

    const { primaryColor, secondaryColor } = colors;

    return (
        <div className="max-w-3xl mx-auto my-14 md:mt-32">
            <table className="table-auto w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border border-black py-2 px-4 font-medium" style={{ color: secondaryColor }}>Nutritional Information</th>
                        <th className="border border-black py-2 px-4 font-medium" style={{ color: secondaryColor }}>Per 100ml</th>
                    </tr>
                </thead>
                <tbody className='border border-black'>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4">{item.name}</td>
                            <td className="border-l border-black py-2 px-4">{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IngredientsTable;
