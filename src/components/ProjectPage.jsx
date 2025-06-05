import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const ProjectPage = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/content/projects/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Project not found");
        return res.text();
      })
      .then(setContent)
      .catch(() => setContent("# 404\nProject not found."));
  }, [slug]);

  return (
    <section className="p-8 prose lg:prose-xl max-w-screen-md mx-auto">
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  );
};

export default ProjectPage;
