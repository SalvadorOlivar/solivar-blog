import Link from "next/link";
import formatPostDate from "../utils/formatPostDate";

export default function PostCard(props) {
  const { post, index = 0 } = props;
  const readingTimeMinutes = post.readingTimeMinutes ?? 1;

  return (
    <Link className="unstyled" href={`/posts/${post.slug}`}>
      <div
        className="postCard animate-in"
        style={{ animationDelay: `${index * 60}ms` }}
      >
        <div className="postCardLeft">
          <div className="postCardTitle">{post.title}</div>
          <p className="postCardDescription">{post.description}</p>
          {post.tags.length > 0 && (
            <div className="postCardTags">
              {post.tags.map((tag) => (
                <span key={`${post.slug}-${tag}`} className="postCardTag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className="postCardRight">
          <div className="postCardMeta">
            <span>{formatPostDate(post.date)}</span>
            <span className="postCardMetaDot">·</span>
            <span>{readingTimeMinutes} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
