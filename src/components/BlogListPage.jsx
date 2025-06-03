import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        // Get the list of all files in the blog-posts directory
        const response = await fetch('/.netlify/functions/list-content?type=blog-posts');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts list');
        }
        const files = await response.json();
        
        // Load each post's content
        const postPromises = files.map(async (filename) => {
          const slug = filename.replace('.md', '');
          const contentResponse = await fetch(`/blog-posts/${filename}`);
          if (!contentResponse.ok) {
            console.warn(`Failed to load post: ${filename}`);
            return null;
          }
          const content = await contentResponse.text();
          const title = content.match(/# (.*)/)?.[1] || slug;
          const preview = content.split('\n').slice(1).join(' ').slice(0, 150) + '...';
          return { slug, title, preview };
        });

        const loadedPosts = (await Promise.all(postPromises))
          .filter(post => post !== null)
          .sort((a, b) => b.slug.localeCompare(a.slug)); // Sort by filename descending (assumes date-based filenames)

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

  if (posts.length === 0) {
    return (
      <section className="p-8">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        <div className="text-gray-600">No blog posts found. Create some in the admin panel!</div>
        <Link to="/admin" className="inline-block mt-4 text-blue-600 hover:underline">
          Go to Admin Panel →
        </Link>
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