import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching blog index...');
        const response = await fetch('/blog-index.json');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const text = await response.text();
          console.error('Error response:', text);
          throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Received posts:', data);
        setPosts(data);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError(err.message || 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Blog Posts</h1>
        <div className="space-y-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Blog Posts</h1>
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-100 px-4 py-3 rounded">
          <p className="font-bold">Error Loading Posts</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No blog posts found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.filename}
              to={`/blog/${post.filename}`}
              className="block bg-white dark:bg-gray-800 hover:bg-teal-50 dark:hover:bg-teal-dark/10 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-transparent hover:border-teal-light/30"
            >
              {post.thumbnail && (
                <div className="h-48 rounded-t-lg overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Error loading thumbnail:', post.thumbnail);
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-light">{post.title}</h2>
                {post.date && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                )}
                {post.description && (
                  <p className="text-gray-600 dark:text-gray-400">{post.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogListPage;
