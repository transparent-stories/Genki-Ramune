'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchFromApiWp } from '@/utils/api';
import PostCard from '@/components/Blog Post/PostCard';
import { EmptyState } from '@/components/Global/States';
import FillButton from '@/components/Global/Buttons/FillButton';

const POSTS_PER_PAGE = 6;

const PostsArchive = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const queryParams = {
                    orderBy: 'date',
                    per_page: POSTS_PER_PAGE,
                    page: currentPage,
                    _embed: '',
                };
                const fetchedPosts = await fetchFromApiWp('/posts', queryParams, 'wp');
                setPosts(fetchedPosts?.data || []);
                const { totalRecords, totalPages } = fetchedPosts?.headers
                setTotalPosts(totalRecords)
                setTotalPages(Math.ceil(totalRecords / POSTS_PER_PAGE));
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
            setLoading(false);
        };

        fetchPosts();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        router.push(`/posts?page=${newPage}`);
    };

    if (loading) return <p className='text-center py-10 min-h-80'>Loading...</p>;
    if (!posts || posts.length === 0) return <EmptyState height='100px' message='No posts found' />;

    return (
        <div className='py-20 px-4 sm:px-[10vw] text-center'>
            <div className='mb-20'>
                <h1 className='text-4xl sm:text-6xl font-extrabold mb-4 text-green'>All Blog Posts</h1>
                <p className="text-gray-500 text-sm">
                    {totalPosts} Posts & {totalPages} pages in total
                </p>

                <p className="text-green text-l mt-10">
                    Page {currentPage} of {totalPages}
                </p>
            </div>

            <div className='blog-list flex flex-wrap justify-center gap-8 mt-4 mb-8'>
                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        id={post.id}
                        image={post.featured_image_src}
                        title={post.title.rendered}
                        slug={post.slug}
                        date={post.date}
                    />
                ))}
            </div>
            {/* Pagination Controls */}
            <div className='flex justify-center mt-8 gap-4'>
                <button
                    className={`px-4 py-2 border ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {/* <span className='px-4 py-2 border'>{`Page ${currentPage} of ${totalPages}`}</span> */}
                <button
                    className={`px-4 py-2 border ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PostsArchive;
