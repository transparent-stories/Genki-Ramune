'use client';

import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFromApi } from '../utils/api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const { data: allProducts, isLoading, error, refetch } = useQuery({
        queryKey: ['allProducts'],
        queryFn: () => fetchFromApi('/products'),
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 5,
    });

    const fetchSingleProduct = async (productId) => {
        return fetchFromApi(`/products/${productId}`);
    };

    return (
        <ProductContext.Provider
            value={{
                allProducts,
                isLoading,
                error,
                fetchSingleProduct,
                refetch,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
