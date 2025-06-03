import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        // First, try to load the sample project we created
        const sampleProject = await fetch('/projects/sample-project.md');
        if (sampleProject.ok) {
          const content = await sampleProject.text();
          const title = content.match(/# (.*)/)?.[1] || 'Sample Project';
          const preview = content.split('\n').slice(1).join(' ').slice(0, 150) + '...';
          setProjects([{ slug: 'sample-project', title, preview }]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="p-8">
        <h1 className="text-3xl font-bold mb-6">Projects</h1>
        <div>Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-8">
        <h1 className="text-3xl font-bold mb-6">Projects</h1>
        <div className="text-red-600">{error}</div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="p-8">
        <h1 className="text-3xl font-bold mb-6">Projects</h1>
        <div className="text-gray-600">No projects found. Create some in the admin panel!</div>
        <Link to="/admin" className="inline-block mt-4 text-blue-600 hover:underline">
          Go to Admin Panel →
        </Link>
      </section>
    );
  }

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={`/projects/${project.slug}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600">{project.preview}</p>
            <span className="inline-block mt-4 text-blue-600 hover:underline">
              View Project →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectListPage; 