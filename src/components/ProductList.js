'use client';

import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';

const ProductList = () => {
    const { allProducts, isLoading, error } = useProducts();

    if (isLoading) {
        return <div className="text-center">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Failed to load products. Please try again.</div>;
    }

    if (!allProducts || allProducts.length === 0) {
        return <div className="text-center text-gray-600">No products available.</div>;
    }

    return (
        <div className="product-list">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4.5 gap-4">
                {allProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
