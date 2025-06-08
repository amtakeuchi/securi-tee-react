import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <section className="py-20 px-8 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Thank You!</h2>
        <p className="text-xl mb-8">
          Your message has been received. I'll get back to you as soon as possible.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
};

export default ThankYouPage;
