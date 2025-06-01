import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="bg-gray-900 text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Securi-Tee</h1>
        <nav className="flex items-center">
          <Link to="/" className="px-4 hover:text-gray-400">Home</Link>
          <Link to="/about" className="px-4 hover:text-gray-400">About</Link>
          <Link to="/blog" className="px-4 hover:text-gray-400">Blog</Link>
          <Link to="/projects" className="px-4 hover:text-gray-400">Projects</Link>
          <Link to="/contact" className="px-4 hover:text-gray-400">Contact</Link>
          <button
            onClick={toggleTheme}
            className="ml-4 px-2 py-1 border rounded hover:bg-gray-700"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
