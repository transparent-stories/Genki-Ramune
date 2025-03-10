import PostsArchive from "@/components/Blog Post/PostsArchive";
import { Suspense } from "react";

export default function PostsPage() {
    return (
        <Suspense fallback={<p className="text-center py-10">Loading...</p>}>
            <PostsArchive />
        </Suspense>
    );
}
