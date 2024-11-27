import axios from 'axios';

// Axios instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WP_API_BASE_URL,
    params: {
        consumer_key: process.env.NEXT_PUBLIC_WP_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_WP_CONSUMER_SECRET,
    },
});

// General API fetcher
export const fetchFromApi = async (endpoint, params = {}) => {
    const { data } = await api.get(endpoint, { params });
    return data;
};
