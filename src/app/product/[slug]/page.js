import { fetchFromApi } from '@/utils/api';
import { React, cache } from 'react';
import parse from 'html-react-parser';

// Server-side function to fetch product data
const getProductData = cache(async (slug) => {
    try {
        // Fetch product data from WooCommerce API
        const product = await fetchFromApi(`/products`, { slug: slug }, "wc");
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
        const description = product.name || "Product details";
        const image = product.images?.[0]?.src || "https://placehold.co/400x600"; // Fallback image

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                image,
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


// The dynamic product page
const ProductPage = async ({ params }) => {
    const { slug } = await params;

    try {
        // Fetch product data
        const _products = await getProductData(slug);
        const product = _products?.[0]

        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="my-4">
                    <img
                        src={product.images?.[0]?.src} // Replace with the actual image field
                        alt={product.name}
                        className="w-full max-w-md object-cover"
                    />
                </div>
                <div className="text-xs mb-2 font-light">
                    {parse(product.description)}
                </div>
                <p className="text-2xl font-semibold">${product.price}</p>
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Add to Cart
                </button>
            </div>
        );
    } catch (error) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-2xl font-bold">Product Not Found</h1>
                <p className="mt-2">The product you are looking for does not exist.</p>
            </div>
        );
    }
};

export default ProductPage;
