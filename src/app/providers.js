'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductProvider } from '../context/ProductContext';

const queryClient = new QueryClient();

export default function Providers({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ProductProvider>{children}</ProductProvider>
        </QueryClientProvider>
    );
}
