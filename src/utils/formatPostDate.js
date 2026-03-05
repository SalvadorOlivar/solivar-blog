export default function formatPostDate(value) {
  const date = new Date(String(value ?? ""));

  if (Number.isNaN(date.getTime())) {
    return String(value ?? "");
  }

  return new Intl.DateTimeFormat("es-UY", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
