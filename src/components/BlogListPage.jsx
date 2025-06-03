import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/admin/config.yml');
        const config = await response.text();
        const collections = config.match(/folder: blog-posts([\s\S]*?)(?=collections:|$)/)?.[1] || '';
        const files = collections.match(/- ([\w-]+\.md)/g) || [];
        
        const postPromises = files.map(async (file) => {
          const slug = file.replace('- ', '').replace('.md', '');
          const contentResponse = await fetch(`/blog-posts/${slug}.md`);
          const content = await contentResponse.text();
          const title = content.match(/# (.*)/)?.[1] || slug;
          const preview = content.split('\n').slice(1).join(' ').slice(0, 150) + '...';
          return { slug, title, preview };
        });

        const loadedPosts = await Promise.all(postPromises);
        setPosts(loadedPosts);
        setLoading(false);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <section className="p-8">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        <div>Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-8">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        <div className="text-red-600">{error}</div>
      </section>
    );
  }

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.preview}</p>
            <span className="inline-block mt-4 text-blue-600 hover:underline">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogListPage; 