import axios from 'axios';

// Axios instance for WooCommerce
const apiWC = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WC_API_BASE_URL,
    params: {
        consumer_key: process.env.NEXT_PUBLIC_WP_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_WP_CONSUMER_SECRET,
    },
    timeout: 10000, // 10 seconds timeout
});

// Axios instance for WordPress
const apiWP = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WP_API_BASE_URL,
    params: {
        consumer_key: process.env.NEXT_PUBLIC_WP_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_WP_CONSUMER_SECRET,
    },
    timeout: 10000, // 10 seconds timeout
});

// General API fetcher
export const fetchFromApi = async (endpoint, params = {}, version = "wc") => {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_WC_API_BASE_URL || !process.env.NEXT_PUBLIC_WP_API_BASE_URL) {
        console.error("API base URLs are not defined in environment variables.");
        throw new Error("API base URL is missing.");
    }

    const api = version === "wp" ? apiWP : version === "wc" ? apiWC : null;

    if (!api) {
        throw new Error(`Invalid API version: ${version}`);
    }

    try {
        const { data } = await api.get(endpoint, { params });
        return data;
    } catch (error) {
        console.error(`[fetchFromApi] Error fetching from ${endpoint}`, error.message);
        throw new Error("Error fetching data from API.");
    }
};
