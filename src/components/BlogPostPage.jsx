import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({ content: "", frontmatter: {} });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/blog-posts/${slug}.md`);
        if (!response.ok) {
          throw new Error(`Failed to load post: ${response.statusText}`);
        }
        
        const text = await response.text();
        
        // Parse frontmatter
        const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (frontmatterMatch) {
          const [, frontmatterText, content] = frontmatterMatch;
          const frontmatter = {};
          frontmatterText.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
              frontmatter[key.trim()] = valueParts.join(':').trim();
            }
          });
          setPost({ content, frontmatter });
        } else {
          setPost({ content: text, frontmatter: {} });
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError(err.message || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="p-8 max-w-screen-md mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-screen-md mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error Loading Post</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <article className="p-8 max-w-screen-md mx-auto">
      {post.frontmatter.thumbnail && (
        <img
          src={post.frontmatter.thumbnail}
          alt={post.frontmatter.title || "Blog post thumbnail"}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      {post.frontmatter.title && (
        <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
      )}
      {post.frontmatter.date && (
        <p className="text-gray-600 mb-8">
          {new Date(post.frontmatter.date).toLocaleDateString()}
        </p>
      )}
      <div className="prose lg:prose-xl">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          rehypePlugins={[rehypeRaw]}
          components={{
            img: ({node, ...props}) => (
              <img {...props} className="w-full rounded-lg my-8" />
            ),
            a: ({node, ...props}) => (
              <a {...props} className="text-blue-600 hover:text-blue-800" />
            ),
            p: ({node, ...props}) => (
              <p {...props} className="mb-4" />
            ),
            h2: ({node, ...props}) => (
              <h2 {...props} className="text-2xl font-bold mt-8 mb-4" />
            ),
            h3: ({node, ...props}) => (
              <h3 {...props} className="text-xl font-bold mt-6 mb-3" />
            ),
            ul: ({node, ...props}) => (
              <ul {...props} className="list-disc pl-6 mb-4" />
            ),
            ol: ({node, ...props}) => (
              <ol {...props} className="list-decimal pl-6 mb-4" />
            ),
            li: ({node, ...props}) => (
              <li {...props} className="mb-2" />
            ),
            blockquote: ({node, ...props}) => (
              <blockquote {...props} className="border-l-4 border-gray-200 pl-4 italic my-4" />
            ),
            code: ({node, inline, ...props}) => (
              inline ? 
                <code {...props} className="bg-gray-100 rounded px-1" /> :
                <code {...props} className="block bg-gray-100 p-4 rounded my-4 overflow-auto" />
            )
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPostPage;
