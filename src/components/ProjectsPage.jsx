const ProjectsPage = () => {
    return (
      <section className="py-20 px-8">
        <h2 className="text-4xl font-bold mb-6">Projects</h2>
        <ul className="space-y-6">
          <li>
            <h3 className="text-2xl font-semibold">🔒 Cyber Defense Lab</h3>
            <p>Hands-on simulated attack/defense environment with automated threat emulation.</p>
          </li>
          <li>
            <h3 className="text-2xl font-semibold">🛡️ Incident Response Toolkit</h3>
            <p>CLI utility for rapid forensics collection and log aggregation in breach scenarios.</p>
          </li>
          <li>
            <h3 className="text-2xl font-semibold">📊 SIEM Dashboard Enhancement</h3>
            <p>Custom visualizations for Splunk to better correlate lateral movement attempts.</p>
          </li>
        </ul>
      </section>
    );
  };
  
  export default ProjectsPage;
  