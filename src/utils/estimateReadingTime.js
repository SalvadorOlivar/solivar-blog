const WORDS_PER_MINUTE = 200;

export default function estimateReadingTime(text) {
  const words = String(text ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
