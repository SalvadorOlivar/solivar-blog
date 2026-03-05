import PostsExplorer from '../components/PostsExplorer';
import  getPostMetadata from '../utils/getPostMetadata';

export default function Home() {
  const postMetadata = getPostMetadata('src/posts');
  return (
    <main>
      <PostsExplorer posts={postMetadata} />
    </main>
  );
}
