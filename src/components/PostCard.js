import Link from 'next/link';
import formatPostDate from '../utils/formatPostDate';

export default function PostCard(props) {
  const { post } = props;
  const readingTimeMinutes = post.readingTimeMinutes ?? 1;

  return (
    <Link className="unstyled" href={`/posts/${post.slug}`}>
      <div className='postCard'>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <div className="postMeta">
          <span>{formatPostDate(post.date)}</span>
          <span aria-hidden="true">-</span>
          <span>{readingTimeMinutes} min de lectura</span>
        </div>
        <div className="tags-container">
          {post.tags.map((tag) => (
            <span key={`${post.slug}-${tag}`} className="tag-badge">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
