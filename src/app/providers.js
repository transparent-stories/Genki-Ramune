'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductProvider } from '../context/ProductContext';
import { PageProvider } from '@/context/PageContext';

const queryClient = new QueryClient();

export default function Providers({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <PageProvider>
                <ProductProvider>{children}</ProductProvider>
            </PageProvider>
        </QueryClientProvider>
    );
}
