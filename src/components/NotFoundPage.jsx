import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="py-20 px-8 text-center">
      <h2 className="text-4xl font-bold mb-6">404 - Page Not Found</h2>
      <p className="text-lg mb-4">Oops! Looks like this page doesn’t exist.</p>
      <Link to="/" className="text-blue-600 underline">Go back to Home</Link>
    </section>
  );
};

export default NotFoundPage;
