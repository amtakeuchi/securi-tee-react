import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <header className="bg-navy dark:bg-navy shadow-md" role="banner">
      <nav className="container mx-auto px-4 py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 mr-8" aria-label="SecuriTee Home">
            <img src="/favicon.ico" alt="SecuriTee Logo" className="w-8 h-8" />
            <span className="text-2xl font-bold text-white">SecuriTee</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/about" className="text-gray-200 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-navy rounded">
              About
            </Link>
            <Link to="/blog" className="text-gray-200 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-navy rounded">
              Blog
            </Link>
            <Link to="/projects" className="text-gray-200 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-navy rounded">
              Projects
            </Link>
            <Link to="/contact" className="text-gray-200 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-navy rounded">
              Contact
            </Link>
          </div>
          <div className="ml-auto">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-navy rounded"
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? <FaSun size={20} aria-hidden="true" /> : <FaMoon size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
