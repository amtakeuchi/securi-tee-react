import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Securi-Tee</h1>
        <nav>
          <Link to="/" className="px-4 hover:text-gray-400">Home</Link>
          <Link to="/about" className="px-4 hover:text-gray-400">About</Link>
          <Link to="/blog" className="px-4 hover:text-gray-400">Blog</Link>
          <Link to="/projects" className="px-4 hover:text-gray-400">Projects</Link>
          <Link to="/contact" className="px-4 hover:text-gray-400">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
