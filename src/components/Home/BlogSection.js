import { fetchFromApi } from '@/utils/api';
import React from 'react'
import { EmptyState } from '../Global/States';
import PostCard from '../Blog Post/PostCard';
import FillButton from '../Global/Buttons/FillButton';

async function getAllPostsData(query) {
    try {
        // Fetch product data from WooCommerce API
        const posts = await fetchFromApi(`/posts`, query, "wp");
        return posts;
    } catch (error) {
        console.error(`Error fetching product data for slug: ${slug}`, error);
        throw new Error("Posts not found");
    }
}

const BlogSection = async ({ queryParams }) => {

    let posts = await getAllPostsData(queryParams)

    if (!posts || posts.length === 0) return <EmptyState height='100px' message='No posts Found' />

    return (
        <div className="py-20 px-0 sm:p-20 text-center min-h-screen flex flex-col justify-center">
            <div className='mb-10 mx-8'>
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-green" data-aos="zoom-in-up">The Genki Ramune Stories</h1>
                <p className="mb-4" data-aos="fade-in-left">Elevating Ramune, One Story at a Time</p>
            </div>
            <div className="blog-list flex flex-wrap justify-center gap-8 mt-12 mb-4">
                {posts.map((post) => <PostCard key={post?.id} id={post?.id} image={post?.featured_image_src} title={post?.title?.rendered} slug={post?.slug} />)}
            </div>
            <div className='flex justify-center items-center'>
                <FillButton text="Read All Articles" color="bg-green" text_color="text-white" url="/posts" />
            </div>
        </div>
    );
}

export default BlogSection