import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
              SecuriTee
            </Link>
            <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              Blog
            </Link>
            <Link to="/projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              Projects
            </Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
