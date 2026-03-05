import Link from 'next/link';

export default function PostCard(props) {
  const { post } = props;
  return (
    <Link className="unstyled" href={`/posts/${post.slug}`}>
      <div className='postCard'>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <span>{post.date}</span>
        <div className="tags-container">
          {post.tags.map((tag) => (
            <span key={`${post.slug}-${tag}`} className="tag-badge">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
