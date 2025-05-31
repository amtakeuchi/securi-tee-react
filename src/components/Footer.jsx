const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 text-center flex flex-col items-center">
      <div className="flex space-x-4 mb-4">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          <img src="/icons/github.svg" alt="GitHub" className="w-6 h-6" />
        </a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
          <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Securi-Tee. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
