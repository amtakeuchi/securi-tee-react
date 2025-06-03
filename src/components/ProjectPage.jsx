import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const ProjectPage = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch(`/projects/${slug}.md`);
        if (!response.ok) {
          throw new Error(`Failed to load project: ${response.statusText}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error("Error loading project:", err);
        setError("Failed to load project. Please try again later.");
      }
    }

    loadContent();
  }, [slug]);

  if (error) {
    return (
      <section className="p-8">
        <div className="text-red-600">{error}</div>
      </section>
    );
  }

  return (
    <section className="p-8">
      <article className="prose prose-lg max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </section>
  );
};

export default ProjectPage;
