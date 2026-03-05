import PostCard from '../components/PostCard';
import  getPostMetadata from '../utils/getPostMetadata';

export default function Home() {
  const postMetadata = getPostMetadata('src/posts');
  return (
    <main>
      <div className='postsContainer'>
        {postMetadata.map((post) => {
          return (
            <PostCard key={post.slug} post={post} />
          );
        })}
      </div>
    </main>
  );
}
