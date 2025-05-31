import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <section className="py-20 px-8 text-center">
      <h2 className="text-4xl font-bold mb-6">Thank You!</h2>
      <p className="text-lg mb-4">Your message has been sent successfully — I’ll get back to you soon!</p>
      <Link to="/" className="text-blue-600 underline">Back to Home</Link>
    </section>
  );
};

export default ThankYouPage;
