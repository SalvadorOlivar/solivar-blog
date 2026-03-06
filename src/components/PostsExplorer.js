"use client";

import { useMemo, useState } from "react";
import PostCard from "./PostCard";

export default function PostsExplorer({ posts }) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const tags = useMemo(() => {
    return [...new Set(posts.flatMap((post) => post.tags || []))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag);

      if (!matchesTag) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = [post.title, post.description, ...(post.tags || [])]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [posts, query, selectedTag]);

  const hasFilters = query.trim().length > 0 || selectedTag !== "all";

  return (
    <>
      <section className="postControls" aria-label="Post filters">
        <input
          type="search"
          className="searchInput"
          placeholder="Search for title, description, or tags..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <div className="tagFilters">
          <button
            type="button"
            className={`tagFilter ${selectedTag === "all" ? "is-active" : ""}`}
            onClick={() => setSelectedTag("all")}
          >
            All
          </button>

          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`tagFilter ${selectedTag === tag ? "is-active" : ""}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {hasFilters ? (
          <button
            type="button"
            className="clearFilters"
            onClick={() => {
              setQuery("");
              setSelectedTag("all");
            }}
          >
            Clear Filters
          </button>
        ) : null}
      </section>

      {filteredPosts.length === 0 ? (
        <p className="emptyState">
          No results for the current filters.
        </p>
      ) : null}

      <div className="postsContainer">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
