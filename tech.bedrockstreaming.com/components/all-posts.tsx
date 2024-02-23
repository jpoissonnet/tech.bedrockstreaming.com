"use client";

import PostPreview from "./post-preview";
import type Post from "../interfaces/post";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type Props = {
  posts: Post[];
};

const AllPosts = ({ posts }: Props) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const query = searchParams.get("page");
  const page = !!query ? parseInt(query) : 1;
  const postsPerPage = 10;
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const filteredPosts = posts.slice(start, end);

  return (
    <main>
      <section className="mb-16 flex flex-col gap-2">
        {filteredPosts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </section>
      <div className={"flex items-center justify-between gap-4"}>
        <Link
          className={
            "border border-black text-black font-medium text-lg hover:bg-black hover:text-white transition-all p-3 rounded"
          }
          href={"/?page=" + (page - 1)}
        >
          ← Prev
        </Link>
        <p>
          {page} / {Math.ceil(posts.length / postsPerPage)}
        </p>
        <div className={"flex gap-3"}>
          <Link
            href={"/?page=" + (page + 1)}
            className={
              "border border-black text-black font-medium text-lg hover:bg-black hover:text-white transition-all p-3 rounded"
            }
          >
            Next →
          </Link>
          <Link
            href={"/?page=" + Math.ceil(posts.length / postsPerPage)}
            className={
              "border border-black text-black font-medium text-lg hover:bg-black hover:text-white transition-all p-3 rounded"
            }
          >
            {">>"}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AllPosts;