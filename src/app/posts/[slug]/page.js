import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import getPostMetadata from "../../../utils/getPostMetadata";
import estimateReadingTime from "../../../utils/estimateReadingTime";
import formatPostDate from "../../../utils/formatPostDate";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

function getPostContent(slug) {
  const folder = path.join(process.cwd(), "src", "posts");
  const file = path.join(folder, `${slug}.md`);

  if (!fs.existsSync(file)) {
    return null;
  }

  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  const rawDate = matterResult.data.date;
  const normalizedDate =
    rawDate instanceof Date ? rawDate.toISOString().slice(0, 10) : String(rawDate ?? "");

  const tags = typeof matterResult.data.tags === 'string'
    ? matterResult.data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    : Array.isArray(matterResult.data.tags)
      ? matterResult.data.tags.map(tag => String(tag).trim()).filter(Boolean)
      : [];

  return {
    ...matterResult,
    data: {
      ...matterResult.data,
      tags,
      date: normalizedDate,
      readingTimeMinutes: estimateReadingTime(matterResult.content),
    },
  };
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata("src/posts");
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostMetadata("src/posts").find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Post no encontrado | Solivar Blog",
    };
  }

  return {
    title: `${post.title} | Solivar Blog`,
    description: post.description,
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostContent(slug);

  if (!post) {
    notFound();
  }

  const title = post.data.title || slug.replace(/_/g, " ");
  const description = post.data.description || "";

  return (
    <article className="markdown-content">
      <header className="postHeader">
        <h1>{title}</h1>
        <div className="postMeta">
          <span>{formatPostDate(post.data.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.data.readingTimeMinutes} min de lectura</span>
        </div>
        {description ? <p className="postDescription">{description}</p> : null}
        {post.data.tags && post.data.tags.length > 0 ? (
          <div className="postTags">
            {post.data.tags.map((tag) => (
              <span key={tag} className="tagBadge">{tag}</span>
            ))}
          </div>
        ) : null}
      </header>

      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}
