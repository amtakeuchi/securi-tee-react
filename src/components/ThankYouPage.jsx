import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <section className="py-20 px-8 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">Thank You!</h2>
        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
          Your message has been sent successfully. I'll get back to you as soon as possible!
        </p>
        <Link 
          to="/" 
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default ThankYouPage;
