/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'genki-backend.justaddcollagen.com',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
};

export default nextConfig;
