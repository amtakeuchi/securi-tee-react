import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <header className="bg-navy dark:bg-navy shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/favicon.ico" alt="SecuriTee Logo" className="w-8 h-8" />
              <span className="text-2xl font-bold text-white">SecuriTee</span>
            </Link>
            <div className="ml-8 flex items-center space-x-6">
              <Link to="/about" className="text-gray-200 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/blog" className="text-gray-200 hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="/projects" className="text-gray-200 hover:text-white transition-colors">
                Projects
              </Link>
              <Link to="/contact" className="text-gray-200 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
