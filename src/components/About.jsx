import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Welcome!</h1>
      
      <p className="text-lg leading-relaxed mb-8">
        This is my digital workspace, where I document cybersecurity projects, share insights about emerging threats, 
        and explore solutions to real-world IT challenges.
      </p>

      <div className="space-y-4 text-lg leading-relaxed">
        <p>
          If you want to learn more about me, check out the{' '}
          <Link to="/about" className="text-blue-600 dark:text-blue-400 hover:underline">
            About
          </Link>{' '}
          page.
        </p>

        <p>
          Want to read about my inner thoughts, insights, and solutions? Check out the{' '}
          <Link to="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
            Blog
          </Link>{' '}
          page.
        </p>

        <p>
          Want to see what I've been working on and learning about? Check out the{' '}
          <Link to="/projects" className="text-blue-600 dark:text-blue-400 hover:underline">
            Projects
          </Link>{' '}
          page.
        </p>

        <p>
          And if you want to get in touch, check out the{' '}
          <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
            Contact
          </Link>{' '}
          page, or click the LinkedIn icon at the bottom of the page and shoot me a message.
        </p>
      </div>
    </section>
  );
};

export default About;
  
