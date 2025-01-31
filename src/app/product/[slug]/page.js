import { fetchFromApiWc } from '@/utils/api';
import { React, cache } from 'react';
import Gallery from '@/components/Product/page/Gallery';
import Description from '@/components/Product/page/Description';
import { ErrorState } from '@/components/Global/States';
import Link from 'next/link';
import IngredientsSection from '@/components/Product/page/IngredientsSection';

// Server-side function to fetch product data
const getProductData = cache(async (slug) => {
    try {
        // Fetch product data from WooCommerce API
        const product = await fetchFromApiWc(`/products`, { slug: slug, _fields: "id,name,description,short_description,images,meta_data,tags" }, "wc");
        return product;
    } catch (error) {
        console.error(`Error fetching product data for slug: ${slug}`, error);
        throw new Error("Product not found");
    }
})

// Metadata for SEO
export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const _products = await getProductData(slug);
        const product = _products?.[0];

        if (!product) {
            throw new Error("Product not found");
        }

        const title = product.name || "Product";
        const description = product.short_description || "Product details";
        const image = product.images?.[0]?.src || "https://placehold.co/400x600";

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                images: [image],
            },
        };
    } catch (error) {
        console.error(`Error generating metadata for slug: ${slug}`, error);
        return {
            title: "Product Not Found",
            description: "The product you are looking for could not be found.",
        };
    }
}

const validateProduct = (product) => {
    if (!product) return false;
    if (!product.name || !Array.isArray(product.images)) return false;
    return true;
};

// The dynamic product page
const ProductPage = async ({ params }) => {
    const { slug } = await params;

    try {
        // Fetch product data
        const _products = await getProductData(slug);
        const product = _products?.[0]

        if (!validateProduct(product)) {
            return <ErrorState message="Invalid product" height='100vh' />
        }

        const { primary_color: primaryColor = '#ccc', secondary_color: secondaryColor = '#f5f5f5' } = product?.meta_data?.reduce((acc, meta) => {
            acc[meta.key] = meta.value;
            return acc;
        }, {});

        return (
            <>
                <div
                    className="py-5 px-4 sm:py-20 sm:px-[10vw] relative flex flex-col md:flex-row gap-5 sm:gap-20"
                    style={{
                        '--secondary-color': "white",
                        backgroundColor: "white"
                    }}
                >
                    <Gallery images={product.images} colors={validateColors({ primaryColor, secondaryColor })} />
                    <div className="sticky top-10">
                        <Description product={product} colors={validateColors({ primaryColor, secondaryColor })} />
                    </div>
                </div>

                <IngredientsSection product={product} colors={validateColors({ primaryColor, secondaryColor })} />
            </>
        );
    } catch (error) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-2xl font-bold">Product Not Found</h1>
                <p className="mt-2">The product you are looking for does not exist.</p>
                <Link href="/" className="text-blue-500 underline">Return to Home</Link>
            </div>
        );
    }
};

export default ProductPage;

const validateColors = (colors) => {
    const isValidHex = (color) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color.trim());
    const isValidRGB = (color) =>
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i.test(color.trim()) &&
        color
            .match(/\d+/g)
            .every((value) => parseInt(value, 10) >= 0 && parseInt(value, 10) <= 255);

    return {
        primaryColor: isValidHex(colors?.primaryColor) || isValidRGB(colors?.primaryColor)
            ? colors.primaryColor.trim()
            : '#ccc',
        secondaryColor: isValidHex(colors?.secondaryColor) || isValidRGB(colors?.secondaryColor)
            ? colors.secondaryColor.trim()
            : '#f5f5f5',
    };
};