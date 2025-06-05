import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching projects...');
        const response = await fetch('/.netlify/functions/list-content?type=projects');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const text = await response.text();
          console.error('Error response:', text);
          throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Received projects:', data);
        setProjects(data);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError(err.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <div className="space-y-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error Loading Projects</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-gray-600">No projects found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.filename}
              to={`/projects/${project.filename.replace('.md', '')}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              {project.thumbnail && (
                <div className="h-48 rounded-t-lg overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Error loading thumbnail:', project.thumbnail);
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                {project.date && (
                  <p className="text-gray-600 text-sm mb-2">
                    {new Date(project.date).toLocaleDateString()}
                  </p>
                )}
                {project.description && (
                  <p className="text-gray-600">{project.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectListPage; 