import fs from "fs";
import getPostMetadata from "@/utils/getPostMetadata";
import React from "react";
import matter from "gray-matter";

function getPostContent(slug) {
  const folder = "posts/";
  const file = folder + `${slug}.md`;
  const content = fs.readFileSync(file, "utf8");

  const matterResult = matter(content);

  return matterResult;
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata("posts");
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const id = slug ? ' · ' + slug : '';
  return {
    title: `Solivar Blog ${id.replace(/_/g, ' ')}`
  };
}

export default async function PostPage({ params }) {
 
    const { slug } = await params;
    const post = getPostContent(slug)
    return (
        <main>
            <article>
                {post.content}
            </article>
        </main>
    )
}