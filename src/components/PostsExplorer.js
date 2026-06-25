"use client";

import { useMemo, useState } from "react";
import PostCard from "./PostCard";

const MAX_VISIBLE_TAGS = 5;

export default function PostsExplorer({ posts }) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [showAllTags, setShowAllTags] = useState(false);

  const tags = useMemo(() => {
    return [...new Set(posts.flatMap((post) => post.tags || []))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const visibleTags = showAllTags ? tags : tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = tags.length - MAX_VISIBLE_TAGS;

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
      <section className="postControls" aria-label="Filtrar posts">
        <div className="searchWrapper">
          <svg className="searchIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            className="searchInput"
            placeholder="Buscar por título, descripción o etiquetas..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="tagFilters">
          <button
            type="button"
            className={`tagFilter ${selectedTag === "all" ? "is-active" : ""}`}
            onClick={() => {
              setSelectedTag("all");
              setShowAllTags(false);
            }}
          >
            Todas
          </button>

          {visibleTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`tagFilter ${selectedTag === tag ? "is-active" : ""}`}
              onClick={() => {
                setSelectedTag(tag);
                setShowAllTags(false);
              }}
            >
              {tag}
            </button>
          ))}

          {!showAllTags && hiddenCount > 0 && (
            <button
              type="button"
              className="showMoreTags"
              onClick={() => setShowAllTags(true)}
            >
              +{hiddenCount}
            </button>
          )}

          {showAllTags && hiddenCount > 0 && (
            <button
              type="button"
              className="showMoreTags"
              onClick={() => setShowAllTags(false)}
            >
              &minus;{hiddenCount}
            </button>
          )}
        </div>

        {hasFilters ? (
          <button
            type="button"
            className="clearFilters"
            onClick={() => {
              setQuery("");
              setSelectedTag("all");
              setShowAllTags(false);
            }}
          >
            Limpiar filtros
          </button>
        ) : null}
      </section>

      {filteredPosts.length === 0 ? (
        <p className="emptyState">
          No hay resultados para los filtros actuales.
        </p>
      ) : null}

      <div className="postsContainer">
        {filteredPosts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </>
  );
}
