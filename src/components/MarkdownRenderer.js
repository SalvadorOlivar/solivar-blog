"use client";
import Markdown from "markdown-to-jsx";

export default function MarkdownRenderer({ content }) {
  return <Markdown>{content}</Markdown>;
}