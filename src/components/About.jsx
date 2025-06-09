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
          If you want to learn more about me, check out the About page.
        </p>

        <p>
          Want to read about my inner thoughts, insights, and solutions? Check out the Blog page.
        </p>

        <p>
          Want to see what I've been working on and learning about? Check out the Projects page.
        </p>

        <p>
          And if you want to get in touch, check out the Contact page, or click the LinkedIn icon at the bottom of the page 
          and shoot me a message.
        </p>
      </div>
    </section>
  );
};

export default About;
  
