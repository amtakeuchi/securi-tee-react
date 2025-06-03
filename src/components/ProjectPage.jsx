import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const ProjectPage = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    import(`../content/projects/${slug}.md`)
      .then((res) => fetch(res.default).then((r) => r.text()))
      .then((text) => setContent(text));
  }, [slug]);

  return (
    <section className="p-8">
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  );
};

export default ProjectPage;
