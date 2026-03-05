# Solivar Blog

Static blog built with Next.js App Router and Markdown posts.

## Stack

- Next.js 16
- React 19
- gray-matter (frontmatter parsing)
- react-markdown (post rendering)

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

The project uses `output: "export"` in `next.config.mjs`, so pages are generated as static output.

## Add a new post

1. Create a new `.md` file in `src/posts`.
2. Add frontmatter in this format:

```md
---
title: My Post Title
description: Short summary shown in cards
date: 2026-03-05
tags: cloud,terraform,kubernetes
---
```

3. Write the Markdown content below the frontmatter.

## Notes

- Posts are sorted by `date` (newest first).
- Use `YYYY-MM-DD` dates for consistent ordering.
