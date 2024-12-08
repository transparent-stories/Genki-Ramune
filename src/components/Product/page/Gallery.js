import SliderArrows from '@/components/Global/SliderArrows'
import { EmptyState } from '@/components/Global/States'
import productIcons from '@/utils/productIcons'
import React from 'react'

const Gallery = ({ images, colors }) => {
    if (!validateImages(images)) {
        return <EmptyState height="100px" message="No images found" />;
    }

    const { primaryColor, secondaryColor } = colors;

    let imageBackground = {
        '--primary-color': primaryColor,
        backgroundColor: primaryColor,
        color: secondaryColor,
    }

    let imagesForGrid = images.slice(1)

    const gridColumnMap = {
        0: "1 / 3", // Span both columns
        1: "1 / 2", // First column
        2: "2 / 3", // Second column
    };

    return (
        <div className="my-4 md:basis-3/5 md:h-2/3 flex flex-row flex-wrap md:none">
            {/* Div main image and 3 usps */}
            <div className='grid grid-cols-4 grid-rows-3 gap-4 w-full'>
                {/* Image 1 */}
                <div
                    className="col-span-3 row-span-3 aspect-square flex items-center justify-center rounded-2xl animate-image-background"
                    style={imageBackground}
                >
                    <img
                        src={images?.[0]?.src} // Replace with the actual image field
                        alt={images?.[0]?.alt || 'Image'} // Fallback alt text
                        className="object-contain w-4/5 h-4/5"
                    />
                </div>


                {/* USP1 */}
                {
                    productIcons.map(({ icon: Icon, name }, idx) => {
                        {/* console.log(icon) */ }
                        return <div key={idx} className="color-white p-2 sm:p-5 grid-col h-full flex items-center justify-center rounded-2xl animate-image-background"
                            style={imageBackground}
                        >
                            <Icon fill={secondaryColor} />
                        </div>
                    })
                }
            </div>

            <div
                className="flex relative flex-nowrap md:flex-wrap gap-4 mt-4 overflow-x-scroll md:overflow-visible"
                style={{
                    scrollbarColor: `${primaryColor} ${secondaryColor}`, // For Firefox
                    '--scrollbar-thumb-color': primaryColor,
                    '--scrollbar-track-color': secondaryColor,
                }}
            >
                {imagesForGrid.map((item, id) => (
                    <div
                        key={id}
                        className={`rounded-2xl mb-2 overflow-hidden h-[10em] sm:h-[13em] }`}
                        style={{
                            flexBasis: "calc(50% - 8px)",
                            flexGrow: 0,
                            flexShrink: 0,
                        }}
                    >
                        <img
                            src={item.src} // Replace with the actual image field
                            alt={item.alt || 'Image'} // Fallback alt text
                            className="object-cover w-full h-full aspect-square"
                        />
                    </div>
                ))}

                <SliderArrows direction="right" className="sm:hidden" />
            </div>
        </div>
    )
}

export default Gallery

const validateImages = (images) => {
    return Array.isArray(images) && images.every(img => img && img.src);
};
