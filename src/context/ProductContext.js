'use client';

import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFromApi } from '../utils/api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [queryParams, setQueryParams] = useState({});

    const { data: allProducts, isLoading, error, refetch } = useQuery({
        queryKey: ['allProducts', queryParams],
        queryFn: () => fetchFromApi('/products', queryParams),
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 5,
    });

    const fetchSingleProduct = (productId) => {
        return useQuery(
            ['singleProduct', productId], // unique key for each product
            () => fetchFromApi(`/products/${productId}`),
            {
                enabled: !!productId, // ensures it runs only when productId is provided
                staleTime: 1000 * 60 * 5, // optional stale time for caching
            }
        );
    };

    return (
        <ProductContext.Provider
            value={{
                allProducts,
                isLoading,
                error,
                fetchSingleProduct,
                refetch,
                setQueryParams
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
