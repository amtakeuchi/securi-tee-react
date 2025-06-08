import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <section className="py-20 px-8 text-center">
      <h2 className="text-4xl font-bold mb-6">Thank You!</h2>
      <p className="text-xl mb-8">Your message has been received. We'll get back to you soon.</p>
      <Link 
        to="/" 
        className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 hover:bg-teal-700"
      >
        Return Home
      </Link>
    </section>
  );
};

export default ThankYouPage;
