import { fetchFromApiWp } from '@/utils/api';
import { React, cache } from 'react';
import { ErrorState } from '@/components/Global/States';
import Link from 'next/link';

// Server-side function to fetch post data
const getPostData = cache(async (slug) => {
    try {
        const posts = await fetchFromApiWp(`/posts`, { slug: slug }, "wc");
        return posts?.data?.[0] || null;
    } catch (error) {
        console.error(`Error fetching post data for slug: ${slug}`, error);
        return null;
    }
});

// Metadata for SEO
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPostData(slug);


    if (!post) {
        return {
            title: "Post Not Found",
            description: "The post you are looking for could not be found.",
        };
    }

    return {
        title: post.title?.rendered || "Post",
        description: post.excerpt?.rendered.replace(/<[^>]*>/g, '') || "Post details",
        openGraph: {
            title: post.title?.rendered || "Post",
            description: post.excerpt?.rendered.replace(/<[^>]*>/g, '') || "Post details",
            images: [post.featured_image_src || "https://placehold.co/400x600"],
        },
    };
}

const PostPage = async ({ params }) => {
    const { slug } = await params;
    const post = await getPostData(slug);

    if (!post) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-2xl font-bold">Post Not Found</h1>
                <p className="mt-2">The post you are looking for does not exist.</p>
                <Link href="/" className="text-blue-500 underline">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="py-5 px-4 sm:py-20 sm:px-[10vw] flex flex-col gap-5">
            <h1 className="text-3xl font-bold">{post.title.rendered}</h1>
            <p className="text-gray-500 text-sm">
                {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </p>
            {post.featured_image_src && (
                <img src={post.featured_image_src} alt={post.title.rendered} className="w-full h-auto rounded-lg" />
            )}
            <div className="max-w-none"
                dangerouslySetInnerHTML={{
                    __html: post.content.rendered ?? ''
                }}
            />
            <Link href="/posts" className="text-blue-500 underline">Back to Posts</Link>
        </div>
    );
};

export default PostPage;
