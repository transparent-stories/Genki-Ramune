import axios from 'axios';

// Axios instance
const apiWC = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WC_API_BASE_URL,
    params: {
        consumer_key: process.env.NEXT_PUBLIC_WP_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_WP_CONSUMER_SECRET,
    },
});

const apiWP = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WP_API_BASE_URL,
    params: {
        consumer_key: process.env.NEXT_PUBLIC_WP_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_WP_CONSUMER_SECRET,
    },
});

// General API fetcher
export const fetchFromApi = async (endpoint, params = {}, version = "wc") => {
    const api = version === "wp" ? apiWP : apiWC;
    const { data } = await api.get(endpoint, { params });
    return data;
};
