import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({ content: "", frontmatter: {} });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

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
    <>
      <article className="p-8 max-w-screen-md mx-auto relative">
        {/* Social Links */}
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
          <a
            href="https://github.com/amtakeuchi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/adam-takeuchi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        {post.frontmatter.thumbnail && (
          <img
            src={post.frontmatter.thumbnail}
            alt={post.frontmatter.title || "Blog post thumbnail"}
            className="w-full h-64 object-cover rounded-lg mb-8 cursor-pointer"
            onClick={() => handleImageClick(post.frontmatter.thumbnail)}
          />
        )}
        {post.frontmatter.title && (
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{post.frontmatter.title}</h1>
        )}
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
          {post.frontmatter.date && (
            <time dateTime={post.frontmatter.date}>
              {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </time>
          )}
        </div>
        <div className="prose lg:prose-xl dark:prose-invert">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
            components={{
              img: ({node, ...props}) => (
                <img 
                  {...props} 
                  className="w-full rounded-lg my-8 cursor-pointer" 
                  onClick={() => handleImageClick(props.src)}
                />
              ),
              a: ({node, ...props}) => (
                <a {...props} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200" />
              ),
              p: ({node, ...props}) => (
                <p {...props} className="mb-4" />
              ),
              h2: ({node, ...props}) => (
                <h2 {...props} className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100" />
              ),
              h3: ({node, ...props}) => (
                <h3 {...props} className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100" />
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
                <blockquote {...props} className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 italic my-4" />
              ),
              code: ({node, inline, ...props}) => (
                inline ? 
                  <code {...props} className="bg-gray-100 dark:bg-gray-800 rounded px-1" /> :
                  <code {...props} className="block bg-gray-100 dark:bg-gray-800 p-4 rounded my-4 overflow-auto" />
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="max-w-full max-h-full">
            <img 
              src={selectedImage} 
              alt="Full size" 
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPostPage;
