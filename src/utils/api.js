import axios from 'axios';

// Axios instance
const apiV3 = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WP_API_BASE_URL_V3,
    params: {
        consumer_key: process.env.NEXT_PUBLIC_WP_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_WP_CONSUMER_SECRET,
    },
});

const apiV2 = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WP_API_BASE_URL_V2,
    params: {
        consumer_key: process.env.NEXT_PUBLIC_WP_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_WP_CONSUMER_SECRET,
    },
});

// General API fetcher
export const fetchFromApi = async (endpoint, params = {}, version = "v3") => {
    const api = version === 'v2' ? apiV2 : apiV3;
    const { data } = await api.get(endpoint, { params });
    return data;
};
