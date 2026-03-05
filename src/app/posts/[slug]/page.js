import fs from "fs";
import path from "path";
import getPostMetadata from "../../../utils/getPostMetadata";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

function getPostContent(slug) {
  const folder = path.join(process.cwd(), "src", "posts");
  const file = path.join(folder, `${slug}.md`);
  const content = fs.readFileSync(file, "utf8");

  const matterResult = matter(content);

  return matterResult;
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata("src/posts");
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const id = slug ? " - " + slug : "";
  return {
    title: `Solivar Blog ${id.replace(/_/g, " ")}`,
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostContent(slug);
  return (
    <main>
      <article className="markdown-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}
